import React from "react";
import { AutoCompleteProps } from "./interfaces";
import Autocomplete from "react-autocomplete";
import { FormGroup } from "reactstrap";
import { Input, InputHeading } from "@Components";
import {
  
    matchStateToTerm,
  } from "@Utils";
import { useSelector } from "react-redux";

function AutoCompleteDropDown({
  value,
  item,
  onSelect,
  shouldItemRender,
  onChange,
  getItemValue,
  heading,
}: AutoCompleteProps) {
  const {autoCompleteInputSize} = useSelector(
    (state: any) => state.CompanyReducer
  );
  return (
    <div>
      <Autocomplete
        renderInput={(props) => (
          <FormGroup>
            <InputHeading heading={heading} />
            <input
              className={ `${autoCompleteInputSize===true?"designation-input form-control col":'designation-auto-input form-control col'} `}
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
          <div className={ `${autoCompleteInputSize===true?"menu designation-scroll-bar":'menu designation-auto-scroll-bar'} `}>{children}</div>
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
