import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import { useSelector } from "react-redux";
import useStockCalls from "../hooks/useStockCalls";
import { useEffect } from "react";
import MultiSelect from "../components/MultiSelect";
import SalesModal from "../components/modals/SalesModal";
import SalesTable from "../components/tables/SalesTable";
import PurchasesTable from "../components/tables/PurchasesTable";
import PurchaseModal from "../components/modals/PurchaseModal";

const Purchases = () => {
  const { getAllStockData } = useStockCalls();
  const [open, setOpen] = useState(false);
  const { purchases } = useSelector((state) => state.stock);
  const [info, setInfo] = useState({});
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    getAllStockData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Typography variant="h3" color="secondary.contrastText" gutterBottom>
        Purchases
      </Typography>

      <Button
        onClick={() => {
          setInfo({});
          setOpen(true);
        }}
      >
        New Purchase
      </Button>

      <PurchaseModal
        info={info}
        setInfo={setInfo}
        open={open}
        setOpen={() => setOpen(false)}
      />

      {purchases?.length > 0 && (
        <>
          <MultiSelect
            data1={purchases}
            data2={purchases}
            key1="brand"
            key2="product"
            firstNames={selectedBrands}
            setFirstNames={setSelectedBrands}
            setSecondNames={setSelectedProducts}
          />
          <PurchasesTable
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

export default Purchases;
