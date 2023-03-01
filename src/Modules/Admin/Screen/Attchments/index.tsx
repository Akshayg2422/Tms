

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useInput } from '@Hooks';
import { } from '@Modules'
import { Card, HomeContainer, Image, Input } from '@Components'
import { translate } from "@I18n";
import { getTicketsEvents } from '@Redux';
import { getPhoto } from '@Utils';

function Attachments() {

    const dispatch = useDispatch();
    const Search = useInput('');

    const { ticketEvents } = useSelector((state: any) => state.CompanyReducer);

    const { selectedIssues } = useSelector((state: any) => state.AdminReducer);
    console.log(Search.value)

    useEffect(() => {

        const params = {
            ticket_id: selectedIssues?.id,
            event_type: "MEA"

        }
        dispatch(
            getTicketsEvents({
                params,
                onSuccess: () => () => { },
                onFailure: () => () => { }
            })
        )


    }, [])

    const getSearchHandler = () => {
        const params = { q_many: Search.value }
        dispatch(getTicketsEvents({
            params,
            onSuccess: () => () => { },
            onError: () => () => { }
        }))
    }

    return (
        <HomeContainer >
            <Card>
                <div className="input-group bg-white border  col-5">
                    <input
                        type="text"
                        className="form-control bg-transparent border border-0"
                        placeholder={translate("auth.search")!}
                        value={Search.value}
                        onChange={Search.onChange}
                    />
                    <span className="input-group-text border border-0" onClick={getSearchHandler} style={{ cursor: "pointer" }} >  <i className="fas fa-search" /></span>

                </div>


                <div>
                    {

                        ticketEvents && ticketEvents.data.length > 0 ? ticketEvents.data.map((item: any, index: number) => {
                            return item.attachments.attachments.map((image: any) => {
                                return (
                                    <div className='my-3'>
                                        <h4> {image?.name} </h4>
                                        <Image src={getPhoto(image.attachment_file)} variant={'avatar'} size={'xxl'} />
                                    </div>
                                )
                            })



                        }) :
                            <div className='text-center'>
                                No Date Found
                            </div>


                    }
                </div>
            </Card>

        </HomeContainer>

    )
}
export { Attachments }
