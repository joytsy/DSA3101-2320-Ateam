import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../theme";
import React, {useState, useEffect} from "react";
import axios from 'axios';

const AgeBarChart =  ({ isDashboard = false}) => {   // accept 'isDashboard' as prop
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([]);
    const [transformedData, setTransformedData] = useState([]);

    useEffect(() => {
      axios.get("/data")
        .then(res => {
          setData(res.data);
          const groupedData = groupDataByAge(res.data);
          setTransformedData(groupedData);
        })
        .catch(err => console.log(err));
    }, []);
  
    // Function to group data by age ranges
    const groupDataByAge = (data) => {
      const ageGroups = {
        "0-18": [],
        "19-25": [],
        "26-40": [],
        "41-50": [],
        "51-60": [],
        "61-100": []
      };
  
      data.forEach(customer => {
        const age = customer.Age;
        if (age <= 18) {
          ageGroups["0-18"].push(customer);
        } else if (age <= 25) {
          ageGroups["19-25"].push(customer);
        } else if (age <= 40) {
          ageGroups["26-40"].push(customer);
        } else if (age <= 50) {
          ageGroups["41-50"].push(customer);
        } else if (age <= 60) {
          ageGroups["51-60"].push(customer);
        } else {
          ageGroups["61-100"].push(customer);
        }
      });
  
      // Convert age groups into desired format
      const transformedData = Object.entries(ageGroups).map(([ageRange, customers]) => ({
        age: ageRange,
        churn: customers.reduce((total, customer) => total + (customer.Churn === 1 ? 1 : 0), 0)
      }));
  
      return transformedData;
    };

  //   useEffect(() => {
  //     axios.get("/data")
  //         .then(res => {
  //             setData(res.data);
  //             setFilteredData(res.data.slice(0, 10)); // Slice to get first 10 rows
  //         })
  //         .catch(err => console.log(err));
  // }, []);

  //   const transformedData = data.map(customer => ({
  //     age: customer.age,
  //     churn: customer.churn === 1 ? 'Churned' : 'Not Churned' // Assuming churn is represented as 1 for churned and 0 for not churned
  //   }));

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
            fill: colors.grey[100],
          },
        },
      }}
      keys={["churn"]}
      indexBy="age"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Age Groups", // changed
      legendPosition: "middle",
      legendOffset: 40,
      }}
      axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: isDashboard ? undefined : "Customer Churn", // changed
      legendPosition: "middle",
      legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{from: "color", modifiers: [["darker", 1.6]],}}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};

export default AgeBarChart;