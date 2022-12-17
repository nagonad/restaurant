import React, { Component } from "react";
import { Table, Input, Button } from "reactstrap";
import Modal from "react-modal";
import CheckoutModal from "./CheckoutModal";

Modal.setAppElement(document.getElementById("root"));

export default class CreateOrder extends Component {
  state = {
    showModal: false,
    currentOrderItem: {},
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleCurrentOrderItem = (product, size) => {
    let currentOrderItem = this.state.currentOrderItem;
    currentOrderItem.product = product;
    currentOrderItem.size = size;

    this.setState({ currentOrderItem: currentOrderItem });
  };

  render() {
    return (
      <div>
        <Table striped size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>

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
                  {product.unitPrice.Klein ? (
                    <Button
                      onClick={() => {
                        this.handleCurrentOrderItem(product, "Klein");
                        this.props.setOrderNumber();
                        this.toggleModal();
                      }}
                    >
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
                        this.handleCurrentOrderItem(product, "Mittel");
                        this.props.setOrderNumber();
                        this.toggleModal();
                      }}
                    >
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
                        this.handleCurrentOrderItem(product, "Groß");
                        this.props.setOrderNumber();
                        this.toggleModal();
                      }}
                    >
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
                        this.handleCurrentOrderItem(product, "Grand");
                        this.props.setOrderNumber();
                        this.toggleModal();
                      }}
                    >
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
        <CheckoutModal
          isOpen={this.state.showModal}
          toggle={this.toggleModal}
          addToCart={this.props.addToCart}
          currentOrderItem={this.state.currentOrderItem}
        ></CheckoutModal>
      </div>
    );
  }
}
