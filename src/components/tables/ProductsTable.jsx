import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useStockCalls from "../../hooks/useStockCalls";
import { useSelector } from "react-redux";
import useSortColumn from "../../hooks/useSortColumn";
import { Typography } from "@mui/material";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import { Box } from "@mui/system";
import { arrowStyle, btnHoverStyle } from "../../styles/globalStyle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function ProductsTable({ selectedProducts, selectedBrands }) {
  const { deleteProduct } = useStockCalls();
  const { products } = useSelector((state) => state.stock);

  const columnObj = {
    brand: 1,
    name: 1,
    stock: 1,
    id: 1,
  };

  // useSortColumn hook'una bakıldığında 2 parametre aldığı görülecektir.
  const { sortedData, handleSort, columns } = useSortColumn(
    products,
    columnObj
  );
  //? Verilen item secilen brand'larin icerisinde varsa true dondurur
  //? VEYA hic brand secilmemisse true dondurur.aksinde false dondurur.
  //? bu fonksiyon filter() icerisinde yazilacagi icin false dondurmesi
  //? durumunda filter bir suzme yapmamis olur.
  const isBrandSelected = (item) =>
    selectedBrands.includes(item.brand) || selectedBrands.length === 0;
  const isProductSelected = (item) =>
    selectedProducts.includes(item.name) || selectedProducts.length === 0;
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }} elevation={10}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Box sx={arrowStyle} onClick={() => handleSort("id")}>
                <Typography variant="body" noWrap>
                  #
                </Typography>
                {columns.id === 1 && <UpgradeIcon />}
                {columns.id !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">
              <Box sx={arrowStyle} onClick={() => handleSort("brand")}>
                <Typography variant="body" noWrap>
                  Brand
                </Typography>
                {columns.brand === 1 && <UpgradeIcon />}
                {columns.brand !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">
              <Box sx={arrowStyle} onClick={() => handleSort("name")}>
                <Typography variant="body" noWrap>
                  Name
                </Typography>
                {columns.name === 1 && <UpgradeIcon />}
                {columns.name !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">
              {" "}
              <Box sx={arrowStyle} onClick={() => handleSort("stock")}>
                <Typography variant="body" noWrap>
                  Stock
                </Typography>
                {columns.stock === 1 && <UpgradeIcon />}
                {columns.stock !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData
            ?.filter((item) => isBrandSelected(item))
            .filter((item) => isProductSelected(item))
            .map((product) => (
              <TableRow
                key={product.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {product.id}
                </TableCell>
                <TableCell align="center">{product.category}</TableCell>
                <TableCell align="center">{product.brand}</TableCell>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center">{product.stock}</TableCell>
                <TableCell
                  align="center"
                  onClick={() => deleteProduct(product.id)}
                >
                  <DeleteForeverIcon sx={btnHoverStyle} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
