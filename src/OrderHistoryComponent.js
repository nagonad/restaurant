import React from "react";
import { Row, Col, Button, Container } from "reactstrap";
import { AiOutlineEnter, AiOutlineClose } from "react-icons/ai";

export default function OrderHistoryComponent(props) {
  let iconstyles = { fontSize: "22px" };

  return (
    <Container
      className="mb-3 py-3 shadow shadow-intensity-lg border rounded"
      style={{ border: "2px solid" }}
    >
      {props.orderHistory.map((order) => (
        <>
          <Row>
            <Col>{order.id}</Col>
            <Col>{order.data.dateTime}</Col>
            <Col>{order.data.totalCost.toFixed(2)}€</Col>
            <Col>
              <Row>
                <Col>
                  <AiOutlineEnter
                    onClick={() => props.changeIsOpen(order)}
                    style={iconstyles}
                    className="border"
                  />
                </Col>
                <Col>
                  <AiOutlineClose style={iconstyles} className="border" />
                </Col>
              </Row>
            </Col>
          </Row>
          <Container className="mx-2 shadow-sm  rounded">
            {order.isOpen && (
              <Row>
                <Col>{order.data.checkoutInformation.costumerName}</Col>
                <Col>{order.data.checkoutInformation.address}</Col>
                <Col>{order.data.checkoutInformation.phoneNumber}</Col>
                <Col>
                  {order.data.checkoutInformation.delivery
                    ? "Lieferung: " +
                      order.data.checkoutInformation.deliveryTarget
                    : "Abholung"}
                </Col>
              </Row>
            )}
            {order.isOpen &&
              order.data.cart.map((cartItem) => (
                <Row>
                  <Col>{cartItem.product.productName}</Col>
                  <Col>{cartItem.productSize}</Col>
                  <Col>{cartItem.quantity}</Col>
                </Row>
              ))}
          </Container>
        </>
      ))}
    </Container>
  );
}
