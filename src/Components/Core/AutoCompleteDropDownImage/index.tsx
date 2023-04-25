
import { AutoCompleteDropDownProps } from "./interfaces"
import Autocomplete from "react-autocomplete";
import { FormGroup } from "reactstrap";
import {  InputHeading,Image} from "@Components";
import {
  
    getPhoto,
    matchStateToTerm,
  } from "@Utils";
import { useSelector } from "react-redux";


function AutoCompleteDropDownImage({
  value,
  item,
  onSelect,
  onChange,
  getItemValue,
  heading,
  placeholder
}:  AutoCompleteDropDownProps) {
  
  const {autoCompleteInputSize} = useSelector(
    (state: any) => state.CompanyReducer
  );
  let a=true
  return (
    <div>
        <FormGroup>
      <Autocomplete

        renderInput={(props) => (
          <FormGroup>
            <InputHeading heading={heading} />
            <input
            placeholder={placeholder}
              className={ `${autoCompleteInputSize===true?"designations-input form-control col":'designations-auto-input form-control col'} `}
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
          <div className={ `${autoCompleteInputSize===true?"menu designation-scroll-bar":'menu designations-auto-scroll-bar'} `}>{children}</div>
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
             <div> {item?.name}</div>
              {item?.designation} / {item?.department}
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
