import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import { Button, Label, Input, Form, FormGroup, Col, Row } from "reactstrap";

export default function CheckoutModal(props) {
  const [orderItemDescription, setOrderItemDescription] = useState("");

  const customStyles = {
    content: {
      top: "35%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "60%",
      transform: "translate(-40%, -10%)",
    },
  };

  const handleOrderItemDescription = (e) => {
    setOrderItemDescription(e.target.value);
  };

  const renderCurrentOrderItem = () => {
    if (props.currentOrderItem.product) {
      return (
        props.currentOrderItem.product.productName +
        " - " +
        props.currentOrderItem.size
      );
    } else return null;
  };
  return (
    <div className="modal">
      <Modal
        style={customStyles}
        isOpen={props.isOpen}
        contentLabel="Example Modal"
        backdropColor={"white"}
        backdropOpacity={1}
      >
        <h3>{renderCurrentOrderItem()}</h3>

        <Form>
          <FormGroup row>
            <Label for="orderItemDescription" sm={2}>
              Item description
            </Label>
            <Col sm={10}>
              <Input
                onChange={handleOrderItemDescription}
                id="orderItemDescription"
              />
            </Col>
          </FormGroup>
        </Form>
        <div className="d-flex justify-content-between">
          <Button
            className="btn btn-danger"
            onClick={() => {
              props.toggle();
              setOrderItemDescription("");
            }}
          >
            Cancel
          </Button>
          <Button
            className="btn btn-success"
            onClick={() => {
              props.addToCart(
                props.currentOrderItem.product,
                props.currentOrderItem.size,
                orderItemDescription
              );
              setOrderItemDescription("");
              props.toggle();
            }}
          >
            Order
          </Button>
        </div>
      </Modal>
    </div>
  );
}
