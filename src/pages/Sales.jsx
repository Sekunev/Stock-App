import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import { useSelector } from "react-redux";
import useStockCalls from "../hooks/useStockCalls";
import { useEffect } from "react";
import MultiSelect from "../components/MultiSelect";
import SalesModal from "../components/modals/SalesModal";
import SalesTable from "../components/tables/SalesTable";

const Sales = () => {
  const { getAllStockData } = useStockCalls();
  const [open, setOpen] = useState(false);
  const { sales } = useSelector((state) => state.stock);
  const [info, setInfo] = useState({});
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    getAllStockData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Typography variant="h3" color="secondary.contrastText" gutterBottom>
        Sales
      </Typography>

      <Button
        onClick={() => {
          setInfo({});
          setOpen(true);
        }}
      >
        New Sale
      </Button>

      <SalesModal
        info={info}
        setInfo={setInfo}
        open={open}
        setOpen={() => setOpen(false)}
      />

      {sales?.length > 0 && (
        <>
          <MultiSelect
            data1={sales}
            data2={sales}
            key1="brand"
            key2="product"
            firstNames={selectedBrands}
            setFirstNames={setSelectedBrands}
            setSecondNames={setSelectedProducts}
          />
          <SalesTable
            setOpen={setOpen}
            setInfo={setInfo}
            selectedBrands={selectedBrands}
            selectedProducts={selectedProducts}
          />
        </>
      )}
    </Box>
  );
};

export default Sales;
