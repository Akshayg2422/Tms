import React, { useEffect, useState } from 'react';
import { GroupChatProps } from './interfaces';
import { Image } from '@Components';
import { icons } from '@Assets';
import { HDD_MMMM_YYYY_HH_MM_A, getCurrentDay, getMomentObjFromServer, getPhoto } from '@Utils';
import moment from 'moment';


function GroupChat({
    children,
    title,
    time,
    date,
    color = 'white',
    rtl,
    subTitle,
    isEdit,
    isDelete,
    profileImage,
    editOnClick,
    deleteOnClick,
}: GroupChatProps) {
    const [editHover, setEditHover] = useState(false);
    const [deleteHover, setDeleteHover] = useState(false);

    const isEndOfDay = getCurrentDay(date)

    return (

        <div className={'container'}>
            <div className="row">
                {profileImage ? (
                    <Image variant={'rounded'} size={'sm'} className='border' src={getPhoto(profileImage)} width={15} height={15} />
                ) : (
                    ''
                )}
                <div className="col-11">
                    <div className="mb-0">
                        <h6 className="h5 mt-0 mb-0 d-flex justify-content-between text-primary">{subTitle}
                            <div className="col">
                                <small className="text-muted">
                                    {time}
                                </small>
                            </div>
                            <span>
                                {isEdit && (
                                    <small>
                                        <div
                                            className="col-auto pointer d-inline-flex justify-content-center align-items-center"
                                            onMouseEnter={() => setEditHover(true)}
                                            onMouseLeave={() => setEditHover(false)}
                                        >
                                            <Image
                                                src={icons.editEta}
                                                onClick={editOnClick}
                                                width={12}
                                                height={12}
                                                style={{ objectFit: 'contain' }}
                                            />
                                            {editHover && <span className="button-label" onClick={editOnClick}>Edit</span>}
                                        </div>
                                    </small>
                                )}
                                {isDelete && (
                                    <small>
                                        <div
                                            className="pointer d-inline-flex justify-content-center align-items-center"
                                            onMouseEnter={() => setDeleteHover(true)}
                                            onMouseLeave={() => setDeleteHover(false)}
                                        >
                                            <Image
                                                src={icons.deleteCurve}
                                                onClick={deleteOnClick}
                                                width={12}
                                                height={12}
                                                style={{ objectFit: 'contain' }}
                                            />
                                            {deleteHover && <span className="button-label" onClick={deleteOnClick}>Delete</span>}
                                        </div>
                                    </small>
                                )}
                            </span>
                        </h6>
                    </div>
                    <div className="">
                        <div className="text-muted text-sm font-weight-bold">{title}</div>
                    </div>

                    <div className="text-center">
                        <small className="text-muted ">
                            {date &&
                                <div className='row'>
                                    <div className={'col-5'}>
                                        <hr />
                                    </div>
                                    <div className={'col align-self-center mx--2'}>{date}</div>
                                    <div className={'col-5'}>
                                        <hr />
                                    </div>
                                </div>
                            }
                        </small>
                    </div>

                </div>
            </div>
            <div className="mb-4">
                {children}
            </div>
        </div>


    );
}

export { GroupChat };
