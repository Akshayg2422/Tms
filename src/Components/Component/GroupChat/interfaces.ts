import { Color } from '@Components';

export interface GroupChatProps {
    children?: React.ReactNode;
    title?: string,
    time?: string,
    date?: any,
    profileImage?: any,
    color?: Color,
    rtl?: boolean,
    subTitle?: string;
    isEdit?: boolean;
    isDelete?: boolean;
    editOnClick?: () => void;
    deleteOnClick?: () => void;
}