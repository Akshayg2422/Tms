import React from "react";
import { AutoCompleteDropDownProps } from "./interfaces"
import Autocomplete from "react-autocomplete";
import { FormGroup } from "reactstrap";
import { Input, InputHeading,Image} from "@Components";
import {
  
    getPhoto,
    matchStateToTerm,
  } from "@Utils";

function AutoCompleteDropDownImage({
  value,
  item,
  onSelect,
  shouldItemRender,
  onChange,
  getItemValue,
  heading,
}:  AutoCompleteDropDownProps) {
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
            {item?.profile_image&&<Image  variant={'avatar'}
                    src={getPhoto(item?.profile_image)}/>}
          </div>
        )}
      />
    </div>
  );
}

export { AutoCompleteDropDownImage };
