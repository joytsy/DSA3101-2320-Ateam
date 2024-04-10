import { Box, Button, IconButton, Typography, useTheme} from "@mui/material";
import { tokens } from "../../theme";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "./Header";
import StatBox from "./StatBox";
import AgeBarChart from "./AgeBarChart.js";
import ProductBarChart from "./ProductBarChart.js";
import TenureBarChart from "./TenureBarChart.js";
import TotalCustomers from "./TotalCustomer.js";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    return (
      <Box m="10px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CUSTOMER CHURN ANALYSIS DASHBOARD" subtitle="Overview of customer churn prediction and churn drivers" />
        </Box>
  
        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          {/* ROW 1 */}
          <Box
            gridColumn="span 4"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="Customers at risk:"
              subtitle="input no."
              icon={ null
                // <PersonAddIcon
                //   sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                // />
              }
            />
          </Box>
          <Box
            gridColumn="span 4"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="Total number of customers: "
              subtitle= "input no."
              icon={ null
                // <PersonAddIcon
                //   sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                // />
              }
            />
          </Box>
          <Box
            gridColumn="span 4"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="Revenue from customers at risk (from GXS savings account):"
              subtitle="Emails Sent"
              // progress="0.75"
              // increase="+14%"
              icon={ null
                // <PersonAddIcon
                //   sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                // />
              }
            />
          </Box>
  
          {/* ROW 2 */}
          <Box
            gridColumn="span 7"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Box
              mt="10px"
              // p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ padding: "10px 10px 10px 10px" }}
                >
                  Customer Churn YTD
                </Typography>
                <Typography
                  variant="h5"
                  // fontWeight="bold"
                  color={colors.greenAccent[500]}
                  sx={{ padding: "10px 10px 10px 10px" }}
                >
                  graph here
                </Typography>
              </Box>
              {/* <Box>
                <IconButton>
                  <DownloadOutlinedIcon
                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                  />
                </IconButton>
              </Box> */}
            </Box>
            {/* <Box height="250px" m="-20px 0 0 0">
              <LineChart isDashboard={true} />
            </Box> */}
          </Box>
          <Box
            gridColumn="span 5"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Churn Reasons
              </Typography>
            </Box>
            {/* {mockTransactions.map((transaction, i) => (
              <Box
                key={`${transaction.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {transaction.txId}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {transaction.user}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{transaction.date}</Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  ${transaction.cost}
                </Box>
              </Box>
            ))} */}
          </Box>
  
          {/* ROW 3 */}
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            // p="30px"
          >
            <Typography variant="h5" fontWeight="600" sx={{ padding: "10px 10px 10px 10px" }}>
              Churn by Product
            </Typography>
            { <Box height="250px" mt="-20px">
              <ProductBarChart isDashboard={true} />
            </Box> }
            {/* <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <ProgressCircle size="125" />
              <Typography
                variant="h5"
                color={colors.greenAccent[500]}
                sx={{ mt: "15px" }}
              >
                $48,352 revenue generated
              </Typography>
              <Typography>Includes extra misc expenditures and costs</Typography>
            </Box> */}
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "10px 10px 10px 10px" }}
            >
              Churn by Age
            </Typography>
            { <Box height="250px" mt="-20px">
              <AgeBarChart isDashboard={true} />
            </Box> }
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "10px 10px 10px 10px" }}
            >
              Churn rate by Tenure
            </Typography>
            { <Box height="250px" mt="-20px">
              <TenureBarChart isDashboard={true} />
            </Box> }
            {/* <Box height="200px">
              <GeographyChart isDashboard={true} />
            </Box> */}
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default Dashboard;


