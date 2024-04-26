import { ResponsiveBar } from '@nivo/bar';
import { tokens } from '../../theme';
import { useTheme } from "@mui/material";
import React, {useState, useEffect} from "react";
import axios from 'axios';

// code for "Customer Personas" bar chart on the dashboard
const PersonaBarChart = ({ isDashboard = false}) => {
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
        id: personaLabels[persona],                         // Use formatted label instead of ID
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
            fill: colors.grey[100],                       //colour of legend "Churn"
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
      colors="#b3ecec"
      borderColor="black"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Predicted Customer Persona", 
        legendPosition: "middle",
        legendOffset: 36,
        tickValues: "every 1",                      // Set tick values to display all labels
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
            color: "#000",                            // Hover Font color set to black
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

export default PersonaBarChart;