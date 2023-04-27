import React, { useRef, useLayoutEffect, useState, useEffect } from 'react'
import { ComponentLoaderProps } from './interfaces'
import { Spinner } from '@Components'


const ComponentLoader = ({ children, loading }: ComponentLoaderProps): JSX.Element => {

    const ref = useRef<HTMLDivElement>(null);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [isFirst, setFirst] = useState(false);

    useLayoutEffect(() => {
        setFirst(true)
        if (ref?.current) {
            setWidth(ref.current.offsetWidth);
            setHeight(ref.current.offsetHeight);
        }
    }, []);

    return (
        <div>
            {
                loading && <div className='d-flex align-items-center justify-content-center position-absolute' style={{ ...(height && { height: height }), ...(width && { width: width }) }} > < Spinner /></div >
            }
            {
                (!loading || !isFirst) && <div ref={ref}>{children}</div>
            }
        </div >
    )
}

export { ComponentLoader }