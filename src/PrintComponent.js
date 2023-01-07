import React, { useRef, useState } from "react";
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
          onBeforePrint={() => {
            afterOrderProcess(
              props.cartItemQuantity,
              props.totalCost,
              props.cart,
              props.checkoutInformation,
              props.dateTime
            );
          }}
        />

        {/* component to be printed */}
        <ComponentToPrint
          cartItemQuantity={props.cartItemQuantity}
          totalCost={props.totalCost}
          cart={props.cart}
          checkoutInformation={props.checkoutInformation}
          ref={(el) => (componentRef = el)}
          dateTime={props.dateTime}
          locations={props.locations}
        />
      </div>
    </>
  );
}

const afterOrderProcess = (
  cartItemQuantity,
  totalCost,
  cart,
  checkoutInformation,
  dateTime
) => {
  saveOrderInfo(
    cartItemQuantity,
    totalCost,
    cart,
    checkoutInformation,
    dateTime
  );
  saveCostumerInfo(checkoutInformation);
};

const saveOrderInfo = (
  cartItemQuantity,
  totalCost,
  cart,
  checkoutInformation,
  dateTime
) => {
  const newOrder = {
    cartItemQuantity: cartItemQuantity,
    totalCost: totalCost,
    cart: cart,
    checkoutInformation: checkoutInformation,
    dateTime: dateTime,
  };
  fetch("http://localhost:5000/orderHistory", {
    method: "POST",
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

  if (checkoutInformation.phoneNumber) {
    fetch(
      `http://localhost:5000/costumer_info/${checkoutInformation.phoneNumber}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length < 1) {
          fetch("http://localhost:5000/costumer_info", {
            method: "POST",
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
        }
      });
  }
};
