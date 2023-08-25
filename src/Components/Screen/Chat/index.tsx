import { useEffect, useState } from 'react'
import { ChatProps } from './interfaces'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner, Badge, Image, Modal, Button, ImagePicker, FilterLinkMessage, ImageIcon } from '@Components'
import { Provider, useSelector } from 'react-redux'
import {
    capitalizeFirstLetter,
    getDisplayTimeFromMoment,
    getMomentObjFromServer,
    getServerDateFromMoment,
    getDayAndFormattedDate,
    getPhoto,
    ifObjectHasKey,

} from '@Utils';
import { icons } from '@Assets'
import { useModal, useInput } from '@Hooks';
import { translate } from '@I18n'
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { FileViewer } from '@Components//Component/FileViewer';


function Chat({ loading, data, variant = 'private', hasMore, onNext, height = 100, onDelete, isSuccess, onEdit, }: ChatProps) {

    const { dashboardDetails } = useSelector(
        (state: any) => state.UserCompanyReducer,
    );

    const isAdmin = dashboardDetails?.permission_details?.is_admin

    const [edit, setEdit] = useState<any>(undefined);
    const deleteModal = useModal(false);
    const editModal = useModal(false);
    const editMessage = useInput('')
    const [selectDropzone, setSelectDropzone] = useState<any>([{ id: "1" }]);
    const [photos, setPhotos] = useState<any>([]);
    const [selectedNoOfPickers, setSelectedNoOfPickers] = useState<any>()


    let attachmentEdit = selectDropzone && selectDropzone.map((el, index) => {
        const { id, attachment_file } = el
        return {
            id: index + 1, photo: attachment_file,
        }
    })




    const handleImagePicker = (file: any) => {
        let newUpdatedPhoto = [...photos, file];
        setPhotos(newUpdatedPhoto);
    };

    useEffect(() => {
        if (isSuccess) {
            deleteModal.hide();
            editModal.hide();
            setSelectDropzone(undefined);
            editMessage.set('')
        }
    }, [isSuccess])


    function getDisplayChats(messageArr: any) {

        return (
            messageArr &&
            messageArr.length > 0 &&
            messageArr.map((each: any) => {
                return { ...getItemData(each) };
            })
        );
    }

    function getDisplayChatsWithTime(messageArr: any) {
        if (messageArr && messageArr.length > 0) {
            return messageArr.map((each: any, index: number) => {
                const { event_by } = each;
                let date = {};
                try {
                    const current = getServerDateFromMoment(
                        getMomentObjFromServer(each.created_at),
                    );

                    const isLast = messageArr.length - 1 === index;
                    let next;
                    if (!isLast) {
                        next = getServerDateFromMoment(
                            getMomentObjFromServer(messageArr[index + 1].created_at),
                        );
                    }

                    if (!next) {
                        date = { date: getDayAndFormattedDate(current) };
                    }

                    if (current !== next) {
                        date = { date: getDayAndFormattedDate(current) };
                    }

                    /**
                     * profile pic logic
                     */

                    const currentUser = event_by?.id;
                    const nextUser = messageArr[index - 1].event_by?.id;

                    if (currentUser === nextUser) {
                        delete each.profile_pic;
                    }

                    const userId = event_by?.id;
                    const nextUserId = messageArr[index + 1].event_by?.id;

                    if (userId === nextUserId) {
                        delete each.name;
                    }
                } catch (e) { }
                return { ...each, ...date };
            });
        }
    }

    function Received({ item }: any) {
        const { id, name, message, display_created_at, attachments, date, profile_pic, is_in_call } = item;

        let modifiedArray = attachments;

        if (attachments && attachments.length > 3) {
            modifiedArray = attachments?.slice(0, 4);
        }
        const [hasHover, setHasHover] = useState(false);



        return (
            <div className='col'>
                {ifObjectHasKey(item, 'date') && <DateViewer date={date} />}


                <div className='d-flex row mt-3'>
                    {variant === 'group' && profile_pic ?
                        <div className='mr-2'>
                            <Image size={'sm'} variant={'rounded'} src={profile_pic} height={30} width={30} />
                        </div> : <div className='ml-3' style={variant === 'group' ? { width: 30, } : {}}></div>
                    }
                    <div
                        className={`${"media-comment-text"} ${true ? 'hovered' : ''}`}
                        style={{
                            maxWidth: '70%',
                        }}
                        onMouseEnter={() => {
                            setHasHover(true)
                        }}
                        onMouseLeave={() => {
                            setHasHover(false)
                        }}
                    >
                        <div>
                            {isAdmin && variant === 'group' && <Hover
                                show={hasHover}
                                onDelete={() => {
                                    setEdit(item);
                                    deleteModal.show()
                                }}
                            />
                            }

                            {name && variant === 'group' && (<h6 className="h5 mt-0 mb-0">{name}</h6>)}
                            <p className="text-sm lh-160 mb-0" style={{ whiteSpace: 'pre-line' }}>{message}</p>

                            <div>

                                {attachments && attachments.length === 1 && (
                                    <PhotoProvider>
                                        <PhotoView src={getPhoto(attachments[0].attachment_file)}>
                                            <Image
                                                border-r={5}
                                                src={getPhoto(attachments[0].attachment_file)}
                                                width={250}
                                                height={250}
                                            />
                                        </PhotoView>
                                    </PhotoProvider>

                                )}


                                <div className='row' style={{
                                    flexWrap: "wrap",
                                    maxWidth: 350,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <PhotoProvider>
                                        {attachments &&
                                            attachments.length > 1 &&
                                            modifiedArray.map((each: any, index: number) => {
                                                return (
                                                    <div key={index} style={{
                                                        alignItems: "center",
                                                        justifyContent: 'center',
                                                    }}>
                                                        <PhotoView src={getPhoto(each?.attachment_file)}>
                                                            <Image
                                                                style={{
                                                                    padding: 5
                                                                }}
                                                                className='ml-2'
                                                                border-r={5}
                                                                src={getPhoto(each?.attachment_file)}
                                                                width={150}
                                                                height={150}
                                                            />
                                                        </PhotoView>
                                                    </div>
                                                );
                                            }
                                            )
                                        }
                                    </PhotoProvider>
                                </div>

                            </div>
                            <div className='text-right'>
                                <small style={{
                                    fontSize: 10
                                }} className="d-block text-muted  mt-0 ml-4">{display_created_at}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }


    function Hover({ show, onDelete, onEdit }: any) {

        return <div className='d-flex justify-content-end mr-2'>
            {show && <div className='row justify-content-center align-items-center' style={
                {
                    backgroundColor: 'rgba(52, 52, 52, 0.2)',
                    borderRadius: 5,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingBottom: 5
                }
            }>
                {onEdit &&
                    <div className='pointer mr-2' onClick={onEdit}>
                        <Image
                            src={icons.editEta}
                            width={12}
                            height={12}
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                }

                {onDelete &&
                    <div className='pointer ml-1' onClick={onDelete}>
                        <Image
                            src={icons.deleteCurve}
                            width={12}
                            height={12}
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                }
            </div>
            }
        </div >
    }


    function Sent({ item }: any) {

        const { id, message, filter, display_created_at, attachments, date, chat_attachments, event_type, is_in_call } = item;


        let modifiedArray = attachments;

        if (attachments && attachments.length > 3) {
            modifiedArray = attachments?.slice(0, 4);
        }
        const [hasHover, setHasHover] = useState(false);

        return (
            <div>
                {ifObjectHasKey(item, 'date') ? <DateViewer date={date} /> : <></>}




                {is_in_call ?
                    <div className='d-flex justify-content-center  mt-2 mb-3'>
                        <div
                            onMouseEnter={() => {
                                setHasHover(true)
                            }}
                            onMouseLeave={() => {
                                setHasHover(false)
                            }}>
                            <Hover
                                show={hasHover}
                                onDelete={() => {
                                    setEdit(item);
                                    deleteModal.show()
                                }}
                            />

                            <div>
                                {is_in_call ?
                                    <div style={{ borderRadius: '24px 24px', border: '2px solid blue', width: '30px', height: '30px' }}>
                                        <div className=' text-center align-item-center mb-0'>
                                            <ImageIcon src={icons.videoCall} height={15} width={15} />
                                        </div>


                                        {/* </div> */}

                                    </div>
                                    : ''}
                            </div>


                        </div>
                    </div>


                    :
                    ((event_type === 'MEA' || event_type === 'TEM') ?
                        <div className='d-flex justify-content-end mt-3'>
                            <div
                                className={`${"media-comment-text"} ${true ? 'hovered' : ''}`}
                                style={{
                                    maxWidth: '70%',
                                }}
                                onMouseEnter={() => {
                                    setHasHover(true)
                                }}
                                onMouseLeave={() => {
                                    setHasHover(false)
                                }}>
                                <Hover
                                    show={hasHover}
                                    onEdit={() => {
                                        setEdit(item);
                                        if (event_type === 'TEM') {
                                            editMessage.set(filter)
                                            setSelectDropzone(undefined)
                                        } else if (event_type === 'MEA') {
                                            editMessage.set(chat_attachments?.name)
                                            setSelectDropzone(chat_attachments.attachments)
                                        }
                                        editModal.show()
                                    }}
                                    onDelete={() => {
                                        setEdit(item);
                                        deleteModal.show()
                                    }}
                                />
                                <div>
                                    <p className="text-sm mb-0 d-inline" style={{ whiteSpace: 'pre-line' }}>{message}</p>

                                    <div>
                                        {attachments && attachments.length === 1 && event_type === 'MEA' && (
                                            <PhotoProvider>
                                                <PhotoView src={getPhoto(attachments[0].attachment_file)}>
                                                    <Image
                                                        style={{
                                                            borderRadius: 5
                                                        }}
                                                        src={getPhoto(attachments[0].attachment_file)}
                                                        width={250}
                                                        height={250}
                                                    />
                                                </PhotoView>
                                            </PhotoProvider>
                                        )}


                                        <div className='row mt-2' style={{
                                            flexWrap: "wrap",
                                            justifyContent: 'flex-start',
                                            alignItems: 'center'
                                        }}>
                                            <PhotoProvider>
                                                {attachments &&
                                                    attachments.length > 1 &&
                                                    modifiedArray.map((each: any, index: number) => {
                                                        return (
                                                            <div key={index} style={{
                                                                alignItems: "center",
                                                                justifyContent: 'center',
                                                            }}>

                                                                <PhotoView src={getPhoto(each?.attachment_file)}>
                                                                    <Image
                                                                        style={{
                                                                            padding: 2
                                                                        }}
                                                                        className='ml-2'
                                                                        border-r={5}
                                                                        src={getPhoto(each?.attachment_file)}
                                                                        width={150}
                                                                        height={150}
                                                                    />
                                                                </PhotoView>

                                                            </div>
                                                        );
                                                    }
                                                    )
                                                }
                                            </PhotoProvider>
                                        </div>
                                    </div>

                                    <div className='text-right'>
                                        <small style={{
                                            fontSize: 10
                                        }} className="d-block text-muted mt-0 ml-4">{display_created_at}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        ((event_type === 'MP4') ?
                            <div className='d-flex justify-content-end mt-3'>
                                <div
                                    className={`${"media-comment-text"} ${true ? 'hovered' : ''}`}
                                    style={{
                                        maxWidth: '70%',
                                    }}
                                    onMouseEnter={() => {
                                        setHasHover(true)
                                    }}
                                    onMouseLeave={() => {
                                        setHasHover(false)
                                    }}>
                                    <Hover
                                        show={hasHover}
                                        onDelete={() => {
                                            setEdit(item);
                                            deleteModal.show()
                                        }}
                                    />
                                    <div>
                                        <p className="text-sm mb-0 d-inline" style={{ whiteSpace: 'pre-line' }}>{message}</p>

                                        <div>
                                            <div className='row mt-2' style={{
                                                flexWrap: "wrap",
                                                justifyContent: 'flex-start',
                                                alignItems: 'center'
                                            }}>
                                                {/* <PhotoProvider> */}
                                                {attachments &&
                                                    attachments.length > 0 &&
                                                    modifiedArray.map((each: any, index: number) => {

                                                        return (
                                                            <div key={index} style={{
                                                                alignItems: "center",
                                                                justifyContent: 'center',

                                                            }} className='test-center'>
                                                                <div className='pl-3 pb-2 ' >
                                                                    <Image src={icons.videoPlayer} height={50} width={50} />

                                                                </div>

                                                            </div>
                                                        );
                                                    }
                                                    )
                                                }

                                                {/* </PhotoProvider> */}

                                            </div>
                                        </div>

                                        <div className='text-right'>
                                            <small style={{
                                                fontSize: 10
                                            }} className="d-block text-muted mt-0 ml-4">{display_created_at}</small>
                                        </div>
                                    </div>
                                </div>
                            </div> :
                            <div className='d-flex justify-content-end mt-3'>
                                <div
                                    className={`${"media-comment-text"} ${true ? 'hovered' : ''}`}
                                    style={{
                                        maxWidth: '70%',
                                    }}
                                    onMouseEnter={() => {
                                        setHasHover(true)
                                    }}
                                    onMouseLeave={() => {
                                        setHasHover(false)
                                    }}>
                                    <Hover
                                        show={hasHover}
                                        onDelete={() => {
                                            setEdit(item);
                                            deleteModal.show()
                                        }}
                                    />
                                    <div>
                                        <p className="text-sm mb-0 d-inline" style={{ whiteSpace: 'pre-line' }}>{message}</p>

                                        <div>
                                            <div className='row mt-2' style={{
                                                flexWrap: "wrap",
                                                justifyContent: 'flex-start',
                                                alignItems: 'center'
                                            }}>
                                                {/* <PhotoProvider> */}
                                                {attachments &&
                                                    attachments.length > 0 &&
                                                    modifiedArray.map((each: any, index: number) => {

                                                        return (
                                                            <div key={index} style={{
                                                                alignItems: "center",
                                                                justifyContent: 'center',

                                                            }} className='test-center'>
                                                                <div className='pl-3 pb-2 ' >

                                                                    <FileViewer
                                                                        icons={icons.document} height={70} width={70} selectedFileUrl={each?.attachment_file} />
                                                                </div>

                                                            </div>
                                                        );
                                                    }
                                                    )
                                                }

                                                {/* </PhotoProvider> */}

                                            </div>
                                        </div>

                                        <div className='text-right'>
                                            <small style={{
                                                fontSize: 10
                                            }} className="d-block text-muted mt-0 ml-4">{display_created_at}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    )






                }

            </div >
        );
    }

    function DateViewer({ date }: any) {
        return (
            <div className='d-flex justify-content-center mt-3'>
                <Badge color={'secondary'} size={'sm'} text={date?.day} className='px-3' />
            </div>
        );
    }



    function getItemData(each: any) {
        const { event_type, message, chat_attachments, event_by, created_at } = each;

        const isCurrentUser = event_by?.id === dashboardDetails?.user_details?.id;
        let modifiedData = { type: isCurrentUser ? 'sent' : 'received', ...each };


        switch (event_type) {
            case 'TEM':
                modifiedData = {
                    ...modifiedData,
                    name: event_by?.name ? capitalizeFirstLetter(event_by?.name) : '',

                    message: message ? <FilterLinkMessage message={message} /> : '',
                    filter: message ? message : '',

                    display_created_at: getDisplayTimeFromMoment(
                        getMomentObjFromServer(created_at),
                    ),
                    profile_pic: getPhoto(event_by?.profile_image),
                };
                break;

            case 'MEA':
                modifiedData = {
                    ...modifiedData,
                    name: capitalizeFirstLetter(event_by?.name),
                    message: capitalizeFirstLetter(chat_attachments?.name),
                    display_created_at: getDisplayTimeFromMoment(
                        getMomentObjFromServer(created_at),
                    ),
                    attachments: chat_attachments?.attachments,
                    profile_pic: getPhoto(event_by?.profile_image),
                };
                break;
            case 'PDF':
                modifiedData = {
                    ...modifiedData,
                    name: capitalizeFirstLetter(event_by?.name),
                    message: capitalizeFirstLetter(chat_attachments?.name),
                    display_created_at: getDisplayTimeFromMoment(
                        getMomentObjFromServer(created_at),
                    ),
                    attachments: chat_attachments?.attachments,
                    profile_pic: getPhoto(event_by?.profile_image),
                };
                break;
            case 'TXT':
                modifiedData = {
                    ...modifiedData,
                    name: capitalizeFirstLetter(event_by?.name),
                    message: capitalizeFirstLetter(chat_attachments?.name),
                    display_created_at: getDisplayTimeFromMoment(
                        getMomentObjFromServer(created_at),
                    ),
                    attachments: chat_attachments?.attachments,
                    profile_pic: getPhoto(event_by?.profile_image),
                };
                break;
            case 'zip':
                modifiedData = {
                    ...modifiedData,
                    name: capitalizeFirstLetter(event_by?.name),
                    message: capitalizeFirstLetter(chat_attachments?.name),
                    display_created_at: getDisplayTimeFromMoment(
                        getMomentObjFromServer(created_at),
                    ),
                    attachments: chat_attachments?.attachments,
                    profile_pic: getPhoto(event_by?.profile_image),
                };
                break;
            case 'DOCS':
                modifiedData = {
                    ...modifiedData,
                    name: capitalizeFirstLetter(event_by?.name),
                    message: capitalizeFirstLetter(chat_attachments?.name),
                    display_created_at: getDisplayTimeFromMoment(
                        getMomentObjFromServer(created_at),
                    ),
                    attachments: chat_attachments?.attachments,
                    profile_pic: getPhoto(event_by?.profile_image),
                };
                break;
            case 'MP4':
                modifiedData = {
                    ...modifiedData,
                    name: capitalizeFirstLetter(event_by?.name),
                    message: capitalizeFirstLetter(chat_attachments?.name),
                    display_created_at: getDisplayTimeFromMoment(
                        getMomentObjFromServer(created_at),
                    ),
                    attachments: chat_attachments?.attachments,
                    profile_pic: getPhoto(event_by?.profile_image),
                };
                break;

            default:
                modifiedData = modifiedData;
                break;
        }
        return modifiedData;
    }


    return (
        <>
            <div
                id="scrollableDiv"
                style={{
                    height: height - 225,
                    display: 'flex',
                    flexDirection: 'column-reverse',
                }}
                className={'overflow-auto overflow-hide mt-3'}>
                {data && data.length > 0 &&
                    <InfiniteScroll
                        dataLength={data.length}
                        hasMore={hasMore}
                        scrollableTarget="scrollableDiv"
                        style={{ display: 'flex', flexDirection: 'column-reverse' }}
                        className={'overflow-auto overflow-hide'}
                        inverse
                        loader={<Spinner />}
                        next={() => {
                            if (onNext) {
                                onNext()
                            }
                        }}
                    >
                        {data && data.length > 0 &&
                            getDisplayChatsWithTime(getDisplayChats(data)).map((item: any) => {
                                const { type, id } = item;
                                return (
                                    <div key={id}>
                                        {
                                            type === 'sent' ? (
                                                <Sent item={item} />
                                            ) : (
                                                <Received item={item} />
                                            )
                                        }
                                    </div>
                                )
                            })
                        }
                    </InfiniteScroll>
                }
            </div >



            {/**
             * Delete Modal
             */}
            <Modal title={translate("errors.Are you sure you want to delete?")!
            } isOpen={deleteModal.visible} size={'md'} onClose={deleteModal.hide} >
                <div className="d-flex justify-content-end mt--3">
                    <Button size={'sm'} className={'text-white'} text={'Delete'}
                        onClick={() => {
                            if (onDelete) {
                                onDelete(edit)
                            }
                        }}
                    />
                </div>
            </Modal>


            {
                /** 
                 * edit Modal
                 */
            }

            < Modal size={'lg'} title={translate('common.Edit Chat')!} isOpen={editModal.visible} onClose={editModal.hide} >

                <div className="col-md col-lg">
                    <div className='col-md col-lg'>
                        <textarea value={editMessage?.value} className="form-control form-control-sm" onChange={editMessage.onChange}></textarea>
                    </div>
                    {
                        attachmentEdit && attachmentEdit.length > 0 && edit?.event_type === 'MEA' &&
                        <div className="col-auto pb-2">
                            <div className="row">
                                <ImagePicker
                                    defaultPicker={true}
                                    defaultValue={attachmentEdit}
                                    size='xl'
                                    heading={translate("auth.attach")!}
                                    onSelect={(image) => {
                                        let file = image.toString().replace(/^data:(.*,)?/, "")
                                        handleImagePicker(file)
                                    }}

                                    onSelectImagePicker={(el) => {
                                        setSelectedNoOfPickers(el?.length)
                                    }}
                                    onSelectImagePickers={(el) => {
                                        let array: any = []
                                        for (let i = 0; i <= el.length; i++) {
                                            let editPickers = el[i]?.base64?.toString().replace(/^data:(.*,)?/, "")
                                            if (editPickers !== undefined) {
                                                array.push(editPickers)
                                            }
                                        }
                                        setPhotos(array)
                                    }}
                                />
                            </div>
                        </div>
                    }
                </div>

                <div className="row justify-content-end d-flex mt-2 mr-3">
                    <div className="col-md-5 col-lg-3 ">
                        <Button
                            className={'text-white'}
                            block
                            text={translate("order.Update")}
                            onClick={() => {

                                if (onEdit) {
                                    let attach = photos.slice(-selectedNoOfPickers)

                                    const params = {
                                        id: edit?.id,
                                        ...(edit.event_type === 'TEM' && { edited_message: editMessage?.value }),
                                        ...(edit.event_type === 'MEA' && { chat_attachments: [{ name: editMessage?.value, attachments: attach }] }),
                                    }
                                    onEdit(params)
                                }
                            }}
                        />
                    </div>
                </div>

            </Modal >

        </>


    )
}
export { Chat }