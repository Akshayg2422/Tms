import { Input } from '@Components'
import{ColorPickerProps}from'./interfaces'

function ColorPicker({value='#fcfafa',onChange,heading}:ColorPickerProps) {

  return (
    <div >
        <Input
        type={'color'}
        value={value}
        onChange={onChange}
        heading={heading}
        
        />
    </div>
  )
}

export {ColorPicker}