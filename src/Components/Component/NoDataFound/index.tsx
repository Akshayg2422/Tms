import React from 'react'
type NotDataFoundProps = {
    text?: string
}

function NoDataFound({ text = 'No Data Found' }: NotDataFoundProps) {
    return (
        <div className="text-muted text-center" >{text}</div>
    );
}

export { NoDataFound }