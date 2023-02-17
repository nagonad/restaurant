import React, { useEffect, useState } from "react";
import {
  FormGroup,
  Label,
  Input,
  Container,
  Col,
  Form,
  Button,
} from "reactstrap";

export default function AddVariant(props) {
  const [selectedSize, setSelectedSize] = useState();

  const handleChange = (variant) => {
    props.saveSizeVariant(variant.id, props.selectedSize);
  };

  useEffect(() => {
    let url = "http://localhost:5000/productSizeVariant/";

    url += props.selectedSize.id;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setSelectedSize(data));
  }, [props.selectedSize]);

  return (
    <>
      <h3>
        {props.selectedProduct.productname} - {props.selectedSize.sizename}{" "}
        <Button
          onClick={() => {
            props.changeAddSizeIsOpen(0);
          }}
        >
          Close
        </Button>
      </h3>

      <Container style={{ display: "flex" }}>
        <Form style={{ width: "50%" }}>
          {selectedSize
            ? selectedSize.map((variant) => (
                <FormGroup>
                  <Label sm={4} check>
                    <Input checked={variant.variantselected}></Input>
                    {variant.variantname}
                  </Label>
                </FormGroup>
              ))
            : null}
        </Form>
        <FormGroup style={{ width: "50%" }}>
          {props.variants.map((variant) => (
            <div onClick={() => handleChange(variant)}>
              {variant.variantname} - {variant.price}€
            </div>
          ))}
        </FormGroup>
      </Container>
    </>
  );
}
