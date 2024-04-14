import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../theme";
import React, {useState, useEffect} from "react";
import axios from 'axios';

const ProductBarChart =  ({ isDashboard = false}) => {   // accept 'isDashboard' as prop
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([]);
    const [transformedData, setTransformedData] = useState([]);

    useEffect(() => {
      axios.get("/data")
        .then(res => {
          setData(res.data);
          const groupedData = groupDataByProducts(res.data);
          setTransformedData(groupedData);
        })
        .catch(err => console.log(err));
    }, []);
  
    // Function to group data by products
    const groupDataByProducts = (data) => {
      const productGroups = {
        "FlexiLoan": [],
        "DebitCard": [],
        "SavingsAcc": []
      };
  
      data.forEach(customer => {
        // Assuming 'Churn' is the field indicating churn status
        if (customer.Churn === 1) {
          // Check each product and push customer if they have the product
          if (customer.FlexiLoan === 1) {
            productGroups["FlexiLoan"].push(customer);
          }
          if (customer.DebitCard === 1) {
            productGroups["DebitCard"].push(customer);
          }
          if (customer.SavingsAccount === 1) {
            productGroups["SavingsAcc"].push(customer);
          }
        }
      });
  
      // Convert product groups into desired format
      const transformedData = Object.entries(productGroups).map(([product, customers]) => ({
        product: product,
        Churn: customers.length
      }));
  
      return transformedData;
    };

    return (
    <ResponsiveBar
      data={transformedData}
      theme={{
        // added
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
            fill: colors.grey[100],   //colour of legend "Churn"
          },
        },
        text: {
          fontFamily: '\'SFMono-Regular\', Consolas, \'Liberation Mono\', Menlo, Courier, monospace'
        },
      }}
      keys={["Churn"]}
      indexBy="product"
      margin={{ top: 50, right: 30, bottom: 50, left: 70 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: 'pastel1' }}
      colorBy="indexValue"
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor="black"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "GXS Products", // changed
        legendPosition: "middle",
        legendOffset: 40,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Number of Customers", // changed
        legendPosition: "middle",
        legendOffset: -45,
      }}
      enableLabel={true}                             // bar labels
      labelSkipWidth={12}
      labelSkipHeight={0}
      labelTextColor="black"
      // legends={[
      //   {
      //     dataFrom: "keys",
      //     anchor: "right",
      //     direction: "column",
      //     justify: false,
      //     translateX: 120,
      //     translateY: 0,
      //     itemsSpacing: 2,
      //     itemWidth: 100,
      //     itemHeight: 20,
      //     itemDirection: "left-to-right",
      //     itemOpacity: 0.85,
      //     symbolSize: 20,
      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemOpacity: 1,
      //         },
      //       },
      //     ],
      //   },
      // ]}
      tooltip={({ id, value, indexValue }) => (
        <div
          style={{
            color: "#000",         // Hover Font color set to black
            background: "#fff", 
            padding: "12px", 
            borderRadius: "5px", 
          }}
        >
          <strong>{id}</strong>: {value} from {indexValue}
        </div>
      )}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};

export default ProductBarChart;