import { Box, Button, Modal } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";
import useStockCalls from "../../hooks/useStockCalls";
import { flexColumn, modalstyle } from "../../styles/globalStyle";

const FirmModal = ({ open, setOpen, info, setInfo }) => {
  const { putFirm, postFirm } = useStockCalls();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    if (info.id) {
      putFirm(info);
    } else {
      postFirm(info);
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
              label="Firm Name"
              variant="standard"
              name="name"
              type="text"
              value={info?.name || ""}
              // info.name yoksa hata verme boş str yaz.
              onChange={handleChange}
              required
            />
            <TextField
              id="Phone"
              label="Phone"
              variant="standard"
              type="tel"
              name="phone"
              value={info?.phone || ""}
              onChange={handleChange}
              required
            />
            <TextField
              id="adress"
              label="Adress"
              variant="standard"
              type="text"
              name="address"
              value={info?.address || ""}
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
              Save Firm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default FirmModal;
