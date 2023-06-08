export interface GroupChatProps {
    children?: React.ReactNode;
    title?: string;
    time?: string;
    date?: any;
    profileImage?: any;
    subTitle?: string;
    isEdit?: boolean;
    isDelete?: boolean;
    isLoginUser?: boolean;
    editOnClick?: () => void;
    deleteOnClick?: () => void;
    subtitleOnclick?: () => void;
}