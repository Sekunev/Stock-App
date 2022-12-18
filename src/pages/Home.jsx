import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import KpiCards from "../components/cards/KpiCards";
import Charts from "../components/Charts";
import useStockCalls from "../hooks/useStockCalls";

const Home = () => {
  const { getPurchases, getSales } = useStockCalls();

  useEffect(() => {
    getSales();
    getPurchases();
    // eslint-disable-next-line
  }, []);

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
