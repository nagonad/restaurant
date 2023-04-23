import React, { useEffect, useState } from "react";
import { FormGroup, Input, Container, Button, Table } from "reactstrap";
import { RxCrossCircled } from "react-icons/rx";

export default function AddVariant(props) {
  const [selectedSize, setSelectedSize] = useState();

  const [count, setCount] = useState(0);

  const [availibleVariants, setAvailibleVariants] = useState();

  const handleChange = (variant) => {
    props.saveSizeVariant(variant.id, props.selectedSize);
  };

  const clickHandle = () => {
    setCount((prevState) => {
      return prevState + 1;
    });
  };

  useEffect(() => {
    let url = process.env.REACT_APP_BASE_URL + "/productSizeVariant/";

    url += props.selectedSize.id;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSelectedSize(data);

        let searchCriteriaArr = [];

        data.forEach((variant) => {
          searchCriteriaArr.push(variant.variantid);
        });

        let remainingVar = [];

        remainingVar = props.variants.filter(
          (c) => !searchCriteriaArr.includes(c.id)
        );

        setAvailibleVariants(remainingVar);
      });
  }, [props.selectedSize, count, props.variants]);

  return (
    <>
      <h3>
        {props.selectedProduct.productname} - {props.selectedSize.sizename}
        <Button
          onClick={() => {
            props.changeAddSizeIsOpen(0);
          }}
        >
          Close
        </Button>
      </h3>

      {selectedSize ? (
        <Container style={{ display: "flex" }}>
          <Container style={{ width: "50%" }}>
            <Table striped>
              <tbody>
                {selectedSize.map((variant) => (
                  <tr key={variant.sizevariantid}>
                    <td>
                      <Input
                        type="checkbox"
                        checked={variant.variantselected}
                        onChange={() => {
                          console.log("lol");
                        }}
                      ></Input>
                    </td>
                    <td>
                      {variant.variantname} - {variant.price}
                    </td>
                    <td>
                      <RxCrossCircled
                        onClick={() => {
                          props.deleteSizeVariant(variant.sizevariantid);
                          clickHandle();
                        }}
                      ></RxCrossCircled>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
          <Container style={{ width: "50%" }}>
            <FormGroup style={{ width: "50%" }}>
              {availibleVariants.map((variant) => (
                <div
                  key={variant.id}
                  onClick={() => {
                    handleChange(variant);
                    clickHandle();
                  }}
                >
                  {variant.variantname} - {variant.price}€
                </div>
              ))}
            </FormGroup>
          </Container>
        </Container>
      ) : null}
    </>
  );
}
