import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../theme";
import React, {useState, useEffect} from "react";
import axios from 'axios';

// code for "Churn by Age" bar chart on Dashboard
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
        Churn: customers.reduce((total, customer) => total + (customer.Churn === 1 ? 1 : 0), 0)
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
            fill: colors.grey[100],
          },
        },
        text: {
          fontFamily: '\'SFMono-Regular\', Consolas, \'Liberation Mono\', Menlo, Courier, monospace'
        },
      }}
      keys={["Churn"]}
      indexBy="age"
      margin={{ top: 50, right: 30, bottom: 50, left: 70 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      // colors={{ scheme: 'set3' }}
      colors="#F7D1D8"
      // colorBy="indexValue"                        //bar colours
      borderColor="black"
      axisTop={null}
      axisRight={null}
      axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Age Groups",                         // changed
      legendPosition: "middle",
      legendOffset: 40,
      }}
      axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Number of Customers",                 // changed
      legendPosition: "middle",
      legendOffset: -45,
      }}
      enableLabel={true}                            // bar labels
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
          <strong>{id}</strong>: {value} from Age {indexValue}
        </div>
      )}
      role="application"
    />
  );
};

export default AgeBarChart;