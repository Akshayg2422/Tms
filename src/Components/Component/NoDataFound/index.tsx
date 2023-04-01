import React from 'react'
type NotDataFoundProps = {
    text?: string
}

function NoDataFound({ text = 'No Data Found' }: NotDataFoundProps) {
    return (
        <div className="text-muted text-center mt-6 " >{text}</div>
    );
}

export { NoDataFound }