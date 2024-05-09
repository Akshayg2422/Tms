export interface AuthContainerProps {
    children?: React.ReactNode;
    title?:any;
    data?:any;
    displayDataSet?:any;
    tableDataSet?:any;
    tableOnClick?: (event: any, index: number, item: any) => void;
    text?:string;
    onClick?:any;
    childrenS?: React.ReactNode;
    selectedIds?:any;
    selectedId?:string;
    selectButton?:boolean;
    taskStatus?:any;
    selectButtonReject?:boolean;
    onClickReject?:any;
    textReject?:any;
    ApprovedStatus?:any
    onClickEnable?:any
    textEnable?:any
    enableButton?:boolean;
    enableDataSet?:any;

  }
  