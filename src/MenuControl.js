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
import AddSize from "./AddSize";
import AddVariant from "./AddVariant";

export default class Menu extends Component {
  state = {
    addSizeIsOpen: 0,
    selectedProduct: {},
    selectedProductSizes: [],
    selectedSize: {},
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
  changeAddSizeIsOpen = (value) => {
    this.setState({ addSizeIsOpen: value });
  };

  changeProductSizeChecked = (product) => {
    let arr = this.state.selectedProductSizes;

    let arrElement = arr.find((c) => c.id === product.id);

    if (arrElement.selected) {
      arrElement.selected = false;
      arrElement.unitprice = null;
    } else {
      arrElement.selected = true;
    }

    this.setState({ selectedProductSizes: arr });
  };

  renderPopScreen = () => {
    switch (this.state.addSizeIsOpen) {
      case 1:
        return (
          <AddSize
            selectedProductSizes={this.state.selectedProductSizes}
            updateProductSize={this.props.updateProductSize}
            changeProductSizeChecked={this.changeProductSizeChecked}
            addSizeIsOpen={this.state.addSizeIsOpen}
            changeAddSizeIsOpen={this.changeAddSizeIsOpen}
          ></AddSize>
        );

      case 2:
        return (
          <AddVariant
            selectedProduct={this.state.selectedProduct}
            selectedSize={this.state.selectedSize}
            variants={this.props.variants}
            saveSizeVariant={this.props.saveSizeVariant}
            getSizeVariantById={this.props.getSizeVariantById}
            changeAddSizeIsOpen={this.changeAddSizeIsOpen}
            deleteSizeVariant={this.props.deleteSizeVariant}
          ></AddVariant>
        );

      default:
        return null;
    }
  };

  renderMenuControl = () => {
    return (
      <>
        {this.state.addSizeIsOpen !== 0 && (
          <Container
            style={{
              position: "fixed",
              height: "100%",
              width: "50%",
              zIndex: "10",
              background: "white",
              top: "0",
              right: "0",
              border: "2px solid",
              overflowY: "scroll",
            }}
          >
            {this.renderPopScreen()}
            {/* <AddSize
              selectedProductSizes={this.state.selectedProductSizes}
              updateProductSize={this.props.updateProductSize}
              changeProductSizeChecked={this.changeProductSizeChecked}
              addSizeIsOpen={this.state.addSizeIsOpen}
              changeAddSizeIsOpen={this.changeAddSizeIsOpen}
            ></AddSize> */}
            {/* <Form>
              {this.state.selectedProductSizes.map((size) => (
                <FormGroup key={size.id}>
                  <Label check>
                    <Input
                      checked={size.selected}
                      type="checkbox"
                      onChange={(e) => {
                        this.props.updateProductSize(e, size);
                        this.changeProductSizeChecked(size);
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
            </Button> */}
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
                      onClick={this.props.handleChangeNew}
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
                    <FormGroup key={size.id} row>
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
                        <Button
                          onClick={() => {
                            this.setState({ selectedSize: size });
                            this.setState({ addSizeIsOpen: 2 });
                          }}
                        >
                          Add Variant
                        </Button>
                      </Col>
                    </FormGroup>
                  ) : null
                )}

                <FormGroup row>
                  <Col sm={10}></Col>
                  <Col sm={2}>
                    <Button
                      onClick={() => {
                        this.setState({ addSizeIsOpen: 1 });
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
  };

  renderVariantControl = () => {
    return <></>;
  };

  render() {
    return this.renderMenuControl();
  }
}
