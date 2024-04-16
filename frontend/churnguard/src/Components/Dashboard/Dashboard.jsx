import { Box, Button, IconButton, Typography, useTheme} from "@mui/material";
import { tokens } from "../../theme";
import './Dashboard.css';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "./Header";
import StatBox from "./StatBox";
import AgeBarChart from "./AgeBarChart.js";
import ProductBarChart from "./ProductBarChart.js";
import TenureBarChart from "./TenureBarChart.js";
import TotalCustomers from "./TotalCustomer.js";
import ChurnYTDLineChart from "./ChurnLineChart.js";
import ReasonsDoughnutChart from "./ReasonsDoughnutChart.js";
import CustomersAtRisk from "./CustomersAtRisk.js";
import RevenueAtRisk from "./RevenueAtRisk.js";
import Navbar from "./../Navbar.jsx";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    return (
     <div className='dashboard_body'>
      <div className='dashboard_container'>
      <Navbar/ >
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
            // backgroundColor={colors.primary[400]}
            backgroundColor="#2e2148"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="Customers at risk:"
              subtitle={
                <CustomersAtRisk />
              }
              icon={ null
                // <PersonAddIcon
                //   sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                // />
              }
            />
          </Box>
          <Box
            gridColumn="span 4"
            // backgroundColor={colors.primary[400]}
            backgroundColor="#2e2148"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="Total number of customers: "
              subtitle={
                <TotalCustomers />
              }
              icon={ null
                // <PersonAddIcon
                //   sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                // />
              }
            />
          </Box>
          <Box
            gridColumn="span 4"
            // backgroundColor={colors.primary[400]}
            backgroundColor="#2e2148"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="Revenue at risk (from GXS savings account):"
              subtitle={
                <RevenueAtRisk />
              }
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
            // backgroundColor={colors.primary[400]}
            backgroundColor="#2e2148"
          >
              <Box>
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600" sx={{ padding: "10px 10px 10px 10px" }}>
                  Customer Churn per Month
                </Typography>
                {/* <Typography
                  variant="h5"
                  // fontWeight="bold"
                  color={colors.greenAccent[500]}
                  sx={{ padding: "10px 10px 10px 10px" }}
                >
                  graph here
                </Typography> */}
              </Box>
              {/* <Box>
                <IconButton>
                  <DownloadOutlinedIcon
                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                  />
                </IconButton>
              </Box> */}
            
            <Box height="250px" m="-20px 0 0 0">
              <ChurnYTDLineChart isDashboard={true} />
            </Box>
          </Box>
          <Box
            gridColumn="span 5"
            gridRow="span 2"
            // backgroundColor={colors.primary[400]}
            backgroundColor="#2e2148"
            // overflow="auto"
          >
            {/* <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            > */}
              <Typography color={colors.grey[100]} variant="h5" fontWeight="600" sx={{ padding: "10px 10px 10px 10px" }}>
                Churn Reasons
              </Typography>
            {/* </Box> */}
            { <Box height="260px" mt="-20px" sx={{ padding: "5px" }}>
              <ReasonsDoughnutChart isDashboard={true} />                         
            </Box> }
          </Box>
  
          {/* ROW 3 */}
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            // backgroundColor={colors.primary[400]}
            backgroundColor="#2e2148"
            // p="30px"
          >
            <Typography variant="h5" fontWeight="600" sx={{ padding: "10px 10px 10px 10px" }}>
              Churn by Product
            </Typography>
            { <Box height="250px" mt="-20px">
              <ProductBarChart isDashboard={true} />
            </Box> }
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            // backgroundColor={colors.primary[400]}
            backgroundColor="#2e2148"
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
            // backgroundColor={colors.primary[400]}
            backgroundColor="#2e2148"
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
          </Box>
        </Box>
      </Box>
      </div>
    </div>  
    );
  };
  
  export default Dashboard;


