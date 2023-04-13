
import { AutoCompleteDropDownProps } from "./interfaces"
import Autocomplete from "react-autocomplete";
import { FormGroup } from "reactstrap";
import {  InputHeading,Image} from "@Components";
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
  placeholder
}:  AutoCompleteDropDownProps) {
  return (
    <div>
        <FormGroup>
      <Autocomplete

        renderInput={(props) => (
          <FormGroup>
            <InputHeading heading={heading} />
            <input
            placeholder={placeholder}
              className={"designations-input form-control col"}
              {...props}
              
            />
          </FormGroup>
        )}
        value={value}
        wrapperStyle={{ position: "relative", display: "inline-block" }}
        items={item}
        getItemValue={getItemValue}
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
            <div className="row py-2">
            <div  className="pl-4 pr-2">
                {<Image  variant={'rounded'}
                size={'sm'}
                    src={getPhoto(item?.profile_image)}/>}
                    </div>
            <div>
              {item?.name}|{item?.designation}
                </div>
               
          </div>

          </div>
        )}
      />
      </FormGroup>
    </div>
  );
}

export { AutoCompleteDropDownImage };
