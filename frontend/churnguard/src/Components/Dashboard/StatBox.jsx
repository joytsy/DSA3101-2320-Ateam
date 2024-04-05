import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const StatBox = ({ title, subtitle, icon, increase}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box width="100%" m="0 20px">
          <Box display="flex" justifyContent="space-between">
            <Box>
              {icon}
              <Typography
                // variant="h4"
                // fontWeight="bold"
                // sx={{ color: colors.grey[100] }}
                variant="h5"
                fontWeight="600"
                sx={{ padding: "10px 10px 5px 5px" }}
              >
                {title}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" mt="2px">
            <Typography variant="h5" sx={{ color: colors.greenAccent[500] , padding: "5px 10px 10px 10px"}}>
              {subtitle}
            </Typography>
            <Typography
              variant="h5"
              fontStyle="italic"
              sx={{ color: colors.greenAccent[600] }}
            >
              {increase}
            </Typography>
          </Box>
        </Box>
      );
    };
    
    export default StatBox;