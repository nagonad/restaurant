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
import { RemoveRounded, AddRounded } from "@mui/icons-material";

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

  const [kundeDialog, setKundeDialog] = React.useState(false);

  const [cartTotalCost, setCartTotalCost] = React.useState();

  const [cartItemOrderNumber, setCartItemOrderNumber] = React.useState(1);

  const [selectedSizeForCart, setSelectedSizeForCart] = React.useState();

  const [selectedProductForCart, setSelectedProductForCart] = React.useState();

  const [selectedProduct, setSelectedProduct] = React.useState();

  const [variants, setVariants] = React.useState();

  const [cart, setCart] = React.useState([]);

  const incrementCartItemOrderNumber = () => {
    setCartItemOrderNumber((prev) => prev + 1);
  };

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

    cartObj.orderNumber = cartItemOrderNumber;

    cartObj.quantity = 1;

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

    // console.log("cart: " + newCart);

    setCart(newCart);
    incrementCartItemOrderNumber();
  };

  const renderCartItem = (cartItem) => {
    let str1 = <Box sx={{ fontWeight: "bold" }}>{cartItem.quantity}x</Box>;
    let str2 = (
      <Box>
        {cartItem.product.productid} {cartItem.product.productname}{" "}
        {cartItem.size.sizename !== "SingleSize"
          ? `(${cartItem.size.sizename})`
          : null}
      </Box>
    );
    let str3 = "";
    if (cartItem.variants) {
      cartItem.variants.forEach((variant) => {
        str3 += variant.variantname + ",";
      });

      str3 = str3.substring(0, str3.length - 1);
    }

    let str4 = <Box sx={{ fontStyle: "italic" }}>{str3}</Box>;

    let str5 = (
      <Box marginLeft={"auto"} marginRight={1}>
        <RemoveRounded
          onClick={() => minusQuantity(cartItem)}
          sx={{ fontSize: "30px" }}
        ></RemoveRounded>
        <AddRounded
          onClick={() => plusQuantity(cartItem)}
          sx={{ fontSize: "30px" }}
        ></AddRounded>
      </Box>
    );

    let str6 = (
      <Box paddingX={2}>
        {str2}
        {str4 ? str4 : null}
      </Box>
    );

    let str7 = (
      <Box sx={{ display: "flex", width: "100%" }}>
        {str1}
        {str6}
        {str5}
      </Box>
    );

    return <>{str7}</>;
  };

  const plusQuantity = (cartItem) => {
    let newCart = cart.map((a) => {
      return { ...a };
    });

    let newCartItem = newCart.find(
      (c) => c.orderNumber === cartItem.orderNumber
    );

    newCartItem.quantity += 1;

    setCart(newCart);
  };

  const minusQuantity = (cartItem) => {
    let newCart = cart.map((a) => {
      return { ...a };
    });

    let newCartItem = newCart.find(
      (c) => c.orderNumber === cartItem.orderNumber
    );

    newCartItem.quantity -= 1;

    if (newCartItem.quantity === 0) {
      newCart.splice(newCart.indexOf(newCartItem), 1);
    }

    setCart(newCart);
  };

  React.useEffect(() => {
    let totalCost = 0;

    cart.forEach((cartItem) => {
      let araTotal = 0;

      araTotal += parseFloat(cartItem.size.unitprice);

      if (cartItem.variants) {
        cartItem.variants.forEach((variant) => {
          araTotal += parseFloat(variant.price);
        });
      }

      araTotal = araTotal * cartItem.quantity;

      totalCost += araTotal;
    });
    setCartTotalCost(totalCost);
  }, [cart, cart.length]);

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
                {selectedProduct ? (
                  <>
                    {selectedProductForCart.productid} -{" "}
                    {selectedProductForCart.productname}
                  </>
                ) : null}
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
            onClose={() => setOpenSecond(false)}
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
                  {selectedProductForCart ? (
                    <>
                      {selectedProductForCart.productid} -{" "}
                      {selectedProductForCart.productname}{" "}
                      {selectedSizeForCart ? (
                        <>
                          {selectedSizeForCart.sizename !== "SingleSize"
                            ? `(${selectedSizeForCart.sizename})`
                            : null}
                        </>
                      ) : null}
                    </>
                  ) : null}
                </Typography>
                <Button
                  autoFocus
                  color="inherit"
                  onClick={() => {
                    saveItemToTheCart();
                  }}
                >
                  Save
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
      <Dialog
        fullScreen
        open={kundeDialog}
        onClose={() => {
          setKundeDialog(false);
        }}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setKundeDialog(false);
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Kunde Info
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                console.log("save");
              }}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
      </Dialog>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "70%" }}>
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
            width: "30%",
            height: "100vh",
            position: "fixed",
            right: "0",
            top: "0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" align="center" marginY={2}>
            Dein Bestellung
            {cartTotalCost ? ` - ${cartTotalCost.toFixed(2)}€` : null}
          </Typography>
          <Divider></Divider>
          {cart.map((cartItem) => (
            <Box key={cartItem.orderNumber} padding={1} sx={{ width: "100%" }}>
              {renderCartItem(cartItem)}
              <Divider></Divider>
            </Box>
          ))}

          <Box
            sx={{
              display: "flex",
              marginTop: "auto",
              flexDirection: "column",
            }}
            padding={2}
          >
            <Divider></Divider>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
              }}
              marginTop={2}
            >
              <Button onClick={() => setKundeDialog(true)} variant="contained">
                Kunde Info
              </Button>
              <Button variant="contained">Drücken</Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
}
