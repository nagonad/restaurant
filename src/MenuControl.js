import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Col, Row } from "reactstrap";
import { RxPencil1, RxCrossCircled } from "react-icons/rx";
export default class Menu extends Component {
  handleChange = (event) => {
    if (event.target.name === "categoryId") {
      this.setState({ [event.target.name]: event.target.value[0] });
    } else if (event.target.name === "productSize") {
      if (event.target.value === "4-40*60") {
        this.setState({ [event.target.name]: "Party" });
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

  renderMenuControl = () => {
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
              <option>3-Groß</option>
              <option>4-40*60</option>
            </Input>
          </Col>
        </FormGroup>

        <Button onClick={this.saveProduct}>Submit</Button>
      </Form>
    );
  };

  render() {
    return (
      <>
        {this.props.products.map((product) => (
          <>
            <Row>
              <Col>{product.productid}</Col>
              <Col>{product.productname}</Col>
              <Col>{product.productsize}</Col>
              <Col>{product.unitprice}</Col>
              <Col>
                <RxPencil1
                  onClick={() => this.props.changeMenuControlIsOpen(product)}
                ></RxPencil1>
              </Col>
              <Col>
                <RxCrossCircled
                  onClick={() => {
                    if (
                      window.confirm(
                        product.productid +
                          " - " +
                          product.productname +
                          "(" +
                          product.productsize +
                          ") " +
                          product.unitprice +
                          "€" +
                          " - Ürünü silmek istediginize emin misiniz?"
                      )
                    ) {
                      this.props.deleteProduct(product);
                    }
                  }}
                ></RxCrossCircled>
              </Col>
            </Row>
            {product.isOpen && (
              <Form>
                <FormGroup row>
                  <Label for="" sm={2}>
                    Product Name
                  </Label>
                  <Col sm={4}>
                    <Input
                      type=""
                      name="productname"
                      id=""
                      placeholder={product.productname}
                      onChange={this.props.handleChangeNew}
                    />
                  </Col>
                  <Label for="" sm={2}>
                    Product Size
                  </Label>
                  <Col sm={4}>
                    <Input
                      type="select"
                      name="productsize"
                      id=""
                      placeholder={product.productsize}
                      onChange={this.props.handleChangeNew}
                    >
                      {this.props.productSizes.map((size) => (
                        <option>{size}</option>
                      ))}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="" sm={2}>
                    Product Price
                  </Label>
                  <Col sm={4}>
                    <Input
                      type="number"
                      name="unitprice"
                      id=""
                      placeholder={product.unitprice}
                      onChange={this.props.handleChangeNew}
                    ></Input>
                  </Col>
                  <Label for="" sm={2}>
                    Product Category
                  </Label>
                  <Col sm={4}>
                    <Input
                      type="select"
                      name="categoryid"
                      id=""
                      placeholder=" Product Category"
                      onChange={this.props.handleChangeNew}
                    >
                      {this.props.categories.map((category) => (
                        <option>{category.categoryname}</option>
                      ))}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="" sm={2}>
                    Product Id
                  </Label>
                  <Col sm={4}>
                    <Input
                      type="number"
                      name="productid"
                      id=""
                      placeholder={product.productid}
                      onChange={this.props.handleChangeNew}
                    />
                  </Col>
                  <Label for="" sm={2}>
                    Product Description
                  </Label>
                  <Col sm={4}>
                    <Input
                      type=""
                      name="productdescription"
                      id=""
                      placeholder={product.productdescription}
                      onChange={this.props.handleChangeNew}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={10}></Col>
                  <Col sm={2}>
                    <Button
                      onClick={() =>
                        this.props.updateProduct(
                          this.props.updatedProduct,
                          product
                        )
                      }
                    >
                      Save Changes
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            )}
          </>
        ))}
      </>
    );
  }
}
