import React from "react";
import { AutoCompleteProps } from "./interfaces";
import Autocomplete from "react-autocomplete";
import { FormGroup, Input } from "reactstrap";
import { InputHeading } from "@Components";
import { matchStateToTerm } from "@Utils";
import { placeholder } from "i18n-js";

function AutoCompleteDropDownSearch({
  value,
  item,
  onSelect,
  shouldItemRender,
  onChange,
  getItemValue,
  heading,
  placeholder,
  ...props
}: AutoCompleteProps) {
  return (
    <div>
      <Autocomplete
        menuStyle={{
          minWidth: '429.988px',
          borderRadius: '3px',
          boxShadow: ' rgba(0, 0, 0, 0.1) 0px 2px 12px',
          padding: "0px 0px",
          fontSize: "90%",
          position: 'absolute',
          overflow: 'auto',
          maxHeight: '40vh',
          top: 75,
          left: 15,
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          marginLeft:'9px',
          zIndex:'100'
        }}
        wrapperStyle={{

        }}

        value={value}
        items={item || []}
        renderInput={(props) => (
          <div>
            <InputHeading heading={heading} />
            <div>
              <input
                className="auto-conplete-dropdown pointer"
                {...props}
                placeholder={placeholder}
              />
            </div>
          </div>
        )}
        getItemValue={(item) => item?.name}
        shouldItemRender={matchStateToTerm}
        onChange={onChange}
        onSelect={onSelect}
        renderItem={(item, isHighlighted) => (
          <div
            style={{

              background: isHighlighted ? "white" : "white",
            }}
            className="p-3 overflow-hide pointer"
            key={item && item?.id}
          >
            {item && item?.name}
          </div>
        )
        }
      />
    </div >
  );
}

export { AutoCompleteDropDownSearch };
