import { Send } from '@Components';
import { useLoader } from '@Hooks';
import { addGroupMessage, setRefreshGroupChat } from '@Redux';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddGroupChatProps } from './interfaces';


function AddGroupChat({ }: AddGroupChatProps) {

    const { selectedGroupChat } = useSelector((state: any) => state.UserCompanyReducer);
    const dispatch = useDispatch()
    const [success, setSuccess] = useState(false);
    const loader = useLoader(false)


    const addGroupMessageApiHandler = (params: any) => {

        loader.show();
        dispatch(
            addGroupMessage({
                params,
                onSuccess: () => () => {
                    loader.hide();
                    setSuccess(true)
                    dispatch(setRefreshGroupChat())
                },
                onError: () => () => {
                    loader.hide();
                },
            })
        );

    };

    return (
        <Send
            isSuccess={success}
            loading={loader.loader}
            onMessagePress={(message) => {
                setSuccess(false);
                const params = {
                    group_id: selectedGroupChat.id,
                    ...message,
                };

                addGroupMessageApiHandler(params);

<<<<<<< HEAD
            }}
            onAttachPress={response => {
                setSuccess(false);
                const params = {
                    group_id: selectedGroupChat.id,
                    group_attachments: [response.attachments],
                    ...response.type
                };
                addGroupMessageApiHandler(params);
            }}
        />
=======
                </div >
            </div >
            <Modal isOpen={attachmentModal.visible}
                onClose={attachmentModal.hide}>
                <div className='col-7 mt--6'>
                    <div className={'mt-2'}><Input heading={'Note'} value={attachmentName.value} onChange={attachmentName.onChange} /></div>
                    <div className='row mt--4'>
                        <ImagePicker
                            icon={image}
                            size='xl'
                            onSelect={(image) => {
                              
                            }}



                            onSelectImagePickers={(el) => {
                                let array: any = []

                                for (let i = 0; i <= el.length; i++) {
                                    let eventPickers = el[i]?.base64?.toString().replace(/^data:(.*,)?/, "")
                                    if (eventPickers !== undefined) {
                                        array.push(eventPickers)
                                    }

                                }
                                setPhoto(array)

                            }}
                        />
                    </div>
                </div>

                <div className='col-6 pt-2'>
                    <div className=''>
                        <Button text={translate("common.submit")} onClick={addGroupEventAttachment}
                            loading={loginLoader.loader} />
                    </div>
                </div>

            </Modal>
        </>
>>>>>>> ed20cf4bb287e6ce0eb53e652789561f65844f2b
    )
}
export { AddGroupChat };
