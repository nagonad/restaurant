import * as React from "react";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Delete from "@mui/icons-material/Delete";

function Row(props) {
  const { row } = props;
  const cart = JSON.parse(props.row.cart);
  const [open, setOpen] = React.useState(false);

  const renderVariants = (cartItem) => {
    let str = "";

    if (cartItem.variants) {
      cartItem.variants.forEach((variant) => {
        str += variant.variantname + ", ";
      });

      str = str.trim();

      str = str.substring(0, str.length - 1);
    }

    return str;
  };

  const deleteOrder = () => {
    props.deleteOrder(row).then(() => props.getOrders());
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.orderhistoryid}
        </TableCell>
        <TableCell align="right">{row.ordertime}</TableCell>
        <TableCell align="right">{row.orderdate.substring(0, 10)}</TableCell>
        <TableCell align="right">
          {row.delivery === "1" ? "Lieferung" : "Abholung"}
        </TableCell>
        <TableCell align="right">
          {row.deliverycost ? parseFloat(row.deliverycost).toFixed(2) : null}
        </TableCell>
        <TableCell align="right">
          {parseFloat(row.totalcost).toFixed(2)}
        </TableCell>
        <TableCell align="right">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              deleteOrder();
            }}
          >
            <Delete></Delete>
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow sx={{ backgroundColor: "#e7ebf0" }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {row.delivery === "1" ? (
                <Typography variant="h6" gutterBottom component="div">
                  {row.costumername}, {row.costumeraddress}, {row.phonenumber}
                </Typography>
              ) : null}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Product Size</TableCell>
                    <TableCell align="right">Product Price</TableCell>
                    <TableCell align="right">Variants</TableCell>
                    <TableCell align="right">Variants Price</TableCell>
                    <TableCell align="right">Total price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((cartItem) => (
                    <TableRow key={cartItem.orderNumber}>
                      <TableCell component="th" scope="row">
                        {cartItem.orderNumber}
                      </TableCell>
                      <TableCell>{cartItem.quantity}</TableCell>
                      <TableCell>{cartItem.product.productname}</TableCell>

                      <TableCell align="right">
                        {cartItem.size.sizename}
                      </TableCell>
                      <TableCell align="right">
                        {cartItem.size.unitprice}
                      </TableCell>
                      <TableCell align="right">
                        {renderVariants(cartItem)}
                      </TableCell>
                      <TableCell align="right">
                        {cartItem.cartItemVariantsCost
                          ? cartItem.cartItemVariantsCost.toFixed(2)
                          : null}
                      </TableCell>
                      <TableCell align="right">
                        {cartItem.cartItemTotalCost?.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function OrderHistoryComponent(props) {
  const [orderHistory, setOrderHistory] = React.useState();

  React.useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    props
      .getOrderHistory()
      .then((resp) => resp.json())
      .then((data) => {
        setOrderHistory(data);
      });
  };

  return (
    <TableContainer
      sx={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
      component={Paper}
    >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>#</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Delivery</TableCell>
            <TableCell align="right">Delivery Cost</TableCell>
            <TableCell align="right">Total Cost</TableCell>
            <TableCell align="right">#</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderHistory
            ? orderHistory.map((row) => (
                <Row
                  key={row.orderhistoryid}
                  row={row}
                  deleteOrder={props.deleteOrder}
                  getOrders={getOrders}
                />
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
