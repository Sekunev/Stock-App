import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useSelector } from "react-redux";
import useStockCalls from "../hooks/useStockCalls";
import { useEffect } from "react";
import ProductModal from "../components/modals/ProductModal";
import ProductsTable from "../components/tables/ProductsTable";
import MultiSelect from "../components/MultiSelect";

const Products = () => {
  const { getProCatBrands } = useStockCalls();
  const [open, setOpen] = useState(false);
  const { products, brands } = useSelector((state) => state.stock);
  const [info, setInfo] = useState({});
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    getProCatBrands();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  console.log(products);

  return (
    <Box>
      <Typography variant="h3" color="primary" gutterBottom>
        Product
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        New Product
      </Button>

      <MultiSelect
        data1={brands}
        data2={products}
        key1="name"
        key2="brand"
        firstNames={selectedBrands}
        setFirstNames={setSelectedBrands}
        setSecondNames={setSelectedProducts}
      />

      <ProductModal
        open={open}
        setOpen={setOpen}
        info={info}
        setInfo={setInfo}
      />

      {products?.length > 0 && (
        <ProductsTable
          selectedBrands={selectedBrands}
          selectedProducts={selectedProducts}
        />
      )}
    </Box>
  );
};

export default Products;
