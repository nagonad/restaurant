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
            {props.variants.map((variant) => (
              <FormGroup key={variant.id} row>
                <Label sm={4}>{variant.variantname}</Label>
                <Col>
                  <Input sm={4} defaultValue={variant.price} readOnly></Input>
                </Col>
                <Col sm={4}>
                  <RxPencil1></RxPencil1> <RxCrossCircled></RxCrossCircled>
                </Col>
              </FormGroup>
            ))}
          </Form>
        </Container>
        <Form style={{ width: "50%" }}>
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
              <Input onChange={handleChange} type="number" name="price"></Input>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col style={{ display: "flex" }}>
              <Button onClick={() => saveVariant()}>Add Variant</Button>
            </Col>
          </FormGroup>
        </Form>
      </Container>
    </>
  );
}
