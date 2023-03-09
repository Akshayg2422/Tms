import { FullScreen, FullScreenHandle, useFullScreenHandle } from 'react-full-screen';
import { ImageFullScreenProps } from './interfaces'
import { useState } from 'react';

const ImageFullScreen = ({ children, onChange }: ImageFullScreenProps) => {
  const handle = useFullScreenHandle();

  const handleFullScreenChange = (state: boolean) => {
    onChange(state, handle)
  };

  return (
    <div onClick={() => handle.enter()}>
      <FullScreen handle={handle} onChange={handleFullScreenChange}>
        {children}
      </FullScreen>
    </div>
  );
};

export { ImageFullScreen };
