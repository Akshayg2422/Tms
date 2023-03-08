import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { ImageFullScreenProps } from './interfaces'

const ImageFullScreen = ({ children, onChange }: ImageFullScreenProps) => {
  const handle = useFullScreenHandle()
  const handleFullScreenChange = (state: boolean) => {
    onChange(state, handle);
  };

  return (
    <FullScreen handle={handle} onChange={handleFullScreenChange} >
      {children}
    </FullScreen>
  );
}

export { ImageFullScreen };
