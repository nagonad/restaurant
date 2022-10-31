import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  NavItem,
  NavLink,
} from "reactstrap";
export default class CartSummary extends Component {
  renderEmptyCart = () => {
    return (
      <NavItem>
        <NavLink>Empty Cart</NavLink>
      </NavItem>
    );
  };

  renderSummary = () => {
    return (
      <UncontrolledDropdown>
        <DropdownToggle nav caret>
          Your Cart-{this.props.cart.length}
        </DropdownToggle>
        <DropdownMenu end>
          {this.props.cart.map((cartItem) => (
            <DropdownItem
              key={
                cartItem.product.id + cartItem.productSize + cartItem.orderNote
              }
            >
              <Badge
                onClick={() => this.props.removeFromCart(cartItem)}
                color="danger"
              >
                x
              </Badge>{" "}
              {cartItem.product.productName}
              {"-"}
              {cartItem.productSize}
              {"-"}
              {cartItem.orderNote ? "(" + cartItem.orderNote + ")" : null}
              <Badge color="success">{cartItem.quantity}</Badge>
            </DropdownItem>
          ))}
          <DropdownItem divider />
          <DropdownItem>Reset</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  render() {
    return (
      <div>
        {this.props.cart.length > 0
          ? this.renderSummary()
          : this.renderEmptyCart()}
      </div>
    );
  }
}
