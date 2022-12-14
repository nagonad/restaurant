import Navi from "./Navi.js";

import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import Checkout from "./Checkout.js";
import { Routes, Route } from "react-router-dom";
import OrderLayout from "./OrderLayout.js";
import MenuControl from "./MenuControl";
import "./App.css";

export default class App extends Component {
  state = {
    currentCategory: "",
    products: [],
    catProducts: [],
    cart: [],
    orderNumber: 0,
    checkoutInformation: {
      phoneNumber: "",
      costumerName: "",
      address: "",
      checkoutNote: "",
      delivery: false,
      deliveryTarget: "",
    },
    locations: {
      ort1: 3,
      ort2: 4,
      ort3: 5,
      ort4: 6,
    },
    costumerInfo: [],
    phoneNumberValue: "",
  };

  changeCostumerName = (value) => {
    let newCheckoutInformation = this.state.checkoutInformation;

    newCheckoutInformation.costumerName = value;

    this.setState({ checkoutInformation: newCheckoutInformation });
  };

  changeAddress = (value) => {
    let newCheckoutInformation = this.state.checkoutInformation;

    newCheckoutInformation.address = value;

    this.setState({ checkoutInformation: newCheckoutInformation });
  };

  changePhoneNumber = (value) => {
    let newCheckoutInformation = this.state.checkoutInformation;

    newCheckoutInformation.phoneNumber = value;

    this.setState({ checkoutInformation: newCheckoutInformation });
  };

  changePhoneNumberValue = (value) => {
    this.setState({ phoneNumberValue: value });
  };

  changeDeliveryTarget = (e) => {
    let newCheckoutInformation = this.state.checkoutInformation;

    newCheckoutInformation.deliveryTarget = e.target.value;

    this.setState({ checkoutInformation: newCheckoutInformation });
  };

  changeExtraProductCost = (event, orderNumber) => {
    let newCart = this.state.cart;
    let newCartItem = newCart.find((c) => c.orderNumber === orderNumber);
    newCartItem.extraProductCost = event.target.value;

    this.setState({ cart: newCart });
  };

  changeCostumerInfo = (costumer) => {
    this.setState({ costumerInfo: costumer });
  };

  changeCheckoutInformation = (e) => {
    let newCheckoutInformation = this.state.checkoutInformation;

    if (e.target.name === "delivery") {
      if (e.target.value === "Lieferung") {
        newCheckoutInformation[e.target.name] = true;
        newCheckoutInformation.deliveryTarget = Object.keys(
          this.state.locations
        )[0];
      }
      if (e.target.value === "Abholung") {
        newCheckoutInformation[e.target.name] = false;
        newCheckoutInformation.deliveryTarget = "";
      }
    } else {
      newCheckoutInformation[e.target.name] = e.target.value;
    }

    this.setState({ checkoutInformation: newCheckoutInformation });
  };

  setOrderNumber = () => {
    this.setState({ orderNumber: this.state.orderNumber + 1 });
  };

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter(
      (c) => c.orderNumber !== product.orderNumber
    );
    this.setState({ cart: newCart });
  };

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryname });
    this.getProducts(category.id);
  };

  addToCart = (product, productSize, orderNote) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find((c) => {
      return (
        c.product.productId === product.productId &&
        c.productSize === productSize &&
        c.orderNote === orderNote
      );
    });
    if (addedItem) {
      if (addedItem.quantity < 9) {
        addedItem.quantity += 1;
      } else {
        addedItem.quantity = 9;
      }
    } else {
      newCart.push({
        product: product,
        quantity: 1,
        orderNote: orderNote,
        productSize: productSize,
        orderNumber: this.state.orderNumber,
      });
    }

    this.setState({ cart: newCart });
  };
  handleSelect = (e, orderNumber) => {
    let newCart = this.state.cart;
    let newCartElement = newCart.find((c) => c.orderNumber === orderNumber);
    newCartElement.quantity = parseInt(e.target.value);
    this.setState({ cart: newCart });
  };

  getProducts = (categoryId) => {
    let url = "http://localhost:5000/menu";
    if (categoryId) {
      url += "/" + categoryId;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ products: data });
        this.categorizeProducts(data);
      });
  };
  componentDidMount() {
    this.getProducts();
  }

  categorizeProducts = (products) => {
    let categorizedProductList = [];

    let controller;

    for (let i = 0; i < products.length; i++) {
      controller = false;
      for (let k = 0; k < categorizedProductList.length; k++) {
        if (products[i].productid === categorizedProductList[k].productId) {
          if (products[i].productsize === "Klein") {
            categorizedProductList[k].unitPrice.Klein = products[i].unitprice;
          }
          if (products[i].productsize === "Mittel") {
            categorizedProductList[k].unitPrice.Mittel = products[i].unitprice;
          }
          if (products[i].productsize === "Gro??") {
            categorizedProductList[k].unitPrice.Gro?? = products[i].unitprice;
          }
          if (products[i].productsize === "Grand") {
            categorizedProductList[k].unitPrice.Grand = products[i].unitprice;
          }
          controller = true;
        }
      }

      if (controller === false) {
        categorizedProductList[categorizedProductList.length] = {
          id: null,
          productName: null,
          productId: null,
          categoryId: null,
          productDescription: null,
          unitPrice: {
            Klein: null,
            Mittel: null,
            Gro??: null,
            Grand: null,
          },
        };

        categorizedProductList[categorizedProductList.length - 1].productId =
          products[i].productid;

        categorizedProductList[categorizedProductList.length - 1].id =
          products[i].id;
        categorizedProductList[categorizedProductList.length - 1].categoryId =
          products[i].categoryid;
        categorizedProductList[categorizedProductList.length - 1].productName =
          products[i].productname;
        categorizedProductList[
          categorizedProductList.length - 1
        ].productDescription = products[i].productdescription;

        if (products[i].productsize === "Klein") {
          categorizedProductList[
            categorizedProductList.length - 1
          ].unitPrice.Klein = products[i].unitprice;
        }
        if (products[i].productsize === "Mittel") {
          categorizedProductList[
            categorizedProductList.length - 1
          ].unitPrice.Mittel = products[i].unitprice;
        }
        if (products[i].productsize === "Gro??") {
          categorizedProductList[
            categorizedProductList.length - 1
          ].unitPrice.Gro?? = products[i].unitprice;
        }
        if (products[i].productsize === "Grand") {
          categorizedProductList[
            categorizedProductList.length - 1
          ].unitPrice.Grand = products[i].unitprice;
        }
      }
    }

    this.setState({ catProducts: categorizedProductList });
  };

  render() {
    return (
      <Container>
        <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />

        <Row>
          <Routes>
            <Route
              exact
              path="/"
              element={
                // <MenuControl></MenuControl>
                <OrderLayout
                  currentCategory={this.state.currentCategory}
                  changeCategory={this.changeCategory}
                  catProducts={this.state.catProducts}
                  addToCart={this.addToCart}
                  orderNumber={this.orderNumber}
                  setOrderNumber={this.setOrderNumber}
                />
              }
            ></Route>
            <Route
              exact
              path="/checkout"
              element={
                <Checkout
                  changeAddress={this.changeAddress}
                  changeCostumerName={this.changeCostumerName}
                  changePhoneNumber={this.changePhoneNumber}
                  changePhoneNumberValue={this.changePhoneNumberValue}
                  phoneNumberValue={this.state.phoneNumberValue}
                  changeCostumerInfo={this.changeCostumerInfo}
                  costumerInfo={this.state.costumerInfo}
                  locations={this.state.locations}
                  changeDeliveryTarget={this.changeDeliveryTarget}
                  changeCheckoutInformation={this.changeCheckoutInformation}
                  checkoutInformation={this.state.checkoutInformation}
                  removeFromCart={this.removeFromCart}
                  handleSelect={this.handleSelect}
                  cart={this.state.cart}
                  changeExtraProductCost={this.changeExtraProductCost}
                />
              }
            ></Route>
          </Routes>
        </Row>
      </Container>
    );
  }
}
