import { Box, Typography } from "@mui/material";
import KpiCards from "../components/cards/KpiCards";
import Charts from "../components/Charts";

const Home = () => {
  return (
    <Box>
      <Typography variant="h3" color="primary" mb={4}>
        Dashboard
      </Typography>
      <KpiCards />
      <Charts />
    </Box>
  );
};

export default Home;
