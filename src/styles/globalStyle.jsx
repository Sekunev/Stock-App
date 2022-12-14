export const iconStyle = {
  color: "#010221",
  "& .MuiSvgIcon-root": { color: "#010221" },
  //MuiSvgIcon-root class'ına tarayıcının incele bölümüne bakarak ulaştık.
  "&:hover": { color: "#F4E2DE" },
  "&:hover .MuiSvgIcon-root": { color: "#F4E2DE" },
  // "&:hover .MuiListItemText-root": { color: "red" },
};
export const modalstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export const flexColumn = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
};
export const flexCenter = {
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  justifyContent: "center",
  alignItems: "center",
  gap: 2,
};
export const flex = {
  display: "flex",
  justifyContent: "center",
};
export const btnHoverStyle = {
  cursor: "pointer",
  transition: "all .1s ease",
  "&:hover": { color: "red", transform: "scale(1.25)" },
};
export const arrowStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  "&:hover": { color: "red" },
};
