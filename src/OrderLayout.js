import React, { Component } from "react";
import { Col } from "reactstrap";
import CategoryList from "./CategoryList";
import CreateOrder from "./CreateOrder";

export default class OrderLayout extends Component {
  render() {
    return (
      <>
        <Col xs="3">
          <CategoryList
            currentCategory={this.props.currentCategory}
            changeCategory={this.props.changeCategory}
          />
        </Col>
        <Col xs="9">
          <CreateOrder
            catProducts={this.props.catProducts}
            addToCart={this.props.addToCart}
            orderNumber={this.props.orderNumber}
            setOrderNumber={this.props.setOrderNumber}
          />
        </Col>
      </>
    );
  }
}
