import { React, useState, useEffect } from "react";
import { Row, Col, Button, Container } from "reactstrap";
import { AiOutlineEnter, AiOutlineClose } from "react-icons/ai";

export default function OrderHistoryComponent(props) {
  let [dailyRevenue, setDailyRevenue] = useState(0);

  let iconstyles = { fontSize: "22px" };

  useEffect(() => {
    let daily = 0;
    getLastDayOrders(props).forEach((order) => {
      daily += order.data.totalCost;
    });

    setDailyRevenue(daily);
  }, [getLastDayOrders(props).length]);

  return (
    <Container className="mb-3 py-3 shadow shadow-intensity-lg border rounded">
      <div>{dailyRevenue.toFixed(2)}€</div>
      {props.orderHistory.map((order) => (
        <Container>
          <Row>
            <Col>
              <AiOutlineEnter
                style={iconstyles}
                onClick={() => props.changeIsOpen(order)}
              ></AiOutlineEnter>
              {order.id}
            </Col>
            <Col>{order.data.dateTime}</Col>
            <Col>{order.data.totalCost.toFixed(2)}€</Col>
            <Col>
              <AiOutlineClose
                onClick={() => props.deleteOrder(order)}
                style={iconstyles}
              />
            </Col>
          </Row>
          <Container style={{ boxShadow: "inset 0 0 5px 0 #c7c7c7" }}>
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
        </Container>
      ))}
    </Container>
  );
}

const getLastDayOrders = (props) => {
  let date = new Date();

  let day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }

  let month = date.getMonth() + 1;

  if (month < 10) {
    month = "0" + month;
  }

  let year = date.getFullYear();

  let currentDate = day + "/" + month + "/" + year;

  let lastDayOrders = props.orderHistory.filter((order) =>
    order.data.dateTime.startsWith(currentDate)
  );
  return lastDayOrders;
};
