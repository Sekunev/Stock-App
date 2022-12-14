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

const FirmCard = ({ firm, setOpen, setInfo }) => {
  const { deleteFirm } = useStockCalls();
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
      <CardHeader title={firm?.name} subheader={firm?.address} />

      <CardMedia
        sx={{ p: 1, objectFit: "contain", height: "190px" }}
        component="img"
        alt="firm-img"
        image={firm?.image}
      />
      <CardContent>
        <Typography variant="subtitle1">Phone: {firm?.phone}</Typography>
      </CardContent>
      <CardActions sx={flex}>
        <EditIcon
          onClick={() => {
            setInfo(firm);
            setOpen(true);
          }}
          sx={btnHoverStyle}
        />
        <DeleteForeverIcon
          onClick={() => deleteFirm(firm.id)}
          sx={btnHoverStyle}
        />
      </CardActions>
    </Card>
  );
};

export default FirmCard;
