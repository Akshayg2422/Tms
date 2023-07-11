import React, { useState } from 'react';
import { GroupChatProps } from './interfaces';
import { Button, Image } from '@Components';
import { icons } from '@Assets';
import { getPhoto } from '@Utils';

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
                            className={`h5 mt-0 mb-0 d-flex justify-content-between text-primary ${isHovered ? 'hovered' : ''
                                }`}
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

                            {isHovered && (
                                <span>
                                    {isEdit && (
                                        <small>
                                            <div style={{ width: '20px', height: '20px', borderRadius: '4px' }} className="myLink pointer d-inline-flex justify-content-center align-items-center">
                                                <Image
                                                    src={icons.editEta}
                                                    onClick={editOnClick}
                                                    width={12}
                                                    height={12}
                                                    style={{ objectFit: 'contain' }}
                                                />
                                            </div>
                                        </small>
                                    )}
                                    {isDelete && (
                                        <small>
                                            <div style={{ width: '20px', height: '20px', borderRadius: '4px' }} className="pointer myLink d-inline-flex justify-content-center align-items-center">
                                                <Image
                                                    src={icons.deleteCurve}
                                                    onClick={deleteOnClick}
                                                    width={12}
                                                    height={12}
                                                    style={{ objectFit: 'contain' }}
                                                />
                                            </div>
                                        </small>
                                    )}
                                </span>
                            )}
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
