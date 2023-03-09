import React from "react";
import { AutoCompleteProps } from "./interfaces";
import Autocomplete from "react-autocomplete";
import { FormGroup } from "reactstrap";
import { Input, InputHeading } from "@Components";
import {
  
    matchStateToTerm,
  } from "@Utils";

function AutoCompleteDropDown({
  value,
  item,
  onSelect,
  shouldItemRender,
  onChange,
  getItemValue,
  heading,
}: AutoCompleteProps) {
  return (
    <div>
      <Autocomplete
        renderInput={(props) => (
          <FormGroup>
            <InputHeading heading={heading} />
            <input
              className={"designation-input form-control col"}
              {...props}
            />
          </FormGroup>
        )}
        value={value}
        wrapperStyle={{ position: "relative", display: "inline-block" }}
        items={item}
        getItemValue={(item) => item?.name}
        shouldItemRender={matchStateToTerm}
        onChange={onChange}
        onSelect={onSelect}
        renderMenu={(children) => (
          <div className="menu designation-scroll-bar">{children}</div>
        )}
        renderItem={(item, isHighlighted) => (
          <div
            style={{
              background: isHighlighted ? "lightgray" : "white",
            }}
            key={item?.id}
          >
            {item?.name}
          </div>
        )}
      />
    </div>
  );
}

export { AutoCompleteDropDown };
