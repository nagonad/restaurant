import React, { useRef, useState } from "react";
import { Button } from "@mui/material";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "./ComponentToPrint";

export default function PrintComponent(props) {
  let componentRef = useRef();

  return (
    <>
      <div>
        {/* button to trigger printing of target component */}
        <ReactToPrint
          trigger={() => <Button variant="contained">Drücken</Button>}
          content={() => componentRef.current}
          onAfterPrint={() => {
            props.finalizeOrder();
          }}
        />

        {props.finalOrderObj ? (
          <ComponentToPrint
            costumerName={props.costumerName}
            costumerAddress={props.costumerAddress}
            phoneNumberInputValue={props.phoneNumberInputValue}
            ref={componentRef}
            finalOrderObj={props.finalOrderObj}
          />
        ) : null}
      </div>
    </>
  );
}
