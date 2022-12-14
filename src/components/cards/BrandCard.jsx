import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { btnHoverStyle, flex } from "../../styles/globalStyle";
import useStockCalls from "../../hooks/useStockCalls";

const BrandCard = ({ brand, setOpen, setInfo }) => {
  const { deleteBrand } = useStockCalls();
  return (
    <Card
      elevation={8}
      sx={{
        maxWidth: 345,
        p: 2,
        width: "300px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <CardHeader title={brand?.name} />
      <CardMedia
        sx={{ p: 1, objectFit: "contain", height: "250px" }}
        component="img"
        alt="brand-img"
        image={brand?.image}
      />
      <CardActions sx={flex}>
        <EditIcon
          onClick={() => {
            setInfo(brand);
            setOpen(true);
          }}
          sx={btnHoverStyle}
        />
        <DeleteForeverIcon
          onClick={() => deleteBrand(brand.id)}
          sx={btnHoverStyle}
        />
      </CardActions>
    </Card>
  );
};

export default BrandCard;
