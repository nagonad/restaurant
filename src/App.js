import Navi from "./Navi.js";

import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import Checkout from "./Checkout.js";
import { Routes, Route } from "react-router-dom";
import OrderLayout from "./OrderLayout.js";

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
    this.setState({ currentCategory: category.categoryName });
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
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ products: data });
        this.categorizeProducts(data);
      });
  };
  componentDidMount() {
    console.log("componentdidmount");
    this.getProducts();
  }

  categorizeProducts = (products) => {
    let categorizedProductList = [];

    let controller;

    for (let i = 0; i < products.length; i++) {
      controller = false;
      for (let k = 0; k < categorizedProductList.length; k++) {
        if (products[i].productId === categorizedProductList[k].productId) {
          if (products[i].productSize === "Klein") {
            categorizedProductList[k].unitPrice.Klein = products[i].unitPrice;
          }
          if (products[i].productSize === "Mittel") {
            categorizedProductList[k].unitPrice.Mittel = products[i].unitPrice;
          }
          if (products[i].productSize === "Groß") {
            categorizedProductList[k].unitPrice.Groß = products[i].unitPrice;
          }
          if (products[i].productSize === "Grand") {
            categorizedProductList[k].unitPrice.Grand = products[i].unitPrice;
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
            Groß: null,
            Grand: null,
          },
        };
        categorizedProductList[categorizedProductList.length - 1].productId =
          products[i].productId;
        categorizedProductList[categorizedProductList.length - 1].id =
          products[i].id;
        categorizedProductList[categorizedProductList.length - 1].categoryId =
          products[i].categoryId;
        categorizedProductList[categorizedProductList.length - 1].productName =
          products[i].productName;
        categorizedProductList[
          categorizedProductList.length - 1
        ].productDescription = products[i].productDescription;

        if (products[i].productSize === "Klein") {
          categorizedProductList[
            categorizedProductList.length - 1
          ].unitPrice.Klein = products[i].unitPrice;
        }
        if (products[i].productSize === "Mittel") {
          categorizedProductList[
            categorizedProductList.length - 1
          ].unitPrice.Mittel = products[i].unitPrice;
        }
        if (products[i].productSize === "Groß") {
          categorizedProductList[
            categorizedProductList.length - 1
          ].unitPrice.Groß = products[i].unitPrice;
        }
        if (products[i].productSize === "Grand") {
          categorizedProductList[
            categorizedProductList.length - 1
          ].unitPrice.Grand = products[i].unitPrice;
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
