import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Container,
} from "reactstrap";
import { RxPencil1, RxCrossCircled, RxPlusCircled } from "react-icons/rx";
import { Link } from "react-router-dom";

export default class Menu extends Component {
  state = {
    addSizeIsOpen: false,
    selectedProduct: {},
    selectedProductSizes: [],
  };

  getSelectedProduct = (product) => {
    let url = "http://localhost:5000/product_sizes/";

    if (product) {
      url += product.id;
    } else {
      url += this.state.selectedProduct.id;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ selectedProductSizes: data });
      });
  };

  changeProductSizeChecked = (product) => {
    let arr = this.state.selectedProductSizes;

    let arrElement = arr.find((c) => c.id === product.id);

    if (arrElement.selected) {
      arrElement.selected = false;
    } else {
      arrElement.selected = true;
    }

    this.setState({ selectedProductSizes: arr });
  };

  render() {
    return (
      <>
        {this.state.addSizeIsOpen && (
          <Container
            style={{
              position: "fixed",
              height: "100%",
              width: "50%",
              zIndex: "10",
              background: "white",
              top: "40",
              right: "0",
              border: "2px solid",
            }}
          >
            <Form>
              {this.state.selectedProductSizes.map((size) => (
                <FormGroup>
                  <Label check>
                    <Input
                      defaultChecked={size.selected}
                      type="checkbox"
                      onChange={(e) => {
                        this.props.updateProductSize(e, size);
                        this.changeProductSizeChecked(size);
                        this.getSelectedProduct();
                      }}
                    />
                    {size.sizename}
                  </Label>
                </FormGroup>
              ))}
            </Form>
            <Button
              onClick={() => {
                this.setState({ addSizeIsOpen: false });
              }}
            >
              Cancel
            </Button>
          </Container>
        )}
        <Row>
          <Col sm={10}></Col>
          <Col sm={2}>
            <Link to={"/menuControl/itemAdd"}>
              <RxPlusCircled style={{ fontSize: "25px" }}></RxPlusCircled>
            </Link>
          </Col>
        </Row>

        {this.props.products.map((product) => (
          <React.Fragment key={product.id}>
            <Row>
              <Col>{product.productid}</Col>
              <Col>{product.productname}</Col>
              <Col>{product.unitprice ? product.unitprice : null}</Col>
              <Col>
                <RxPencil1
                  onClick={() => {
                    this.setState({ selectedProduct: product });
                    this.getSelectedProduct(product);
                    this.props.changeMenuControlIsOpen(product);
                  }}
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
                          "\nÜrünü silmek istediginize emin misiniz?"
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
                </FormGroup>
                <FormGroup row>
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
                        <option key={category.id}>
                          {category.categoryname}
                        </option>
                      ))}
                    </Input>
                  </Col>
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
                </FormGroup>
                <hr></hr>

                {this.state.selectedProductSizes.map((size) =>
                  size.selected ? (
                    <FormGroup row>
                      <Col sm={2}>{size.sizename}</Col>
                      <Col sm={2}>
                        <Input
                          type="number"
                          placeholder={size.unitprice}
                          onChange={(e) => {
                            this.props.updateProductSizeUnitPrice(e, size);
                          }}
                        ></Input>
                      </Col>
                      <Col sm={2}>
                        <Button>Add Variant</Button>
                      </Col>
                    </FormGroup>
                  ) : null
                )}

                <FormGroup row>
                  <Col sm={10}></Col>
                  <Col sm={2}>
                    <Button
                      onClick={() => {
                        this.setState({ addSizeIsOpen: true });
                      }}
                    >
                      Add Size
                    </Button>
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
          </React.Fragment>
        ))}
      </>
    );
  }
}
