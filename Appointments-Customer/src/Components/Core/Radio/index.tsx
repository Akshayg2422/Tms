import React, { useState } from 'react';
import { RadioProps, RadioItem } from './interfaces';
import { Form, Row, Col } from 'reactstrap';

function Radio({ data, selected, onRadioChange, ...rest }: RadioProps) {

    const [selectItem, setSelectedItem] = useState(selected)

    function onChangeHandler(selected: RadioItem) {
        if (onRadioChange) {
            setSelectedItem(selected)
            onRadioChange(selected)
        }
    }

    return (

        <Form>
            {
                data?.map((item: RadioItem) => {
                    const { id, text } = item
                    let isSelected: boolean = false;
                    if (selectItem)
                        isSelected = item.id === selectItem.id


                    return (

                        <div key={id} className={'custom-control custom-radio  mb-2'}>
                            <input
                                className={'custom-control-input'}
                                id={id}
                                name={id}
                                type={'radio'}
                                onChange={() => onChangeHandler(item)}
                                checked={isSelected}
                                {...rest}
                            />
                            <label
                                className={'custom-control-label'}
                                htmlFor={id}>
                                {
                                    text
                                }
                            </label>
                        </div>
                    )
                })
            }
        </Form >

    )
}



export { Radio }