import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";

{/* code for Header function on dashboard */}
const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px" width="100%">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        // color = "#0c0120"
        fontWeight="bold"
        sx={{ m: "0 0 3px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h4" color="#e0e0e0">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;