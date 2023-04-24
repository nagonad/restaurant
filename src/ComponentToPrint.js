import React, { forwardRef } from "react";
import { Box, Divider, Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  printSource: {
    "@media print": {
      display: "block",
    },
    display: "none",
  },
});

const renderVariants = (cartItem) => {
  let str = "";

  cartItem.variants.forEach((variant) => {
    str += variant.variantname + ", ";
  });

  str = str.trim();

  str = str.substring(0, str.length - 1);

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box sx={{ fontStyle: "italic" }}>{cartItem.variants ? str : null}</Box>
      {cartItem.cartItemVariantsCost ? (
        <Box sx={{ marginLeft: "auto" }}>
          {(cartItem.cartItemVariantsCost * cartItem.quantity).toFixed(2)}€
        </Box>
      ) : null}
    </Box>
  );
};

const renderCart = (props) => {
  return (
    <Box paddingBottom={4} paddingTop={2}>
      {props.finalOrderObj.cart.map((cartItem) => (
        <Box
          key={cartItem.orderNumber}
          paddingTop={1}
          sx={{ display: "flex", flexDirection: "row" }}
        >
          <Box paddingRight={1} sx={{ fontWeight: "bold" }}>
            {cartItem.quantity}x
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Box>
                {cartItem.product.productid} {cartItem.product.productname}{" "}
                {cartItem.size.sizename !== "SingleSize"
                  ? cartItem.size.sizename
                  : null}
              </Box>
              <Box sx={{ marginLeft: "auto" }}>
                {parseFloat(
                  cartItem.size.unitprice * cartItem.quantity
                ).toFixed(2)}
                €
              </Box>
            </Box>
            {renderVariants(cartItem)}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

const ComponentToPrint = forwardRef((props, ref) => {
  const classes = useStyles();

  return (
    <Box
      ref={ref}
      className={classes.printSource}
      sx={{ display: "flex", flexDirection: "column" }}
      paddingTop={3}
      marginX={2}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: "8px",
        }}
      >
        <img src={"./logo.png"} alt="Logo" style={{ width: "100px" }} />
      </Box>
      <Divider></Divider>
      <Box marginY={1}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box>
            {props.finalOrderObj.orderdate} {props.finalOrderObj.ordertime}
          </Box>
          <Box
            sx={{
              marginLeft: "auto",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {props.finalOrderObj.delivery === 1 ? "Lieferung" : "Abholung"}
          </Box>
        </Box>
        <Box sx={{ fontStyle: "italic" }}>{props.costumerName}</Box>
        <Box sx={{ fontStyle: "italic" }}>{props.costumerAddress}</Box>
        <Box sx={{ fontStyle: "italic" }}>{props.phoneNumberInputValue}</Box>
      </Box>
      <Divider></Divider>

      <Divider></Divider>
      {renderCart(props)}
      <Divider></Divider>
      <Box paddingTop={2}>{props.finalOrderObj.cart.length} Artikel</Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {props.finalOrderObj.delivery === 1 ? (
          <Box sx={{ display: "flex" }}>
            <Box>Lieferpesen </Box>
            <Box sx={{ marginLeft: "auto", display: "flex" }}>
              <Box sx={{ fontSize: "12px", marginTop: "4px" }}>(inkl.MwSt)</Box>
              <Box>{`${props.finalOrderObj.deliverycost?.toFixed(2)}€`}</Box>
            </Box>
          </Box>
        ) : null}
        <Box sx={{ display: "flex" }}>
          <Box>Speisen</Box>
          <Box sx={{ marginLeft: "auto", display: "flex" }}>
            <Box sx={{ fontSize: "12px", marginTop: "4px" }}>(inkl.MwSt)</Box>
            <Box>{`${props.finalOrderObj.cartcost.toFixed(2)}€`}</Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box>Gesamptpreis</Box>
          <Box sx={{ marginLeft: "auto", display: "flex" }}>
            <Box sx={{ fontSize: "12px", marginTop: "4px" }}>(inkl.MwSt)</Box>
            <Box>
              {`${parseFloat(props.finalOrderObj.totalcost).toFixed(2)}€`}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box paddingTop={3}>
        <Typography
          sx={{ fontSize: "7px", fontWeight: "light", lineHeight: "8px" }}
        >
          Speicherung und Nutzung der Personendäten gem. Art. 6 Abs. 1 lit. b)
          DSGVO
          https://www.datenschutz-grundverordnung.eu/grundverordnung/art-6-ds-gvo/
        </Typography>
      </Box>
    </Box>
  );
});

export default ComponentToPrint;
