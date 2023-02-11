import React, { useState } from "react";
import {
  Container,
  Button,
  Modal,
  Row,
  Label,
  Col,
  Input,
  Form,
  FormGroup,
} from "reactstrap";
import { RxPencil1, RxCrossCircled, RxPlusCircled } from "react-icons/rx";

export default function SizeControl(props) {
  const [size, setSize] = useState();

  const handleChange = (e) => {
    if (e.target.name === "size") {
      setSize(e.target.value);
    }
  };

  return (
    <>
      <Container style={{ display: "flex" }}>
        <Container style={{ width: "50%" }}>
          <Container>
            {props.sizes.map((siz) => (
              <React.Fragment key={siz.id}>
                <Row>
                  <Col sm={6}>{siz.size}</Col>
                  <Col sm={3}>
                    <RxPencil1></RxPencil1>
                  </Col>
                  <Col sm={3}>
                    <RxCrossCircled
                      onClick={() => props.deleteSize(siz)}
                    ></RxCrossCircled>
                  </Col>
                </Row>
              </React.Fragment>
            ))}
          </Container>
        </Container>
        <Form style={{ width: "50%" }}>
          <FormGroup row>
            <Label sm={4}>Size Name</Label>
            <Col sm={8}>
              <Input onChange={handleChange} type="text" name="size"></Input>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col style={{ display: "flex" }}>
              <Button
                onClick={() => props.saveSize(size)}
                style={{ marginLeft: "auto" }}
              >
                Add Size
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Container>
    </>
  );
}
