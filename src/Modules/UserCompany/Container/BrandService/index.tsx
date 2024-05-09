import { Button, CommonTable, HomeContainer, NoDataFound, Spinner, showToast,Image } from '@Components'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getPhoto, paginationHandler } from '@Utils'
import { getBrandService } from '@Redux';
import { useLoader, useNavigation, useWindowDimensions } from '@Hooks';
import { ROUTES } from '@Routes';




function BrandService() {
    const { companiesBrandService, companiesBrandServiceCurrentPages, companiesBrandServiceNumOfPages } = useSelector((state: any) => state.UserCompanyReducer)
    const dispatch = useDispatch()
    const {goTo}=useNavigation()
    const [loading, setLoading] = useState(false);
    const{dashboardDetails,selectedCompany}=useSelector((state:any)=>state.UserCompanyReducer)
    const { height } = useWindowDimensions()
 
    useEffect(() => {
        getCompanyBrandServiceHandler(companiesBrandServiceCurrentPages)

    }, [])

    const getCompanyBrandServiceHandler = (page_number: any) => {
        const params = {
            brand__id:selectedCompany?.id
        }

        dispatch(
            getBrandService({
                params,
                onSuccess: (response: any) => () => {

                
                },
                onError: (error: any) => () => {

                }
            }
            )
        )

    }
    const normalizedTableData = (data: any) => {
        if (data && data?.length > 0)
            return data?.map((el: any) => {
                const { photo, name, description } = el
                return {
                    'Profile': <div>
                        <div className='col'>
                            <div className={'row'}>
                                <Image size={'md'} variant={'rounded'} src={getPhoto(photo)} />
                                <div className='pt-3 pl-2 text-center'>
                                    {name}
                                </div>
                            </div>

                        </div>
                    </div>,
                    'Description': description

                };
            });
    };
    return (
        <HomeContainer type={'card'} className="shadow-none overflow-auto overflow-hide mt-3"
        style={{
            height: height - 85
          }}
        >
                <div className='row justify-content-end text-end mr-3 mt-3' >
                <Button text={'Add Brand Service'} size={'sm'} onClick={()=>{
                    goTo(ROUTES['user-company-module']['add-service'])
                }}/>

            </div>
            {loading && (
                <div className="d-flex align-items-center justify-content-center pointer" style={{ minHeight: '100px' }}>
                    <Spinner />
                </div>
            )}
        

            {!loading &&<div>

          {companiesBrandService&& companiesBrandService.length>0  ?
           <CommonTable
                isPagination
                tableDataSet={companiesBrandService}
                displayDataSet={normalizedTableData(companiesBrandService)}
                noOfPage={companiesBrandServiceNumOfPages}
                currentPage={companiesBrandServiceCurrentPages}
                paginationNumberClick={(currentPage) => {
                    getCompanyBrandServiceHandler(paginationHandler("current", currentPage));
                }}
                previousClick={() => {
                    getCompanyBrandServiceHandler(paginationHandler("prev",companiesBrandServiceCurrentPages))
                }
                }
                nextClick={() => {
                    getCompanyBrandServiceHandler(paginationHandler("next", companiesBrandServiceCurrentPages));
                }
                }

            />
             :<div className={'d-flex justify-content-center align-items-center'} style={{ height: '90vh' }}><NoDataFound text={'No Product Found'} /></div>
            }
            
            </div> 
}
        </HomeContainer>


    )
}

export { BrandService }