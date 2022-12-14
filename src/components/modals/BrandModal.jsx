import { Box, Button, Modal } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";
import useStockCalls from "../../hooks/useStockCalls";
import { flexColumn, modalstyle } from "../../styles/globalStyle";

const BrandModal = ({ open, setOpen, info, setInfo }) => {
  const { putBrand, postBrand } = useStockCalls();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    if (info.id) {
      putBrand(info);
    } else {
      postBrand(info);
    }
    setInfo({});
  };

  // console.log(info);
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
            <TextField
              id="name"
              label="Brand Name"
              variant="standard"
              name="name"
              type="text"
              value={info?.name || ""}
              // info.name yoksa hata verme boş str yaz.
              onChange={handleChange}
              required
            />
            <TextField
              id="image"
              label="Image-Url"
              variant="standard"
              type="url"
              name="image"
              value={info?.image || ""}
              onChange={handleChange}
              required
            />
            <Button type="submit" size="large">
              Save Brand
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default BrandModal;
