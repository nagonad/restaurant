import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";

export default class Menu extends Component {
  state = {
    productId: "",
    categoryId: "1",
    productName: "",
    unitPrice: "1",
    productSize: "Klein",
    productDescription: "",
  };

  handleChange = (event) => {
    if (event.target.name === "categoryId") {
      this.setState({ [event.target.name]: event.target.value[0] });
    } else if (event.target.name === "productSize") {
      if (event.target.value === "4-40*60") {
        this.setState({ [event.target.name]: "Grand" });
      } else {
        this.setState({
          [event.target.name]: event.target.value.substring(2),
        });
      }
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  saveProduct = () => {
    const newProduct = this.state;
    fetch("http://localhost:3000/products", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  render() {
    return (
      <Form>
        <FormGroup row>
          <Label sm={2}>Product Id</Label>
          <Col sm={10}>
            <Input name="productId" onChange={this.handleChange} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="categoryId" sm={2}>
            Category Id
          </Label>
          <Col sm={10}>
            <Input
              type="select"
              name="categoryId"
              id="CategoryIdSelect"
              onChange={this.handleChange}
            >
              <option>1-</option>
              <option>2-</option>
              <option>3-</option>
              <option>4-</option>
              <option>5-</option>
              <option>6-</option>
              <option>7-</option>
              <option>8-</option>
              <option>9-</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="productName" sm={2}>
            Product Name
          </Label>
          <Col sm={10}>
            <Input name="productName" onChange={this.handleChange} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="unitPrice" sm={2}>
            Unit Price
          </Label>
          <Col sm={10}>
            <Input name="unitPrice" onChange={this.handleChange} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="productDescription" sm={2}>
            Product Description
          </Label>
          <Col sm={10}>
            <Input
              type="textarea"
              name="productDescription"
              id="exampleText"
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="productSize" sm={2}>
            Product Size
          </Label>
          <Col sm={10}>
            <Input
              type="select"
              name="productSize"
              id="productSizeSelect"
              onChange={this.handleChange}
            >
              <option>1-Klein</option>
              <option>2-Mittel</option>
              <option>3-Gro??</option>
              <option>4-40*60</option>
            </Input>
          </Col>
        </FormGroup>

        <Button onClick={this.saveProduct}>Submit</Button>
      </Form>
    );
  }
}
