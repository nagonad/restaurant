import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  FormGroup,
  Input,
  Col,
  Label,
  Button,
  Table,
} from "reactstrap";
import { RxPencil1, RxCrossCircled } from "react-icons/rx";

export default function VariantGroupControl(props) {
  const [variantgroupname, setVariantGroupName] = useState();

  const [variantGroups, setVariantGroups] = useState();

  const [editedVariantGroupName, setEditedVariantGroupName] = useState();

  const [editVariantGroupIsOpen, setEditVariantGroupIsOpen] = useState(false);

  const [selectedVariantGroup, setSelectedVariantGroup] = useState();

  const handleChange = (e) => {
    if (e.target.name === "variantgroupname") {
      setVariantGroupName(e.target.value);
    }
    if (e.target.name === "variantgroupnameedit") {
      setEditedVariantGroupName(e.target.value);
    }
  };

  const getVG = () => {
    props
      .getVariantGroup()
      .then((res) => res.json())
      .then((data) => setVariantGroups(data));
  };

  const saveVG = () => {
    let obj = {};

    if (variantgroupname) {
      obj = { variantgroupname: variantgroupname };

      const cevap = props.saveVariantGroup(obj);

      cevap.then((resp) => {
        getVG();
      });
    } else {
      alert("variant group ismi giriniz");
    }
  };

  const deleteVG = (variantGroup) => {
    const cevap = props.deleteVariantGroup(variantGroup);

    cevap.then((res) => getVG());
  };

  const updateVG = () => {
    let updatedVariantGroup = { variantgroupname: editedVariantGroupName };

    const cevap = props.updateVariantGroup(
      selectedVariantGroup,
      updatedVariantGroup
    );

    cevap.then(() => {
      getVG();
    });
  };

  useEffect(() => {
    getVG();
  });

  return (
    <>
      <Container style={{ display: "flex" }}>
        <Container style={{ width: "50%" }}>
          {variantGroups && (
            <Table striped>
              <tbody>
                {variantGroups.map((variantGroup) => (
                  <tr key={variantGroup.variantgroupid}>
                    <td>{variantGroup.variantgroupname}</td>
                    <td>
                      <RxPencil1
                        onClick={() => {
                          setEditedVariantGroupName(
                            variantGroup.variantgroupname
                          );
                          setSelectedVariantGroup(variantGroup);
                          setEditVariantGroupIsOpen(true);
                        }}
                      ></RxPencil1>
                    </td>
                    <td>
                      <RxCrossCircled
                        onClick={() => deleteVG(variantGroup)}
                      ></RxCrossCircled>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Container>

        <Container style={{ width: "50%" }}>
          <Form>
            <FormGroup row>
              <Label sm={4}>Variant Group Name</Label>
              <Col sm={8}>
                <Input
                  type="text"
                  name="variantgroupname"
                  onChange={handleChange}
                ></Input>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col style={{ display: "flex" }}>
                <Button onClick={() => saveVG()}>Add Variant Group</Button>
              </Col>
            </FormGroup>
          </Form>

          {editVariantGroupIsOpen && (
            <>
              <hr />
              <Form>
                <FormGroup row>
                  <Label sm={4}>Variant Group Name</Label>
                  <Col sm={8}>
                    <Input
                      type="text"
                      name="variantgroupnameedit"
                      value={editedVariantGroupName}
                      onChange={handleChange}
                    ></Input>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col style={{ display: "flex" }}>
                    <Button
                      onClick={() => {
                        updateVG();
                        setEditVariantGroupIsOpen(false);
                      }}
                    >
                      Update Variant Group
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </>
          )}
        </Container>
      </Container>
    </>
  );
}
