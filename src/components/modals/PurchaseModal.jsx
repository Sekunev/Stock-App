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
import { useNavigate } from "react-router-dom";
import useStockCalls from "../../hooks/useStockCalls";
import { flexColumn, modalstyle } from "../../styles/globalStyle";

const PurchaseModal = ({ open, setOpen, info, setInfo }) => {
  const { putPurchase, postPurchase } = useStockCalls();
  const { firms, products, brands } = useSelector((state) => state.stock);
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  console.log(info);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (info.id) {
      putPurchase(info);
    } else {
      postPurchase(info);
    }
    setOpen(false);
    setInfo({});
  };

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
              <InputLabel id="brand-select">Firms</InputLabel>
              <Select
                labelId="firm-select-label"
                id="firm-select"
                label="Firm"
                name="firm_id"
                value={info?.firm_id || ""}
                onChange={handleChange}
                required
              >
                <MenuItem onClick={() => navigate("/stock/firms")}>
                  Add New Firm
                </MenuItem>
                <hr />
                {firms?.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl variant="standard">
              <InputLabel id="brand-select">Brand</InputLabel>
              <Select
                labelId="brand-select-label"
                id="brand-select"
                label="Brand"
                name="brand_id"
                value={info?.brand_id || ""}
                onChange={handleChange}
                required
              >
                <MenuItem onClick={() => navigate("/stock/brands")}>
                  Add New Brand
                </MenuItem>
                <hr />
                {brands?.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl variant="standard">
              <InputLabel id="product-select-label">Product</InputLabel>
              <Select
                labelId="product-select-label"
                id="product-select"
                label="Product"
                name="product_id"
                value={info?.product_id || ""}
                onChange={handleChange}
                required
              >
                <MenuItem onClick={() => navigate("/stock/products")}>
                  Add New Product
                </MenuItem>
                <hr />
                {products?.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              id="quantity"
              label="Quantity"
              variant="standard"
              type="number"
              name="quantity"
              InputProps={{ inputProps: { min: 0 } }}
              value={info?.quantity || ""}
              onChange={handleChange}
              required
            />
            <TextField
              id="price"
              label="Price"
              variant="standard"
              type="number"
              name="price"
              InputProps={{ inputProps: { min: 0 } }}
              value={info?.price || ""}
              onChange={handleChange}
              required
            />
            <Button type="submit" size="large">
              {info?.id ? "Update Purchase" : "Add New Purchase"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default PurchaseModal;
