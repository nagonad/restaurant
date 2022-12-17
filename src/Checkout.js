import React, { useState, useEffect } from "react";
import {
  Table,
  FormGroup,
  Input,
  Button,
  Container,
  Col,
  Form,
  Label,
} from "reactstrap";
import PrintComponent from "./PrintComponent";

const renderExtraProductCost = (props, cartItem) => {
  return (
    <td>
      <Input
        value={cartItem.extraProductCost}
        onChange={(event) => {
          props.changeExtraProductCost(event, cartItem.orderNumber);
        }}
        type="select"
      >
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
      </Input>
    </td>
  );
};

const renderCheckoutSummary = (props) => {
  return (
    <Container className="mb-2 shadow shadow-intensity-lg border">
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Product Size</th>
            <th>Product Note</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {props.cart.map((cartItem, index) => (
            <tr key={cartItem.orderNumber}>
              <th>{index + 1}</th>
              <td>{cartItem.product.productName}</td>
              <td>{cartItem.productSize}</td>
              <td>{cartItem.orderNote}</td>
              <td>
                {(
                  cartItem.quantity *
                  parseFloat(cartItem.product.unitPrice[cartItem.productSize])
                ).toFixed(2)}
              </td>
              <td>
                <FormGroup>
                  <Input
                    onChange={(event) => {
                      props.handleSelect(event, cartItem.orderNumber);
                    }}
                    value={cartItem.quantity}
                    type="select"
                    name="select"
                    id="exampleSelect"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                  </Input>
                </FormGroup>
              </td>
              <td>
                <Button
                  color="danger"
                  onClick={() => {
                    props.removeFromCart(cartItem);
                  }}
                >
                  Delete
                </Button>
              </td>
              {cartItem.orderNote === "" ? (
                <></>
              ) : (
                renderExtraProductCost(props, cartItem)
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

const renderLieferungOptions = (props) => {
  return (
    <>
      <Label sm={2}>Place</Label>
      <Col sm={4}>
        <Input
          onChange={props.changeDeliveryTarget}
          type="select"
          name="select"
          id="exampleSelect"
        >
          <option>ort1</option>
          <option>ort2</option>
          <option>ort3</option>
          <option>ort4</option>
        </Input>
      </Col>
    </>
  );
};

function App(props) {
  const [phoneNumberValue, setPhoneNumberValue] = useState("");
  const [costumerInfo, setCostumerInfo] = useState([]);
  const [costumerName, setCostumerName] = useState("");
  const [costumerAddress, setCostumerAddress] = useState("");

  const [totalCost, setTotalCost] = useState(0);
  const [cartItemQuantity, setCartItemQuantity] = useState(0);

  const onChange = (event) => {
    setPhoneNumberValue(event.target.value);
  };

  const fetchData = () => {
    let url = "http://localhost:3000/costumerInfo?phoneNumber_like=";
    if (phoneNumberValue !== "") {
      url += phoneNumberValue;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCostumerInfo(data);
          setCostumerName(data.costumerName);
          setCostumerAddress(data.address);
        });
    } else {
      setCostumerInfo([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [phoneNumberValue]);

  let initialCartItemQuantity = 0;
  props.cart.forEach((cartItem) => {
    initialCartItemQuantity += cartItem.quantity;
  });

  useEffect(() => {
    setCartItemQuantity(initialCartItemQuantity);
  }, [initialCartItemQuantity]);

  let totalcost = 0;
  props.cart.forEach((cartItem) => {
    totalcost +=
      cartItem.product.unitPrice[cartItem.productSize] * cartItem.quantity;
    if (cartItem.extraProductCost) {
      totalcost += parseFloat(cartItem.extraProductCost);
    }
  });

  if (props.checkoutInformation.delivery) {
    totalcost += parseFloat(
      props.locations[props.checkoutInformation.deliveryTarget]
    );
  }

  useEffect(() => {
    setTotalCost(totalcost);
  }, [totalcost]);

  return (
    <>
      <Container className="mb-3 shadow shadow-intensity-lg border rounded">
        <Form className=" mt-3 mb-2">
          <FormGroup row>
            <Label sm={2}>Phone Number</Label>
            <Col sm={4}>
              <div className="search-container">
                <div className="search-inner">
                  <Input
                    type="number"
                    value={phoneNumberValue}
                    onChange={onChange}
                  />
                </div>
                <div className="dropdown">
                  {costumerInfo.slice(0, 10).map((costumer) =>
                    costumer.phoneNumber === phoneNumberValue ? null : (
                      <div
                        onClick={() =>
                          setPhoneNumberValue(costumer.phoneNumber)
                        }
                        className="dropdown-row"
                        key={costumer.id}
                      >
                        {costumer.phoneNumber}
                      </div>
                    )
                  )}
                </div>
              </div>
            </Col>
            <Label sm={2}>Costumer Name</Label>
            <Col sm={4}>
              <Input
                value={costumerName}
                onChange={props.changeCheckoutInformation}
                type="text"
                name="costumerName"
                id="costumerName"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Adress</Label>
            <Col sm={4}>
              <Input
                value={costumerAddress}
                onChange={props.changeCheckoutInformation}
                type="text"
                name="address"
                id="adress"
              />
            </Col>
            <Label for="exampleEmail" sm={2}>
              Checkout Note
            </Label>
            <Col sm={4}>
              <Input
                value={props.checkoutInformation.checkoutNote}
                onChange={props.changeCheckoutInformation}
                type="text"
                name="checkoutNote"
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="exampleSelect" sm={2}>
              Delivery
            </Label>
            <Col sm={4}>
              <Input
                onChange={props.changeCheckoutInformation}
                type="select"
                name="delivery"
                value={
                  props.checkoutInformation.delivery ? "Lieferung" : "Abholung"
                }
              >
                <option>Abholung</option>
                <option>Lieferung</option>
              </Input>
            </Col>
            {props.checkoutInformation.delivery
              ? renderLieferungOptions(props)
              : ""}
          </FormGroup>
          <FormGroup row>
            <Col sm={6}></Col>
            <Label sm={2}>Total Price</Label>
            <Label sm={2}>{totalCost.toFixed(2)}€</Label>
            <Label sm={2}>
              <PrintComponent
                cartItemQuantity={cartItemQuantity}
                totalCost={totalCost}
                cart={props.cart}
                checkoutInformation={props.checkoutInformation}
              ></PrintComponent>
            </Label>
          </FormGroup>
        </Form>
      </Container>
      {props.cart.length > 0 ? renderCheckoutSummary(props) : <></>}
    </>
  );
}

export default App;
