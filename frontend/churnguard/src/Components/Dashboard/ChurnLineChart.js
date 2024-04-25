import {ResponsiveLine} from '@nivo/line';
import { tokens } from '../../theme';
import { useTheme } from "@mui/material";
import React, {useState, useEffect} from "react";
import axios from 'axios';

// code for "Customer Churn per month" line chart on Dashboard
const ChurnLineChart  =  ({ isDashboard = false}) => { 
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([]);
    const [transformedData, setTransformedData] = useState([]);

    useEffect(() => {
        axios.get("/data")
        .then(res => {
            setData(res.data);
            const transformedData = transformData(res.data);
            setTransformedData(transformedData);
            })
            .catch(err => console.log(err));
    }, []);

    const transformData = (data) => {
    const today = new Date();                              // Current date
    const currentYear = today.getFullYear(); 
    const currentMonth = today.getMonth(); 
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const churnData = {};
    
    // initialize churnData object with all months
    months.forEach(month => {
        churnData[month] = 0;
    });
    
    // calculate churn count for each month in the current year
    data.forEach(customer => {
        if (customer.Churn === 1) {
            const lastTransactionDate = new Date(today - customer.DaysSinceLastTransaction * 24 * 60 * 60 * 1000);
            const transactionYear = lastTransactionDate.getFullYear();
            const transactionMonth = lastTransactionDate.getMonth();
        if (transactionYear === currentYear && transactionMonth <= currentMonth) {
            const monthName = months[transactionMonth];
            churnData[monthName]++;
            }
        }
        });
    
        // convert churnData into an array of objects compatible with Nivo chart
        const transformedData = months.map(month => ({
            month,
            churnCount: churnData[month] || 0 // default to 0 if no churn data for the month
        }));
    
        return transformedData;
    };

    return (
        <ResponsiveLine
        data={[
            {
                id: 'Churn Count',
                data: transformedData.map(({ month, churnCount }) => ({ x: month, y: churnCount }))
            }
        ]}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: colors.grey[100],
                },
              },
              legend: {
                text: {
                  fill: colors.grey[100],
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[100],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.grey[100],
                },
              },
            },
            legends: {
              text: {
                fill: colors.grey[100],
              },
            },
            tooltip: {
              container: {
                color: "black",
              },
            },
            text: {
                fontFamily: '\'SFMono-Regular\', Consolas, \'Liberation Mono\', Menlo, Courier, monospace',
                fill: "#4cceac",     // coloue of point label
              },
          }}
          colors={{ scheme: 'nivo' }} 
          margin={{ top: 50, right: 80, bottom: 50, left: 70 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.0f"
          curve="linear"
          enableArea={true}               // shaded area below graph
          enablePointLabel={true}         // point labels
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Month",     
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickValues: 5, // added
            tickSize: 3,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Number of Customers",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          enableGridX={false}
          enableGridY={true}
          pointSize={8}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          tooltip={({ point }) => (
            <div
                style={{
                    color: "#000",
                    background: "#fff",
                    padding: "12px",
                    borderRadius: "5px",
                }}
            >
                <strong>{point.data.xFormatted}</strong>: {point.data.yFormatted} Customers churned
            </div>
        )}
        />
      );
    };

export default ChurnLineChart;
