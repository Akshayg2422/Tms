import React from 'react'
import { ChatProps } from './interfaces'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner, Badge, Image } from '@Components'
import { useSelector } from 'react-redux'
import {
    capitalizeFirstLetter,
    getDisplayTimeFromMoment,
    getMomentObjFromServer,
    getServerDateFromMoment,
    getDayAndFormattedDate,
    getPhoto,
    ifObjectHasKey
} from '@Utils';


function Chat({ loading, data, variant = 'private', hasMore, onNext, height = 100 }: ChatProps) {

    const { dashboardDetails } = useSelector(
        (state: any) => state.UserCompanyReducer,
    );

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
        const { name, message, display_created_at, attachments, date, profile_pic } =
            item;

        let modifiedArray = attachments;

        if (attachments && attachments.length > 3) {
            modifiedArray = attachments?.slice(0, 4);
        }
        return (
            <div className='col'>
                {ifObjectHasKey(item, 'date') && <DateViewer date={date} />}
                <div className='d-flex row mt-3'>
                    {variant === 'group' && profile_pic ?
                        <div className='mr-2'>
                            <Image size={'sm'} variant={'rounded'} src={profile_pic} height={30} width={30} />
                        </div> : <div className='ml-3' style={{ width: 30, }}></div>
                    }
                    <div className='media-comment-text' style={{
                        maxWidth: '70%',
                    }}>
                        <div>
                            {name && variant === 'group' && (<h6 className="h5 mt-0 mb-0">{name}</h6>)}
                            <p className="text-sm lh-160 mb-0">{message}</p>
                            <div>
                                {attachments && attachments.length === 1 && (
                                    <Image
                                        border-r={5}
                                        src={getPhoto(attachments[0].attachment_file)}
                                        width={250}
                                        height={250}
                                    />

                                )}
                                {attachments &&
                                    attachments.length > 1 &&
                                    modifiedArray.map((each: any, index: number) => {
                                        const isMore =
                                            index === modifiedArray.length - 1 &&
                                            attachments.length > 4;
                                        return (
                                            <div key={index} style={{
                                                width: "50%",
                                                justifyContent: 'center',
                                                alignContent: 'center'
                                            }}>
                                                <Image
                                                    border-r={5}
                                                    src={getPhoto(each?.attachment_file)}
                                                    width={250}
                                                    height={250}
                                                />

                                            </div>
                                        );
                                    }
                                    )
                                }
                            </div>

                            {/* <Container padding-v={3} flex-d={'row'} flex-w={'wrap'}>
                            
                                <Container
                                    flex-d={'row'}
                                    flex-w={'wrap'}
                                    flex-ai={'flex-start'}>
                                    {attachments &&
                                        attachments.length > 1 &&
                                        modifiedArray.map((each: any, index: number) => {
                                            const isMore =
                                                index === modifiedArray.length - 1 &&
                                                attachments.length > 4;

                                            return (
                                                <Touchable
                                                    accessibilityRole="button"
                                                    key={index + ''}
                                                    w={'50%'}
                                                    padding={2}
                                                    flex-jc={'center'}
                                                    flex-ai={'center'}
                                                    onPress={() => {
                                                        imageOnSelect(true, index, attachments);
                                                    }}>
                                                    <>
                                                        <ImageView
                                                            isUri
                                                            border-r={5}
                                                            source={getPhotos(each?.attachment_file)}
                                                            w={'100%'}
                                                            h={130}
                                                        />

                                                        {isMore && (
                                                            <Container
                                                                bc={color.transparent}
                                                                position={'absolute'}
                                                                overflow={'hidden'}
                                                                padding={28}>
                                                                <Text
                                                                    color={color.white}
                                                                    text-a={'center'}
                                                                    variant={'bold'}
                                                                    font-size={30}>
                                                                    {attachments.length - 4 + '+'}
                                                                </Text>
                                                            </Container>
                                                        )}
                                                    </>
                                                </Touchable>
                                            );
                                        })}
                                </Container>
                            </Container> */}
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
    function Sent({ item }: any) {
        const { message, display_created_at, attachments, date } = item;
        let modifiedArray = attachments;
        if (attachments && attachments.length > 3) {
            modifiedArray = attachments?.slice(0, 4);
        }

        return (
            <div >
                {ifObjectHasKey(item, 'date') && <DateViewer date={date} />}
                <div className='d-flex justify-content-end mt-3'>
                    <div className='media-comment-text' style={{
                        maxWidth: '70%',
                    }}>
                        <p className="text-sm lh-160 mb-0">{message}</p>
                        <div className='my-1'>
                            {attachments && attachments.length === 1 && (
                                <Image
                                    style={{
                                        borderRadius: 5
                                    }}
                                    src={getPhoto(attachments[0].attachment_file)}
                                    width={250}
                                    height={250}
                                />
                            )}
                            <div className='row' style={{
                                flexWrap: "wrap",
                                maxWidth: 350,
                            }}>
                                {attachments &&
                                    attachments.length > 1 &&
                                    modifiedArray.map((each: any, index: number) => {
                                        const isMore = index === modifiedArray.length - 1 && attachments.length > 4;
                                        return (
                                            <div key={index} style={{
                                                alignItems: "center",
                                                justifyContent: 'center',
                                            }}>
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

                                                {/* {isMore && (
                                                    <div style={
                                                        {
                                                            backgroundColor: 'rgba(52, 52, 52, 0.3)',
                                                            position: 'absolute',
                                                            overflow: 'hidden',
                                                            padding: 20,
                                                        }
                                                    }>
                                                        <h1>{'sas'}</h1>


                                                    </div>
                                                )} */}
                                            </div>
                                        );
                                    }
                                    )
                                }
                            </div>
                        </div>

                        <div className='text-right'>
                            <small style={{
                                fontSize: 10
                            }} className="d-block text-muted mt-0 ml-4">{display_created_at}</small>
                        </div>
                    </div>
                </div>
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
                    name: capitalizeFirstLetter(event_by?.name),
                    message: capitalizeFirstLetter(message),
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

            default:
                modifiedData = modifiedData;
                break;
        }
        return modifiedData;
    }

    return (
        <div
            id="scrollableDiv"
            style={{
                height: height - 185,
                display: 'flex',
                flexDirection: 'column-reverse',
            }}
            className={'overflow-auto overflow-hide mt-3'}>
            {data && data.length > 0 && <InfiniteScroll
                dataLength={data.length}
                hasMore={hasMore}
                scrollableTarget="scrollableDiv"
                style={{ display: 'flex', flexDirection: 'column-reverse' }}
                className={'overflow-auto overflow-hide'}
                inverse={true}
                loader={
                    <Spinner />
                }
                next={onNext}>
                {
                    loading && <Spinner />
                }
                {data && data.length > 0 &&
                    getDisplayChatsWithTime(getDisplayChats(data)).map((item: any, index: number) => {
                        const { type } = item;
                        return type === 'sent' ? (
                            <Sent item={item} />
                        ) : (
                            <Received item={item} />
                        );
                    })
                }
            </InfiniteScroll>
            }
        </div>


    )
}
export { Chat }