import { RsInputProps } from '@Components'
export type RadioItem = {
    id: string;
    text: string;
}
export interface RadioProps extends RsInputProps {
    data: Array<RadioItem>;
    selected?: RadioItem;
    onRadioChange?: (item: RadioItem) => void;

}