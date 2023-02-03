export type ProgressTrackCardProps = {
    heading?: string
    headerButton?: string
    onClick?: (item: any) => void
    taskCompletion?: string;
    data?: any
    isImage?: boolean;
    onAddClick?: ()=> void;
    dropDownClick?:(item: any)=>void;
    dndData?: any;
    onSubmitDndClick?: (data: any)=> void;
    isLoading?:any;
    isDropDownMenuArrow?:boolean;
    title?: string;
    completionRatioText?: string;
    taskCompletionRatio?: string;
    isDndModalOpen?: boolean
    dropDownDeleteClick?:(item)=> void;
    ClassName?:string;

}