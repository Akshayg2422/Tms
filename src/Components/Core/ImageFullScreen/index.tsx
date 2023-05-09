import { ImageGroup, Image } from 'react-fullscreen-image';
import { ImageFullScreenProps } from './interfaces'

const ImageFullScreen = ({ images, style = {} }: ImageFullScreenProps) => {
    return (
        <ImageGroup>
            <div className="images"
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'
                }}>
                {images.map((imageUrl, index) => (
                    <div key={index}
                        style={{
                            flex: '0 0 25%',
                            padding: '10px',
                            height: '10%',
                            position: 'relative'
                        }}>
                        <Image
                            src={imageUrl}
                            alt="attachments"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: `translate(-50%, -50%)`,
                                maxHeight: '100%',
                                maxWidth: '100%',
                                objectFit: 'cover',
                                ...style
                            }}
                        />
                    </div>
                ))}
            </div>
        </ImageGroup>
    );
};

export { ImageFullScreen };
