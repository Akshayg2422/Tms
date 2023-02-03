export interface SidebarProps {
    toggleSideNav?: () => void;
    sideNavOpen?: boolean;
    routes?: any;
    logo?: LogoItem;
    rtlActive?: boolean;
    onSideBarClick?:(item)=> void
}

export interface LogoItem {
    innerLink?: string;
    imgSrc?: string;
    imgAlt?: string;
    outterLink?: string;
    imgHeight?: number | string
    imgWidth?: number | string
    text?: string
}