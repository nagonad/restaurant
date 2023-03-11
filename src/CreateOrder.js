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
import Delete from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";

import { RemoveRounded, AddRounded } from "@mui/icons-material";
import PrintComponent from "./PrintComponent";
import CreateOrderAppBar from "./CreateOrderAppBar";

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

  const [checkoutControl, setCheckoutControl] = React.useState(false);

  const [finalOrderObj, setFinalOrderOjb] = React.useState();

  const [delivery, setDelivery] = React.useState();

  const [deliveryCost, setDeliveryCost] = React.useState("");

  const [costumerObj, setCostumerObj] = React.useState();

  const [phoneNumberInputValue, setPhoneNumberInputValue] = React.useState();

  const [costumerName, setCostumerName] = React.useState();

  const [costumerAddress, setCostumerAddress] = React.useState();

  const [phoneNumbers, setPhoneNumbers] = React.useState();

  const [kundeDialog, setKundeDialog] = React.useState(false);

  const [cartTotalCost, setCartTotalCost] = React.useState(0);

  const [orderTotalCost, setOrderTotalCost] = React.useState(0);

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
    console.log(size);
    props
      .getSizeVariantById(size.productsizesid)
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

    let cost = 0;

    variants.forEach((variant) => {
      if (variant.orderSelected) {
        cost += parseFloat(variant.price);
        cartObjVariants.push(variant);
      }
    });

    cartObj.variants = cartObjVariants;

    cartObj.cartItemCost = parseFloat(cartObj.size.unitprice);

    cartObj.cartItemTotalCost = parseFloat(cartObj.size.unitprice) + cost;

    cartObj.cartItemVariantsCost = cost;

    let newCart = cart;

    newCart.push(cartObj);

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

    newCartItem.cartItemTotalCost =
      (newCartItem.cartItemCost + newCartItem.cartItemVariantsCost) *
      newCartItem.quantity;

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

    newCartItem.cartItemTotalCost =
      (newCartItem.cartItemCost + newCartItem.cartItemVariantsCost) *
      newCartItem.quantity;

    if (newCartItem.quantity === 0) {
      newCart.splice(newCart.indexOf(newCartItem), 1);
    }

    setCart(newCart);
  };

  const handleChangePhoneNumber = (e, value) => {
    if (!checkoutControl) {
      setCheckoutControl(true);
    }

    if (value) {
      setCostumerObj(value);
      setPhoneNumberInputValue(value.phonenumber);
      setCostumerName(value.costumername);
      setCostumerAddress(value.costumeraddress);
    } else {
      setCostumerObj(null);
      setPhoneNumberInputValue(null);
      setCostumerName(null);
      setCostumerAddress(null);
    }
  };

  const handleDelivery = (e) => {
    setDeliveryCost("");
    setDelivery(e);
  };

  const deleteCheckoutInfo = () => {
    setCheckoutControl(false);

    setCostumerObj(null);
    setCostumerName(null);
    setCostumerAddress(null);
    setPhoneNumberInputValue(null);
    setDeliveryCost(null);
    setDelivery();
  };

  const renderCheckoutInfo = () => {
    let str1 = "";

    if (phoneNumberInputValue) {
      str1 += phoneNumberInputValue + ", ";
    }
    if (costumerAddress) {
      str1 += costumerAddress + ", ";
    }

    if (costumerName) {
      str1 += costumerName + ", ";
    }

    if (delivery === 1) {
      str1 += `Lieferung(${deliveryCost}€)` + ", ";
    }

    if (str1.length > 0) {
      str1 = str1.trim();
      str1 = str1.substring(0, str1.length - 1);
    }

    if (checkoutControl) {
      let str = (
        <>
          <Divider></Divider>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box
              component="div"
              sx={{
                fontStyle: "oblique",
                overflow: "hidden",
              }}
            >
              {str1}
            </Box>
            <Box>
              <Delete
                onClick={() => deleteCheckoutInfo()}
                sx={{ marginRight: 1 }}
              ></Delete>
            </Box>
          </Box>
        </>
      );

      return str;
    } else {
      return null;
    }
  };

  const finalizeOrder = () => {
    if (cart.length > 0) {
      let obj = finalOrderObj;

      obj.cart = JSON.stringify(obj.cart);

      props.saveOrder(obj).then(() => window.location.reload(false));
    } else {
      alert("Sepetiniz bos");
    }
  };

  React.useEffect(() => {
    let cartTotalCost = 0;

    cart.forEach((cartItem) => {
      cartTotalCost += parseFloat(cartItem.cartItemTotalCost);
    });

    setCartTotalCost(cartTotalCost);

    setOrderTotalCost(cartTotalCost + deliveryCost);

    if (cart.length > 0) {
      let order = {};

      if (costumerObj) {
        order.costumerid = costumerObj.id;
      }

      if (delivery === 1) {
        order.delivery = 1;
      } else {
        order.delivery = 2;
      }

      if (deliveryCost) {
        order.deliverycost = deliveryCost;
      }

      order.cartcost = cartTotalCost;

      order.totalcost = cartTotalCost + deliveryCost;

      order.cart = cart;

      order.orderdate = new Date().toISOString().slice(0, 10);

      order.ordertime = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
      });

      // console.log(order);

      setFinalOrderOjb(order);
    }
  }, [cart, cart.length, deliveryCost]);

  React.useEffect(() => {
    props
      .getCostumerInfo()
      .then((resp) => resp.json())
      .then((data) => {
        setPhoneNumbers(data);
      });
  }, []);

  return (
    <>
      {/* <CreateOrderAppBar
        getProducts={props.getProducts}
        categories={props.categories}
        toggleDrawer={props.toggleDrawer}
      ></CreateOrderAppBar> */}
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
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
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
                    <div key={size.productsizesid}>
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
                      <Grid
                        item
                        xs={6}
                        sm={4}
                        md={3}
                        key={variant.sizevariantid}
                      >
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
                  deleteCheckoutInfo();
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
                  setCheckoutControl(true);
                  setKundeDialog(false);
                }}
              >
                save
              </Button>
            </Toolbar>
          </AppBar>
          <Grid paddingTop={2} container>
            <Grid item xs={12} md={4}>
              <ListItem>
                {phoneNumbers ? (
                  <>
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      sx={{ width: 300 }}
                      onChange={(e, value) => handleChangePhoneNumber(e, value)}
                      options={phoneNumbers}
                      getOptionLabel={(option) => option.phonenumber}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          onChange={(e) => handleChangePhoneNumber(e)}
                          label="Phone Number"
                        />
                      )}
                    />
                  </>
                ) : null}
              </ListItem>
            </Grid>
            <Grid item xs={12} md={4}>
              <ListItem xs={4}>
                <TextField
                  sx={{ width: 300 }}
                  label="Kunde Name"
                  variant="outlined"
                  value={costumerName || ""}
                  onChange={(e) => setCostumerName(e.target.value)}
                />
              </ListItem>
            </Grid>
            <Grid item xs={12} md={4}>
              <ListItem xs={4}>
                <TextField
                  sx={{ width: 300 }}
                  label="Address"
                  variant="outlined"
                  value={costumerAddress || ""}
                  onChange={(e) => setCostumerAddress(e.target.value)}
                />
              </ListItem>
            </Grid>
            <Grid item xs={12} md={4}>
              <ListItem xs={4}>
                <FormControl sx={{ width: 300 }}>
                  <InputLabel id="demo-simple-select-label">
                    Lieferung oder Abholung
                  </InputLabel>
                  <Select
                    label="Lieferung oder Abholung"
                    value={delivery || ""}
                    onChange={(e) => handleDelivery(e.target.value)}
                  >
                    <MenuItem value={1}>Lieferung</MenuItem>
                    <MenuItem value={2}>Abholung</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
            </Grid>
            {delivery === 1 ? (
              <Grid item xs={12} md={4}>
                <ListItem xs={4}>
                  <FormControl sx={{ width: 300 }}>
                    <InputLabel id="demo-simple-select-label">
                      Lieferung Kosten
                    </InputLabel>
                    <Select
                      startAdornment={
                        <InputAdornment position="start">€</InputAdornment>
                      }
                      value={deliveryCost}
                      label="Lieferung Kosten"
                      onChange={(e) => setDeliveryCost(e.target.value)}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={7}>7</MenuItem>
                      <MenuItem value={8}>8</MenuItem>
                      <MenuItem value={9}>9</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
              </Grid>
            ) : null}
          </Grid>
          <Divider />
        </Dialog>
        <Box paddingTop={2} sx={{ display: "flex" }}>
          <Box sx={{ width: "70%" }}>
            <Grid
              container
              rowSpacing={2}
              paddingX={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {props.categorizedProducts.map((product) => (
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
              Deine Bestellung
              {orderTotalCost && orderTotalCost > 0
                ? ` - ${parseFloat(orderTotalCost).toFixed(2)}€`
                : null}
            </Typography>
            <Divider></Divider>
            {cart.map((cartItem) => (
              <Box
                key={cartItem.orderNumber}
                padding={1}
                sx={{ width: "100%" }}
              >
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
            >
              <Box padding={1}>{renderCheckoutInfo()}</Box>
              <Divider sx={{ borderBottomWidth: 5 }}></Divider>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
                margin={2}
              >
                <Button
                  onClick={() => setKundeDialog(true)}
                  variant="contained"
                >
                  Kunde Info
                </Button>
                {cart.length > 0 ? (
                  <PrintComponent
                    costumerName={costumerName}
                    costumerAddress={costumerAddress}
                    phoneNumberInputValue={phoneNumberInputValue}
                    finalOrderObj={finalOrderObj}
                    finalizeOrder={finalizeOrder}
                  ></PrintComponent>
                ) : (
                  <Button variant="contained" onClick={() => finalizeOrder()}>
                    Drücken
                  </Button>
                )}
              </Box>
            </Box>
          </Paper>
        </Box>
      </Grid>
    </>
  );
}
