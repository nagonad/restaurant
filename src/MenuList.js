import React, { Component } from "react";
import { Table, Button } from "reactstrap";

export default class MenuList extends Component {
  render() {
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>Product Id</th>
              <th>Product Name</th>
              <th>Product Description</th>
              <th>Unit Price</th>
              <th>Product Size</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.productId}</th>
                <td>{product.productName}</td>
                <td>{product.productDescription}</td>
                <td>{product.unitPrice}</td>
                <td>{product.productSize}</td>
                <td>
                  <Button color="primary">Add</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
