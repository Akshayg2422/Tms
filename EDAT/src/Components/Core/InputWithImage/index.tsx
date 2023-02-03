import { FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import { Button } from '../Button'
import { InputWithImageProps } from './interface'

function InputWithImage({ placeholder, image, onChange, onClick, ...rest }: InputWithImageProps) {
    return (
        <>
            <div>
                <FormGroup>
                    <InputGroup
                    >
                        <Input
                            placeholder={placeholder}
                            onChange={onChange}
                            {...rest}
                        />
                        <InputGroupAddon addonType="append">
                            <InputGroupText>
                                <i className={`fas fa-${image}`} onClick={onClick}/>
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
            </div>
        </>
    )
}

export { InputWithImage }

