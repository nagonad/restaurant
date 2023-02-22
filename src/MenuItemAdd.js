import React, { useState } from "react";

import {
  Form,
  Input,
  FormGroup,
  Label,
  Button,
  Col,
  Container,
} from "reactstrap";

export default function MenuItemAdd(props) {
  const [categoryid, setCategoryId] = useState();
  const [productid, setProductId] = useState();
  const [productname, setProductName] = useState();
  const [unitprice, setUnitPrice] = useState();

  const handleChange = (e) => {
    if (e.target.name === "categoryid") {
      setCategoryId(e.target.value);
    }
    if (e.target.name === "productid") {
      setProductId(e.target.value);
    }
    if (e.target.name === "productname") {
      setProductName(e.target.value);
    }
    if (e.target.name === "unitprice") {
      setUnitPrice(e.target.value);
    }
  };

  const afterClickSaveButtonFunction = () => {
    let bodyJson = {};

    if (categoryid) {
      bodyJson.categoryid = parseInt(categoryid);
    } else {
      bodyJson.categoryid = 1;
    }

    bodyJson.productid = parseInt(productid);

    bodyJson.productname = productname;

    if (unitprice) {
      bodyJson.unitprice = parseFloat(unitprice).toFixed(2);
    }

    props.saveProduct(bodyJson);
  };

  return (
    <>
      <Container className="mb-3 shadow shadow-intensity-lg border rounded">
        <Form className=" mt-3 mb-2">
          <FormGroup row>
            <Label sm={2} for="">
              Category
            </Label>
            <Col sm={4}>
              <Input
                type="select"
                name="categoryid"
                id=""
                onChange={handleChange}
              >
                {props.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.categoryname}
                  </option>
                ))}
              </Input>
            </Col>

            <Label sm={2} for="">
              Product Id
            </Label>
            <Col sm={4}>
              <Input
                type="number"
                name="productid"
                id=""
                placeholder=" "
                onChange={handleChange}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm={2} for="">
              Product Name
            </Label>
            <Col sm={4}>
              <Input
                type="text"
                name="productname"
                id=""
                onChange={handleChange}
              ></Input>
            </Col>

            <Label sm={2}> Product Price</Label>

            <Col sm={4}>
              <Input
                type="number"
                name="unitprice"
                onChange={handleChange}
              ></Input>
            </Col>
          </FormGroup>

          <FormGroup style={{ display: "flex" }}>
            <Button
              onClick={afterClickSaveButtonFunction}
              style={{ marginLeft: "auto" }}
            >
              Save Item
            </Button>
          </FormGroup>
        </Form>
      </Container>
    </>
  );
}