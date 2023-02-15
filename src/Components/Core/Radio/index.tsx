import React, { useState } from "react";
import { RadioProps, RadioItem } from "./interfaces";
import { Form, Row, Col } from "reactstrap";

function Radio({
  data,
  selected,
  onRadioChange,
  variant = 'row',
  ...rest
}: RadioProps) {
  const [selectItem, setSelectedItem] = useState(selected);
console.log('hhhhhhhhhh---->',selectItem)
  function onChangeHandler(selected: RadioItem) {
    if (onRadioChange) {
      setSelectedItem(selected);
      onRadioChange(selected);
    }
  }

  function renderContent() {
    return (
      <>
        {data?.map((item: RadioItem, index: number) => {
          const { id, text } = item;
          let isSelected: boolean = false;
          if (selectItem) isSelected = item.id === selectItem.id;

          return (
            <div key={id} className={`custom-control custom-radio  mb-2 ${variant === 'row' && index !==0  && 'ml-4'}`}>
              <input
                className={"custom-control-input"}
                id={id}
                name={id}
                type={"radio"}
                onChange={() => onChangeHandler(item)}
                checked={isSelected}
                {...rest}
              />
              <label className={"custom-control-label"} htmlFor={id}>
                {text}
              </label>
            </div>
          );
        })}
      </>
    );
  }
  return (
    <Form>
      {variant === 'row' && <Row className={'ml-1'}>{renderContent()}</Row>}
      {variant === 'column' && renderContent()}
    </Form>
  );
}

export { Radio };
export type { RadioItem };

