import React from 'react';
import { Spinner } from '@Components';
import { ComponentLoaderProps } from './interfaces';

const ComponentLoader = ({ children, loading }: ComponentLoaderProps): JSX.Element => {
  return (
    <div>
      {loading && (
        <div className='d-flex align-items-center justify-content-center position-absolute' style={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Spinner />
        </div>
      )}
      {!loading && <div>{children}</div>}
    </div>
  );
};

export { ComponentLoader };




// import React, { useRef, useLayoutEffect, useState, useEffect } from 'react'
// import { ComponentLoaderProps } from './interfaces'
// import { Spinner } from '@Components'


// const ComponentLoader = ({ children, loading }: ComponentLoaderProps): JSX.Element => {

//     // const ref = useRef<HTMLDivElement>(null);

//     // const [width, setWidth] = useState(0);
//     // const [height, setHeight] = useState(0);
//     // const [isFirst, setFirst] = useState(false);

//     //     setFirst(true)
//     //     if (ref?.current) {
//     //         setWidth(ref.current.offsetWidth);
//     //         setHeight(ref.current.offsetHeight);
//     //     }
//     // }, []);

//     return (
//         <div>
//              {
//                 loading && <div className='d-flex align-items-center justify-content-center position-absolute' style={{ ...(height && { height: height }), ...(width && { width: width }) }} > < Spinner /></div >
//             } 
//             {
//                 <div >{children}</div>
//             }
//         </div >
//     )
// }

// export { ComponentLoader }