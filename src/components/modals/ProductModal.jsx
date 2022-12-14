import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";
import { useSelector } from "react-redux";
import useStockCalls from "../../hooks/useStockCalls";
import { flexColumn, modalstyle } from "../../styles/globalStyle";

const ProductModal = ({ open, setOpen, info, setInfo }) => {
  const { putProduct, postProduct } = useStockCalls();
  const { categories, brands } = useSelector((state) => state.stock);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    if (info.id) {
      putProduct(info);
    } else {
      postProduct(info);
    }
    setInfo({});
  };

  console.log(info);
  console.log(categories);
  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setInfo({});
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalstyle} component="form" onSubmit={handleSubmit}>
          <Box sx={flexColumn}>
            <FormControl variant="standard">
              <InputLabel id="category-select">Category</InputLabel>
              <Select
                labelId="category-select"
                id="category"
                label="category"
                name="category_id"
                value={info?.category_id || ""}
                onChange={handleChange}
                required
              >
                {categories?.map((category) => {
                  return (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl variant="standard">
              <InputLabel id="brand-select">Brand</InputLabel>
              <Select
                labelId="brand-select"
                id="brand"
                label="brands"
                name="brand_id"
                value={info?.brand_id || ""}
                onChange={handleChange}
                required
              >
                {brands?.map((brand) => {
                  return (
                    <MenuItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              id="Product_Name"
              label="Product Name"
              variant="standard"
              type="text"
              name="name"
              value={info?.name || ""}
              onChange={handleChange}
              required
            />
            <Button type="submit" size="large">
              Save Product
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ProductModal;
