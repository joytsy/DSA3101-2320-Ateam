// import {ResponsivePie\} from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import { tokens } from '../../theme';
import { responsiveFontSizes, useTheme } from "@mui/material";
import React, {useState, useEffect} from "react";
import axios from 'axios';

const ReasonsDoughnutChart = ({ isDashboard = false}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [transformedData, setTransformedData] = useState([]);

  useEffect(() => {
      axios.get("/data")
          .then(res => {
          setData(res.data);
          const groupedData = groupDataByPersona(res.data);
          setTransformedData(groupedData);
      })
          .catch(err => console.log(err));
  }, []);

  // Function to group data by personas
  // const groupDataByPersona = (data) => {
  // const personaGroups = {
  //     "FinanciallyStrained": 0,
  //     "Opportunistic": 0,
  //     "General": 0,
  //     "TechDifficulties": 0,
  //     "Loyal": 0,
  //     "CustomerServiceIssues": 0
  // };

  // data.forEach(customer => {
  //     if (customer.Churn === 1) {
  //     const persona = customer.Persona;
  //     if (personaGroups.hasOwnProperty(persona)) {
  //         personaGroups[persona]++;
  //     }
  //     }
  // });

  // const transformedData = Object.entries(personaGroups).map(([persona, count]) => ({
  //     id: persona,
  //     value: count
  //   }));

  // return transformedData;
  const groupDataByPersona = (data) => {
    const personaGroups = {
        "FinanciallyStrained": 0,
        "Opportunistic": 0,
        "General": 0,
        "TechDifficulties": 0,
        "Loyal": 0,
        "CustomerServiceIssues": 0
    };

    // Define a mapping for persona IDs to their formatted labels
    const personaLabels = {
        "FinanciallyStrained": "FS",
        "Opportunistic": "O",
        "General": "G",
        "TechDifficulties": "TD",
        "Loyal": "L",
        "CustomerServiceIssues": "CSI"
    };

    data.forEach(customer => {
        if (customer.Churn === 1) {
            const persona = customer.Persona;
            if (personaGroups.hasOwnProperty(persona)) {
                personaGroups[persona]++;
            }
        }
    });

    // Map persona IDs to their formatted labels and transform data
    const transformedData = Object.entries(personaGroups).map(([persona, count]) => ({
        id: personaLabels[persona], // Use formatted label instead of ID
        value: count,
        label: personaGroups[persona]
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
      keys={["value"]}
      indexBy="id"
      margin={{ top: 30, right: 80, bottom: 50, left: 80 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      // colors={{ scheme: 'accent' }}
      colors="#b3ecec"
      // colorBy="indexValue"
      borderColor="black"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Predicted Customer Persona", // changed
        legendPosition: "middle",
        legendOffset: 36,
        tickValues: "every 1", // Set tick values to display all labels
        // truncateTickAt: 5,
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
      //     dataFrom: "data",
      //     anchor: "right",                     // change anchor to "right"
      //     direction: "column",
      //     justify: false,
      //     translateX: 120,                      // adjust translateX for proper positioning
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
          <strong>{id}</strong>: {value} 
        </div>
      )}
      role="application"
    />
  );
};

export default ReasonsDoughnutChart;






// doughnut chart
// const ReasonsDoughnutChart = () => {
//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);
//     const [data, setData] = useState([]);
//     const [transformedData, setTransformedData] = useState([]);

//     useEffect(() => {
//         axios.get("/data")
//             .then(res => {
//             setData(res.data);
//             const groupedData = groupDataByPersona(res.data);
//             setTransformedData(groupedData);
//         })
//             .catch(err => console.log(err));
//     }, []);

//     // Function to group data by personas
//     const groupDataByPersona = (data) => {
//     const personaGroups = {
//         "FinanciallyStrained": 0,
//         "Opportunistic": 0,
//         "General": 0,
//         "TechDifficulties": 0,
//         "Loyal": 0,
//         "KeyAccounts": 0,
//         "CustomerServiceIssues": 0
//     };

//     data.forEach(customer => {
//         if (customer.Churn === 1) {
//         const persona = customer.Persona;
//         if (personaGroups.hasOwnProperty(persona)) {
//             personaGroups[persona]++;
//         }
//         }
//     });

//     const transformedData = Object.entries(personaGroups).map(([persona, count]) => ({
//         id: persona,
//         value: count
//       }));

//     return transformedData;
//     };

//     return (
//       <ResponsivePie
//         data={transformedData}
//         theme={{
//           axis: {
//             domain: {
//               line: {
//                 stroke: colors.grey[100],
//               },
//             },
//             legend: {
//               text: {
//                 fill: colors.grey[100],
//               },
//             },
//             ticks: {
//               line: {
//                 stroke: colors.grey[100],
//                 strokeWidth: 1,
//               },
//               text: {
//                 fill: colors.grey[100],
//               },
//             },
//           },
//           legends: {
//             text: {
//               fill: colors.grey[100],
//             },
//           },
//           text: {
//             fontFamily: '\'SFMono-Regular\', Consolas, \'Liberation Mono\', Menlo, Courier, monospace'
//           },
//         }}
//         colors={{ scheme: 'set3' }}
//         margin={{ top: 30, right: 50, bottom: 50, left: 90 }}            //space that graph fills box
//         innerRadius={0.5}
//         padAngle={0.7}
//         cornerRadius={3}
//         activeOuterRadiusOffset={8}
//         borderColor="black"
//         arcLinkLabelsSkipAngle={10}
//         arcLinkLabelsTextColor={colors.grey[100]}
//         arcLinkLabelsThickness={2}
//         arcLinkLabelsColor={{ from: "color" }}
//         enableArcLabels={true}          //enable arc label
//         // arcLabelsRadiusOffset={0.4}
//         arcLabelsSkipAngle={1} //Skip label if corresponding arc's angle is lower than provided value
//         arcLabelsTextColor="black"
//         legends={[
//           {
//             anchor: "left-bottom",
//             direction: "column",
//             justify: false,
//             translateX: -85,                // prevent legend from cutting barchart
//             translateY: 90,
//             itemsSpacing: 0,
//             itemWidth: 100,
//             itemHeight: 18,
//             itemTextColor: "white",
//             itemDirection: "left-to-right",
//             itemOpacity: 1,
//             symbolSize: 15,
//             symbolShape: "circle",
//             // effects: [
//             //   {
//             //     on: "hover",
//             //     style: {
//             //       itemTextColor: "#000",
//             //     },
//             //   },
//             // ],
//           },
//         ]}
//         tooltip={({ datum }) => (
//           <div
//             style={{
//               color: "black", // Change font color here
//               background: "#fff",
//               padding: "12px",
//               borderRadius: "5px",
//             }}
//           >
//             <strong>{datum.id}</strong>: {datum.value} Customers
//           </div>
//         )}
//       />
//     );
//   };
  
