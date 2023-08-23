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
