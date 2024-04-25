import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../theme";
import React, {useState, useEffect} from "react";
import axios from 'axios';

const TenureBarChart =  ({ isDashboard = false}) => {   // accept 'isDashboard' as prop
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([]);
    const [transformedData, setTransformedData] = useState([]);

    useEffect(() => {
      axios.get("/data")
        .then(res => {
          setData(res.data);
          const groupedData = groupDataByTenure(res.data);
          setTransformedData(groupedData);
        })
        .catch(err => console.log(err));
    }, []);
    
    // Function to group data by tenure ranges
    const groupDataByTenure = (data) => {
      const tenureGroups = {
        "1": [],
        "2": [],
        "3": [],
        "4": []
      };
    
      data.forEach(customer => {
        const tenure = customer.Tenure;
        if (tenure <= 1) {
          tenureGroups["1"].push(customer);
        } else if (tenure <= 2) {
          tenureGroups["2"].push(customer);
        } else if (tenure <= 3) {
          tenureGroups["3"].push(customer);
        } else {
          tenureGroups["4"].push(customer);
        }
      });
    
      // Convert tenure groups into desired format
      const transformedData = Object.entries(tenureGroups).map(([tenureRange, customers]) => ({
        tenure: tenureRange,
        Churn: customers.reduce((total, customer) => total + (customer.Churn === 1 ? 1 : 0), 0)
      }));
    
      return transformedData;
    };

    return (
    <ResponsiveBar
      data={transformedData}
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
        text: {
          fontFamily: '\'SFMono-Regular\', Consolas, \'Liberation Mono\', Menlo, Courier, monospace'
        },
      }}
      keys={["Churn"]}
      indexBy="tenure"
      margin={{ top: 50, right: 30, bottom: 50, left: 70 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: 'nivo' }}
      borderColor="black"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Years of Tenure", 
        legendPosition: "middle",
        legendOffset: 40,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Number of Customers", 
        legendPosition: "middle",
        legendOffset: -45,
      }}
      enableLabel={true}                             // bar labels
      labelSkipWidth={12}
      labelSkipHeight={0}
      labelTextColor="black"
      tooltip={({ id, value, indexValue }) => (
        <div
          style={{
            color: "#000",                          // Hover Font color set to black
            background: "#fff", 
            padding: "12px", 
            borderRadius: "5px", 
          }}
        >
          <strong>{id}</strong>: {value} 
        </div>
      )}
      role="application"
    />
  );
};

export default TenureBarChart;