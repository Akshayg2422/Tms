import { icons } from '@Assets';
import { Image } from '@Components';
import { getPhoto } from '@Utils';
import { useState } from 'react';
import { GroupChatProps } from './interfaces';

function GroupChat({
    children,
    title,
    time,
    date,
    subTitle,
    isEdit,
    isDelete,
    profileImage,
    isLoginUser,
    editOnClick,
    deleteOnClick,
    subtitleOnclick,
    onClick,
}: GroupChatProps) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className="container">
            
            <div className="text-center">
                <small className="text-muted">
                    {date === 'Invalid Date' ? (
                        ''
                    ) : (
                        <div className="row">
                            <div className="col-5">
                                <hr />
                            </div>
                            <div className="col align-self-center font-weight-600 mx--4">{date}</div>
                            <div className="col-5">
                                <hr />
                            </div>
                        </div>
                    )}
                </small>
            </div>
            <div className="row">
                {profileImage ? (
                    <Image
                        variant="rounded"
                        size="sm"
                        className="border"
                        src={getPhoto(profileImage)}
                        width={15}
                        height={15}
                    />
                ) : (
                    <Image
                        variant="rounded"
                        size="sm"
                        className="border"
                        src={icons.profilePick}
                        width={15}
                        height={15}
                    />
                )}
                <div className="col-11">
                    <div className="mb-0">
                        <h6
                            className={`h5 mt-0 mb-0 d-flex justify-content-between text-primary ${isHovered ? 'hovered' : ''}`}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {isLoginUser ? (
                                <div className="text-primary pointer" onClick={subtitleOnclick}>
                                    {subTitle ? subTitle : 'Add your user name'}
                                </div>
                            ) : (
                                <div className="text-red">
                                    {subTitle ? subTitle : 'Add your user name'}
                                </div>
                            )}

                            <div className="col">
                                <small className="text-muted">{time}</small>
                            </div>
                        </h6>
                    </div>
                    <div>
                        <div className="text-muted text-sm font-weight-bold">{title}</div>
                    </div>
                </div>
            </div>
            <div className="mb-4">{children}</div>
        </div>
    );
}

export { GroupChat };
