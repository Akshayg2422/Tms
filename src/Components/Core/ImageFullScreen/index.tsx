import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { ImageFullScreenProps } from './interfaces'

const ImageFullScreen = ({ children, onChange }: ImageFullScreenProps) => {
  const handle = useFullScreenHandle();

  const handleFullScreenChange = (state: boolean) => {
    onChange(state, handle)
  };


  return (
    <div onClick={() => handle.enter()}>
      <FullScreen handle={handle} onChange={handleFullScreenChange} >
        <div style={{height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
          {children}
        </div>
      </FullScreen>
    </div>
  );
};

export { ImageFullScreen };
