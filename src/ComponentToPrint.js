import React, { forwardRef } from "react";
import { Box, Divider, Typography } from "@mui/material";
import logo from "./logo.png";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  printSource: {
    "@media print": {
      display: "block",
    },
    display: "none",
  },
});

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
        <img src={logo} alt="Bissula Grill" style={{ width: "100px" }} />
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
        <Box>{props.costumerName}</Box>
        <Box>{props.costumerAddress}</Box>
        <Box>{props.phoneNumberInputValue}</Box>
      </Box>
      <Divider></Divider>
      {/* <Box>
        <Typography
          sx={{ fontSize: "7px", fontWeight: "light", lineHeight: "8px" }}
        >
          Speicherung und Nutzung der Personendäten gem. Art. 6 Abs. 1 lit. b)
          DSGVO
          https://www.datenschutz-grundverordnung.eu/grundverordnung/art-6-ds-gvo/
        </Typography>
      </Box> */}
      <Divider></Divider>
      <Box>
        {props.finalOrderObj.cart.map((cartItem) => (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box paddingRight={1} sx={{ fontWeight: "bold" }}>
              {cartItem.quantity}x
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box>
                  {cartItem.product.productid} {cartItem.product.productname}{" "}
                  {cartItem.size.sizename !== "SingleSize"
                    ? cartItem.size.sizename
                    : null}
                </Box>
                <Box sx={{ marginLeft: "auto" }}>
                  {cartItem.size.unitprice}€
                </Box>
              </Box>
              <Box sx={{ fontStyle: "italic" }}>
                {cartItem.variants
                  ? cartItem.variants.map(
                      (variant) => `${variant.variantname},`
                    )
                  : null}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
});

export default ComponentToPrint;
