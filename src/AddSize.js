import React from "react";
import { Form, Label, Input, FormGroup, Button } from "reactstrap";

export default function AddSize(props) {
  return (
    <>
      <Form>
        {props.selectedProductSizes
          ? props.selectedProductSizes.map((size) => (
              <FormGroup key={size.id}>
                <Label check>
                  <Input
                    checked={size.selected}
                    type="checkbox"
                    onChange={(e) => {
                      props.updateProductSize(e, size);
                      props.changeProductSizeChecked(size);
                    }}
                  />
                  {size.sizename}
                </Label>
              </FormGroup>
            ))
          : null}
      </Form>
      <Button
        onClick={() => {
          props.changeAddSizeIsOpen(0);
        }}
      >
        Cancel
      </Button>
    </>
  );
}
