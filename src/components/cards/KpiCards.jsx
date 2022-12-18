import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentsIcon from "@mui/icons-material/Payments";
import { indigo, pink, amber } from "@mui/material/colors";
import { useSelector } from "react-redux";
import React from "react";

const KpiCards = () => {
  const { purchases, sales } = useSelector((state) => state.stock);

  const total = (data) =>
    data
      ?.map((sale) => Number(sale.price_total))
      .reduce((acc, val) => acc + val, 0);

  const totalProfit = total(sales) - total(purchases);

  const data = [
    {
      title: "sales",
      metric: `$${total(sales) || ""}`,
      icon: <MonetizationOnIcon sx={{ fontSize: "3rem" }} />,
      color: indigo[900],
      bgColor: indigo[300],
    },
    {
      title: "profit",
      metric: `$${totalProfit || ""}`,
      icon: <PaymentsIcon sx={{ fontSize: "3rem" }} />,
      color: pink[900],
      bgColor: pink[100],
    },
    {
      title: "purchases",
      metric: `$${total(purchases) || ""}`,
      icon: <ShoppingCartIcon sx={{ fontSize: "3rem" }} />,
      color: amber[900],
      bgColor: amber[100],
    },
  ];
  return (
    <Grid container justifyContent="center" alignItems="center" spacing={1}>
      {data?.map((item) => (
        <Grid
          item
          key={item.title}
          xs={12}
          sm={10}
          md={6}
          lg={4}
          sx={{ minWidth: "250px" }}
        >
          <Paper sx={{ p: 2 }} elevation={10}>
            <Box sx={{ display: "flex" }}>
              <Avatar
                sx={{
                  width: "4rem",
                  height: "4rem",
                  color: item.color,
                  backgroundColor: item.bgColor,
                  my: "auto",
                  mx: 2,
                }}
              >
                {item.icon}
              </Avatar>
              <Box sx={{ mx: 3 }}>
                <Typography variant="button">{item.title}</Typography>
                <Typography variant="h5">{item.metric}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default KpiCards;
