import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReferenceTickets, setSelectedTicket } from "@Redux";
import { getStatusFromCode, paginationHandler } from "@Utils";
import { NoDataFound, Card, CommonTable, Button, HomeContainer } from "@Components";
import { useNavigation, useWindowDimensions } from '@Hooks'
import { ROUTES } from '@Routes'
import { useParams } from 'react-router-dom';
import { translate } from "@I18n";


function ReferenceTickets() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { referenceTickets, referenceTicketNoOfPages, referenceTicketCurrentPages } = useSelector(
        (state: any) => state.TicketReducer
    );

    const { dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
    const { goTo } = useNavigation()
    const { height } = useWindowDimensions()

    const isAdmin = dashboardDetails?.permission_details?.is_admin
    const isSuperAdmin = dashboardDetails?.permission_details?.is_super_admin

    const showAction = isAdmin || isSuperAdmin



    useEffect(() => {
        proceedgetReferenceTickets(referenceTicketCurrentPages);
    }, [id]);


    const proceedgetReferenceTickets = (page_number: number) => {
        const params = {
            page_number,
            code: id,
            q: ""
        };

        dispatch(
            getReferenceTickets({
                params,
                onSuccess: (response) => () => {

                },
                onError: () => () => { },
            })
        );
    }


    const normalizedTableData = (data: any) => {



        return data?.map((el: any) => {
            return {
                issue: el.title,
                "raised by": el?.by_user.name,
                status: getStatusFromCode(dashboardDetails, el.ticket_status),
                "raised by company": el?.raised_by_company?.display_name
            };
        });
    };


    return (

        // <Card className={'overflow-auto overflow-hide mb--1 '} style={{ height: height - 15 }}>
        <HomeContainer className="card">
            <div className={'overflow-auto overflow-hide '} style={{ height: height - 15 }}>
                <div className=" d-flex justify-content-end m-3 ">
                    {referenceTickets && referenceTickets?.length > 0 && showAction && <Button size={'sm'} text={translate('order.Add Reference Ticket')} onClick={() => {
                        goTo(ROUTES['ticket-module']['reference-ticket'])
                    }} />
                    }
                </div>
                <div className="">
                    {referenceTickets && referenceTickets?.length > 0 ?
                        <CommonTable
                            isPagination
                            tableDataSet={referenceTickets}
                            currentPage={referenceTicketCurrentPages}
                            noOfPage={referenceTicketNoOfPages}
                            displayDataSet={normalizedTableData(referenceTickets)}
                            paginationNumberClick={(currentPage) => {
                                proceedgetReferenceTickets(paginationHandler("current", currentPage));
                            }}
                            previousClick={() => {
                                proceedgetReferenceTickets(paginationHandler("prev", referenceTicketCurrentPages))
                            }
                            }
                            nextClick={() => {
                                proceedgetReferenceTickets(paginationHandler("next", referenceTicketCurrentPages));
                            }
                            }
                            tableOnClick={(e, index, item) => {

                                console.log("item.code==>", item.code)

                                dispatch(setSelectedTicket(item))
                                goTo(ROUTES['ticket-module']['tickets-details'] + '/' + item.code)
                            }}

                        /> : <div className="d-flex h-100 justify-content-center align-items-center">
                            {showAction &&
                                <NoDataFound buttonText={translate('order.Add Reference Ticket')!} onClick={() => goTo(ROUTES['ticket-module']['reference-ticket'])} isButton />}
                        </div>}
                </div>
            </div>
        </HomeContainer>

        // </Card>



    );
}
export { ReferenceTickets };

