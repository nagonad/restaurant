import React, { useEffect, useState } from "react";

import { RxCrossCircled } from "react-icons/rx";

import { Button } from "@mui/material";

export default function AddVariantGroup(props) {
  const [variantGroups, setVariantGroups] = useState();

  const [availibleVariantGroups, setAvailibleVariantGroups] = useState();

  const [psvg, setPsvg] = useState();

  const getVG = () => {
    props
      .getVariantGroup()
      .then((res) => res.json())
      .then((data) => {
        setVariantGroups(data);
      });
  };

  const savePSVG = (variantGroup) => {
    props
      .saveProductSizeVariantGroup(props.selectedSize, variantGroup)
      .then(() => {
        getPSVG();
        props
          .getVariantGroupVariant(variantGroup)
          .then((resp) => resp.json())
          .then((data) => {
            let arr = [];

            if (data) {
              data.forEach((datum) => {
                let obj = {
                  variantgroupid: variantGroup.variantgroupid,
                  productsizeid: props.selectedSize.id,
                  variantid: datum.variantid,
                };
                arr.push(obj);
              });

              props.saveSizeVariantNewTry(arr);
            }
          });
      });
  };

  const getPSVG = () => {
    props
      .getProductSizeVariantGroup(props.selectedSize)
      .then((resp) => resp.json())
      .then((data) => {
        setPsvg(data);
      });
  };

  const deletePsvg = (psvgelement) => {
    props.deleteProductSizeVariantGroup(psvgelement).then(() => {
      getPSVG();
      props.deleteSizeVariantNewTry(psvgelement);
    });
  };

  useEffect(() => {
    if (psvg && variantGroups) {
      let searchCriteriaArr = [];
      psvg.forEach((vg) => {
        searchCriteriaArr.push(vg.variantgroupid);
      });
      let remainingVar = [];

      remainingVar = variantGroups.filter(
        (c) => !searchCriteriaArr.includes(c.variantgroupid)
      );

      setAvailibleVariantGroups(remainingVar);
    }
  }, [variantGroups, psvg]);

  useEffect(() => {
    getVG();
    getPSVG();
  }, []);
  return (
    <>
      {variantGroups ? (
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
          <hr />

          {psvg ? (
            <>
              {psvg.map((psvgelement) => (
                <div key={psvgelement.productsizevariantgroupid}>
                  {psvgelement.variantgroupname} -{" "}
                  <RxCrossCircled
                    onClick={() => deletePsvg(psvgelement)}
                  ></RxCrossCircled>
                </div>
              ))}
              <hr />
            </>
          ) : null}

          {availibleVariantGroups
            ? availibleVariantGroups.map((variantGroup) => (
                <div
                  key={variantGroup.variantgroupid}
                  onClick={() => {
                    savePSVG(variantGroup);
                  }}
                >
                  {variantGroup.variantgroupname}
                </div>
              ))
            : null}
        </>
      ) : null}
    </>
  );
}
