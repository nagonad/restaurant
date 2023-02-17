import React, { useState } from "react";

import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { RxPencil1, RxCrossCircled, RxPlusCircled } from "react-icons/rx";

export default function VariantControl(props) {
  const [variant, setVariant] = useState({});

  const [editName, setEditName] = useState();

  const [editPrice, setEditPrice] = useState();

  const [selectedVariantController, setSelectedVariantController] = useState();

  const handleChange = (e) => {
    let obj = variant;

    if (e.target.value) {
      if (e.target.type === "number") {
        obj[e.target.name] = parseFloat(e.target.value).toFixed(2);
      } else {
        obj[e.target.name] = e.target.value;
      }
    } else {
      delete obj[e.target.name];
    }

    setVariant(obj);
  };

  const handleChangeEdit = (e) => {
    if (e.target.name === "variantname") {
      setEditName(e.target.value);
    }
    if (e.target.name === "price") {
      setEditPrice(e.target.value);
    }
  };

  const changeSelectedVariantController = (variant) => {
    setSelectedVariantController(variant);
    setEditName(variant.variantname);
    setEditPrice(variant.price);
  };

  const editVariant = () => {
    let obj = {};

    if (editName !== selectedVariantController.variantname) {
      obj["variantname"] = editName;
    }
    if (editPrice !== selectedVariantController.price) {
      if (editPrice === "") {
        obj["price"] = null;
      } else {
        obj["price"] = parseFloat(editPrice).toFixed(2);
      }
    }
    if (obj.variantname === "") {
      alert("Variant ismi girmeniz gerekiyor");
    } else {
      props.updateVariant(selectedVariantController, obj);
      setSelectedVariantController();
    }
  };

  const saveVariant = () => {
    if (variant.variantname) {
      props.saveVariant(variant);
    } else {
      alert("Variant ismi girmeniz gerekiyor");
    }
  };

  return (
    <>
      <Container style={{ display: "flex" }}>
        <Container style={{ width: "50%" }}>
          <Form>
            {props.variants.length > 0 ? (
              <>
                {props.variants.map((variant) => (
                  <FormGroup key={variant.id} row>
                    <Label sm={4}>{variant.variantname}</Label>
                    <Col>
                      <Input sm={4} value={variant.price} readOnly></Input>
                    </Col>
                    <Col sm={4}>
                      <RxPencil1
                        onClick={() => {
                          changeSelectedVariantController(variant);
                        }}
                      ></RxPencil1>{" "}
                      <RxCrossCircled
                        onClick={() => {
                          props.deleteVariant(variant);
                        }}
                      ></RxCrossCircled>
                    </Col>
                  </FormGroup>
                ))}
              </>
            ) : null}
          </Form>
        </Container>
        <Form style={{ width: "50%" }}>
          <Container>
            <FormGroup row>
              <Label sm={4}>Variant Name</Label>
              <Col sm={8}>
                <Input
                  onChange={handleChange}
                  type="text"
                  name="variantname"
                ></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={4}>Variant Price</Label>
              <Col sm={8}>
                <Input
                  onChange={handleChange}
                  type="number"
                  name="price"
                ></Input>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col style={{ display: "flex" }}>
                <Button onClick={() => saveVariant()}>Add Variant</Button>
              </Col>
            </FormGroup>
          </Container>
          {selectedVariantController && (
            <>
              <hr></hr>
              <Container>
                <FormGroup row>
                  <Label sm={4}>Variant Name</Label>
                  <Col sm={8}>
                    <Input
                      value={editName}
                      onChange={handleChangeEdit}
                      type="text"
                      name="variantname"
                    ></Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={4}>Variant Price</Label>
                  <Col sm={8}>
                    <Input
                      value={editPrice}
                      onChange={handleChangeEdit}
                      type="number"
                      name="price"
                    ></Input>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col style={{ display: "flex" }}>
                    <Button onClick={() => editVariant()}>Edit Variant</Button>
                  </Col>
                </FormGroup>
              </Container>
            </>
          )}
        </Form>
      </Container>
    </>
  );
}
