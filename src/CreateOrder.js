import React, { Component } from "react";
import { Table, Input, Button } from "reactstrap";

export default class CreateOrder extends Component {
  state = { orderNote: "" };

  handleOrderNote = (orderNote) => {
    this.setState({ orderNote: orderNote.target.value });
  };

  render() {
    return (
      <div>
        <Table striped size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Klein</th>
              <th>Mittel</th>
              <th>Groß</th>
              <th>Grand</th>
            </tr>
          </thead>
          <tbody>
            {this.props.catProducts.map((product) => (
              <tr key={product.productId}>
                <th scope="row">{product.productId}</th>
                <td>{product.productName}</td>
                <td>
                  <Input onChange={this.handleOrderNote} name="orderNote" />
                </td>

                <td>
                  {product.unitPrice.Klein ? (
                    <Button
                      onClick={() => {
                        this.props.addToCart(
                          product,
                          "Klein",
                          this.state.orderNote
                        );
                        this.props.setOrderNumber();
                      }}
                    >
                      {""}
                      {product.unitPrice.Klein}
                    </Button>
                  ) : (
                    <></>
                  )}
                </td>
                <td>
                  {product.unitPrice.Mittel ? (
                    <Button
                      onClick={() => {
                        this.props.addToCart(
                          product,
                          "Mittel",
                          this.state.orderNote
                        );

                        this.props.setOrderNumber();
                      }}
                    >
                      {""}
                      {product.unitPrice.Mittel}
                    </Button>
                  ) : (
                    <></>
                  )}
                </td>
                <td>
                  {product.unitPrice.Groß ? (
                    <Button
                      onClick={() => {
                        this.props.addToCart(
                          product,
                          "Groß",
                          this.state.orderNote
                        );
                        this.props.setOrderNumber();
                      }}
                    >
                      {""}
                      {product.unitPrice.Groß}
                    </Button>
                  ) : (
                    <></>
                  )}
                </td>
                <td>
                  {product.unitPrice.Grand ? (
                    <Button
                      onClick={() => {
                        this.props.addToCart(
                          product,
                          "Grand",
                          this.state.orderNote
                        );
                        this.props.setOrderNumber();
                      }}
                    >
                      {""}
                      {product.unitPrice.Grand}
                    </Button>
                  ) : (
                    <></>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
