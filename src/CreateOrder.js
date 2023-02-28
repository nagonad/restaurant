import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateOrder(props) {
  const [open, setOpen] = React.useState(false);

  const [openSecond, setOpenSecond] = React.useState(false);

  const [selectedSizeForCart, setSelectedSizeForCart] = React.useState();

  const [selectedProductForCart, setSelectedProductForCart] = React.useState();

  const [selectedProduct, setSelectedProduct] = React.useState();

  const [variants, setVariants] = React.useState();

  const [cart, setCart] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getSP = (product) => {
    props
      .getSelectedProduct(product)
      .then((response) => response.json())
      .then((data) => {
        let selected = [];

        data.forEach((datum) => {
          if (datum.selected) {
            selected.push(datum);
          }
        });

        setSelectedProduct(selected);
      });
  };

  const getSV = (size) => {
    props
      .getSizeVariantById(size.id)
      .then((resp) => resp.json())
      .then((data) => {
        let newData = [];
        let obj = {};
        data.forEach((datum) => {
          obj = { ...datum, orderSelected: false };
          newData.push(obj);
        });

        setVariants(newData);
      });
  };

  const setOrderSelect = (variant) => {
    let vary = variants.map((a) => {
      return { ...a };
    });

    let varElement = vary.find((c) => c.id === variant.id);

    varElement.orderSelected = !varElement.orderSelected;
    setVariants(vary);
  };

  const saveItemToTheCart = () => {
    handleClose();
    setOpenSecond(false);

    let cartObj = {};

    cartObj.size = selectedSizeForCart;

    cartObj.product = selectedProductForCart;

    let cartObjVariants = [];

    variants.forEach((variant) => {
      if (variant.orderSelected) {
        cartObjVariants.push(variant);
      }
    });

    cartObj.variants = cartObjVariants;

    let newCart = cart;

    newCart.push(cartObj);

    console.log(newCart);

    setCart(newCart);
  };

  return (
    <Grid>
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Sound
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            {selectedProduct
              ? selectedProduct.map((size) => (
                  <div key={size.id}>
                    <ListItem
                      onClick={() => {
                        setSelectedSizeForCart(size);
                        getSV(size);
                        setOpenSecond(true);
                      }}
                      button
                    >
                      <ListItemText
                        primary={size.sizename}
                        secondary={size.unitprice}
                      />
                    </ListItem>
                    <Divider />
                  </div>
                ))
              : null}
          </List>
          <Dialog
            fullScreen
            open={openSecond}
            onClose={handleClose}
            TransitionComponent={Transition}
          >
            <AppBar sx={{ position: "relative" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={() => setOpenSecond(false)}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  Ses
                </Typography>
                <Button
                  autoFocus
                  color="inherit"
                  onClick={() => {
                    saveItemToTheCart();
                  }}
                >
                  save
                </Button>
              </Toolbar>
            </AppBar>
            <Grid container spacing={{ xs: 2, md: 3 }} padding={2}>
              {variants
                ? variants.map((variant) => (
                    <Grid item xs={6} sm={4} md={3} key={variant.sizevariantid}>
                      <Item
                        sx={{
                          boxShadow: variant.orderSelected
                            ? "inset 0 0 10px rgba(0, 0, 0, 0.5)"
                            : "",
                        }}
                        onClick={() => {
                          setOrderSelect(variant);
                        }}
                      >
                        <div>{variant.variantname}</div>
                      </Item>
                    </Grid>
                  ))
                : null}
            </Grid>
          </Dialog>
        </Dialog>
      </div>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "75%" }}>
          <Grid
            container
            rowSpacing={2}
            paddingX={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {props.products.map((product) => (
              <React.Fragment key={product.id}>
                <Grid
                  onClick={() => {
                    setSelectedProductForCart(product);
                    getSP(product);
                    handleClickOpen(true);
                  }}
                  item
                  xs={6}
                  md={4}
                >
                  <Item>
                    {product.productid} - {product.productname}
                  </Item>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Box>

        <Paper
          sx={{
            width: "25%",
            height: "100vh",
            position: "fixed",
            right: "0",
            top: "0",
          }}
        >
          <Typography variant="h6" align="center" marginY={2}>
            Dein Bestellung
          </Typography>
          <Divider></Divider>
          {cart.map((cartItem) => (
            <Box padding={1}>
              {cartItem.product.productid} - {cartItem.product.productname} - (
              {cartItem.size.sizename})
            </Box>
          ))}
        </Paper>
      </Box>
    </Grid>
  );
}
