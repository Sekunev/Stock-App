import { Box, Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import BrandCard from "../components/cards/BrandCard";
import BrandModal from "../components/modals/BrandModal";
import { useSelector } from "react-redux";
import useStockCalls from "../hooks/useStockCalls";
import { useEffect } from "react";
import { flexCenter } from "../styles/globalStyle";

const Brands = () => {
  const { getBrands } = useStockCalls();
  const [open, setOpen] = useState(false);
  const { brands } = useSelector((state) => state.stock);
  const [info, setInfo] = useState({});

  useEffect(() => {
    getBrands();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  console.log(brands);
  return (
    <Box>
      <Typography variant="h3" color="secondary.contrastText" gutterBottom>
        Brands
      </Typography>
      <Button onClick={() => setOpen(true)}>New Brand</Button>
      <BrandModal open={open} setOpen={setOpen} info={info} setInfo={setInfo} />
      {brands?.length > 0 && (
        <Grid container sx={flexCenter} mt={4}>
          {brands?.map((brand) => (
            <Grid item key={brand.id}>
              <BrandCard brand={brand} setOpen={setOpen} setInfo={setInfo} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Brands;
