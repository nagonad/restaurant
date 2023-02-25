import React, { useState, useEffect } from "react";

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

export default function VariantGroupCostumize(props) {
  const [variantGroups, setVariantGroups] = useState();

  const [variantGroupById, setVariantGroupById] = useState();

  const [availibleVariants, setAvailibleVariants] = useState();

  const [selectedVariantGroup, setSelectedVariantGroup] = useState();

  const getVG = (variantGroup) => {
    if (variantGroup) {
      props
        .getVariantGroup(variantGroup)
        .then((res) => res.json())
        .then((data) => {
          setVariantGroupById(data);
        });
    } else {
      props
        .getVariantGroup()
        .then((res) => res.json())
        .then((data) => setVariantGroups(data));
    }
  };

  const deleteVGV = (vgv) => {
    props
      .deleteVariantGroupVariant(vgv)
      .then(() => getVG(selectedVariantGroup));
  };

  const saveVGV = (variant) => {
    props
      .saveVariantGroupVariant(selectedVariantGroup, variant)
      .then(() => getVG(selectedVariantGroup));
  };

  useEffect(() => {
    let searchCriteriaArr = [];

    if (variantGroupById) {
      variantGroupById.forEach((vgv) => {
        searchCriteriaArr.push(vgv.id);
      });

      let remainingVar = [];

      remainingVar = props.variants.filter(
        (c) => !searchCriteriaArr.includes(c.id)
      );

      setAvailibleVariants(remainingVar);
    }
  }, [variantGroupById, props.variants]);

  useEffect(() => {
    getVG();
  }, []);

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
                          setSelectedVariantGroup(variantGroup);
                          getVG(variantGroup);
                        }}
                      ></RxPencil1>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Container>

        <Container style={{ width: "50%" }}>
          {selectedVariantGroup && (
            <>
              <div>{selectedVariantGroup.variantgroupname}</div>
              <hr />
              {variantGroupById
                ? variantGroupById.map((vgv) => (
                    <div key={vgv.vgvid}>
                      {vgv.variantname} - {vgv.price} -{" "}
                      <RxCrossCircled
                        onClick={() => deleteVGV(vgv)}
                      ></RxCrossCircled>
                    </div>
                  ))
                : null}
              <hr />
              {availibleVariants
                ? availibleVariants.map((variant) => (
                    <div onClick={() => saveVGV(variant)} key={variant.id}>
                      {variant.variantname} - {variant.price}
                    </div>
                  ))
                : null}
            </>
          )}
        </Container>
      </Container>
    </>
  );
}
