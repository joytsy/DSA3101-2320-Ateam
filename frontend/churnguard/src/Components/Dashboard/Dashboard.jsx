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
import Tooltip from "@mui/material/Tooltip";

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
          <Header title="CUSTOMER CHURN ANALYSIS DASHBOARD" subtitle="Overview of customer churn prediction and churn drivers | Hover over each chart for explanations" />
        </Box>
  
        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          {/* ROW 1 */}
          <Tooltip
          title={
            <span style={{ fontSize: '14px' }}>
              Number of customers falling under the following personas are expected to churn:<br />
              "Customer Service Issues",<br />
              "Technical Difficulties",<br />
              "Financially Strained" 
            </span>
          }
          placement="top"
          >
          <Box
            gridColumn="span 4"
            // backgroundColor={colors.primary[400]}
            backgroundColor="#2e2148"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {/* <Tooltip title="Customers falling under personas - CustomerServiceIssues, TechDifficulties, FinanciallyStrained"> */}
            <StatBox
              title="Customers At Risk (High Chance of Retainment):"
              subtitle={
                <CustomersAtRisk />
              }
              icon={ null
                // <PersonAddIcon
                //   sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                // />
              }
            />
            {/* </Tooltip> */}
          </Box>
          </Tooltip>
          <Tooltip
          title={
            <span style={{ fontSize: '14px' ,width: '600px'}}>
              Total number of customers who have not churned, including customers at risk of churn
            </span>
          }
          placement="top"
          >
          <Box
            gridColumn="span 4"
            // backgroundColor={colors.primary[400]}
            backgroundColor="#2e2148"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="Total Number Of Active Customers: "
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
          </Tooltip>
          <Tooltip
          title={
            <span style={{ fontSize: '14px' ,width: '600px'}}>
              Total revenue at risk from balance of customers owning GXS Savings Account
            </span>
          }
          placement="top"
          >
          <Box
            gridColumn="span 4"
            // backgroundColor={colors.primary[400]}
            backgroundColor="#2e2148"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="Revenue At Risk (from GXS savings account):"
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
          </Tooltip>
  
          {/* ROW 2 */}
          <Tooltip
          title={
            <span style={{ fontSize: '14px' ,width: '600px'}}>
              Number of unique customers who have churned for each month
            </span>
          }
          placement="top"
          >
          <Box
            gridColumn="span 6"
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
          </Tooltip>
          <Tooltip
          title={
            <span style={{ fontSize: '14px' ,width: '700px'}}>
              Types of Customer Persona:<br />
              <br />
              FS:&nbsp;&nbsp;Financially Strained (likely to churn)<br />
              O:&nbsp;&nbsp;&nbsp;&nbsp;Opportunistic<br />
              G:&nbsp;&nbsp;&nbsp;&nbsp;General<br />
              TD:&nbsp;&nbsp;Technical Difficulties (likely to churn)<br />
              L:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Loyal<br />
              CSI:&nbsp;Customer Service Issues (likely to churn)
            </span>
          }
          placement="top"
          >
          <Box
            gridColumn="span 6"
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
                Customer Personas (Hover above chart to understand abbrevations used)
              </Typography>
            {/* </Box> */}
            { <Box height="260px" mt="-20px" sx={{ padding: "5px" }}>
              <ReasonsDoughnutChart isDashboard={true} />                         
            </Box> }
          </Box>
          </Tooltip>
  
          {/* ROW 3 */}
          <Tooltip
          title={
            <span style={{ fontSize: '14px' }}>
              Tracking the number of customers churned by product based on entire database data
            </span>
          }
          placement="top"
          >
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
          </Tooltip>
          <Tooltip
          title={
            <span style={{ fontSize: '14px' }}>
              Tracking the number of customers churned by age based on entire database data
            </span>
          }
          placement="top"
          >
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
          </Tooltip>
          <Tooltip
          title={
            <span style={{ fontSize: '14px' }}>
              Tracking the number of customers churned by tenure based on entire database data
            </span>
          }
          placement="top"
          >
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
          </Tooltip>
        </Box>
      </Box>
      </div>
    </div>  
    );
  };
  
  export default Dashboard;


