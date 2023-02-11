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
  state = { addSizeIsOpen: false };

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

  sizeOnChangeControl = (e) => {
    console.log(e.target.checked);
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
              {this.props.sizes.map((size) => (
                <FormGroup>
                  <Label check>
                    <Input
                      type="checkbox"
                      onChange={this.sizeOnChangeControl}
                    />
                    {size.size}
                  </Label>
                </FormGroup>
              ))}
            </Form>
            <Button>Save Size</Button>
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
