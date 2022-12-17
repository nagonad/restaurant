import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "./ComponentToPrint";

export default function PrintComponent(props) {
  let componentRef = useRef();

  return (
    <>
      <div>
        {/* button to trigger printing of target component */}
        <ReactToPrint
          trigger={() => <Button>Print this out!</Button>}
          content={() => componentRef}
          onBeforePrint={() =>
            afterOrderProcess(
              props.cartItemQuantity,
              props.totalCost,
              props.cart,
              props.checkoutInformation
            )
          }
        />

        {/* component to be printed */}
        <ComponentToPrint
          cartItemQuantity={props.cartItemQuantity}
          totalCost={props.totalCost}
          cart={props.cart}
          checkoutInformation={props.checkoutInformation}
          ref={(el) => (componentRef = el)}
        />
      </div>
    </>
  );
}

const afterOrderProcess = (
  cartItemQuantity,
  totalCost,
  cart,
  checkoutInformation
) => {
  saveOrderInfo(cartItemQuantity, totalCost, cart, checkoutInformation);
  saveCostumerInfo(checkoutInformation);
};

const saveOrderInfo = (
  cartItemQuantity,
  totalCost,
  cart,
  checkoutInformation
) => {
  const newOrder = {
    cartItemQuantity: cartItemQuantity,
    totalCost: totalCost,
    cart: cart,
    checkoutInformation: checkoutInformation,
  };
  fetch("http://localhost:3000/orderHistory", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOrder),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const saveCostumerInfo = (checkoutInformation) => {
  let newCostumer = {
    phoneNumber: checkoutInformation.phoneNumber,
    costumerName: checkoutInformation.costumerName,
    address: checkoutInformation.address,
  };
  fetch("http://localhost:3000/costumerInfo", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCostumer),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
