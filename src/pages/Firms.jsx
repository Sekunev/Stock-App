import { Box, Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
// import FirmCard from "../components/cards/FirmCard";
import FirmModal from "../components/modals/FirmModal";
import { useSelector } from "react-redux";
import useStockCalls from "../hooks/useStockCalls";
import { useEffect } from "react";
import { flexCenter } from "../styles/globalStyle";
import FirmCard from "../components/cards/FirmCard.jsx";

const Firms = () => {
  const { getFirms } = useStockCalls();
  const [open, setOpen] = useState(false);
  const { firms } = useSelector((state) => state.stock);
  const [info, setInfo] = useState({});

  useEffect(() => {
    getFirms();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  console.log(firms);
  return (
    <Box>
      <Typography variant="h3" color="secondary.contrastText" gutterBottom>
        Firms
      </Typography>
      <Button onClick={() => setOpen(true)}>New Firm</Button>
      <FirmModal open={open} setOpen={setOpen} info={info} setInfo={setInfo} />
      {firms?.length > 0 && (
        <Grid container sx={flexCenter} mt={4}>
          {firms?.map((firm) => (
            <Grid item key={firm.id}>
              <FirmCard firm={firm} setOpen={setOpen} setInfo={setInfo} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Firms;
