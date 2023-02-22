import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import CartSummary from "./CartSummary";
import { Link } from "react-router-dom";

export default class Navi extends Component {
  state = { isOpen: false };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div>
        <Navbar light expand="md">
          <NavbarBrand href="/">Sel Restaurant</NavbarBrand>
          <NavbarToggler onClick={() => this.toggle()} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav
              navbar
              className="justify-content-end"
              style={{ width: "100%" }}
            >
              <NavItem>
                <Link className="nav-link" to="/variantGroupControl">
                  Variant Group Control
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/variantControl">
                  Variant Control
                </Link>
              </NavItem>

              <NavItem>
                <Link className="nav-link" to="/orderHistory">
                  Order History
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/menuControl">
                  Menu Control
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/">
                  Create Order
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/checkout">
                  CheckOut
                </Link>
              </NavItem>
              <CartSummary
                removeFromCart={this.props.removeFromCart}
                cart={this.props.cart}
              ></CartSummary>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
