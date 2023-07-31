import {
    DropDown,
    Input,
    Radio,
    showToast,
    DateTimePicker,
    Card,
    Back,
    ImagePicker,
    LoadingButton,
    AutoComplete,
    InputHeading,
    TextAreaInput,
    
} from "@Components";
import { translate } from "@I18n";
import {
    getEmployees,
    getDepartments,
    getDesignations,
    getAssociatedCompaniesL,
    raiseNewTicket

} from "@Redux";
import {
    CREATE_INTERNAL,
    CREATE_EXTERNAL,
    getValidateError,
    ifObjectExist,
    type,
    validate,
    PRIORITY,
    getDropDownDisplayData,
    getDropDownCompanyDisplayData,
    getDropDownCompanyUser,
    generateReferenceNo,
} from "@Utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInput, useNavigation, useDropDown, useKeyPress, useLoader } from "@Hooks";
function AddTicket() {
    const dispatch = useDispatch();
    const { goBack } = useNavigation();
    const { dashboardDetails, departments, designations, associatedCompaniesL,employees } = useSelector(
        (state: any) => state.UserCompanyReducer
    );

    const title = useInput("");
    const description = useInput("");
    const referenceNo = useInput(generateReferenceNo());
    const [ticketType, setTicketType] = useState(type[1]);
    const [disableTicketType, setDisableTicketType] = useState([]);
    const [photo, setPhoto] = useState<any>([]);
    const department = useDropDown({})
    const designation = useDropDown({})
    const company = useDropDown({})
    const [image, setImage] = useState("");
    const [selectedUserId, setSelectedUserId] = useState<any>();
    const selectedTicketPriority = useDropDown(PRIORITY[1]);
    const [eta, setEta] = useState("")
    const [loading, setLoading] = useState(false)   
    const isEnterPressed = useKeyPress("Enter");
    const loginLoader = useLoader(false);
    
    useEffect(() => {
        if (isEnterPressed) {
            submitTicketHandler()
        }
      }, [isEnterPressed]);

    useEffect(() => {
        getAssociatedCompaniesApi();
    }, [])

    useEffect(() => {
        getCompanyEmployeeApi()

    }, [designation.value, department.value,company.value])


    useEffect(() => {
        getDepartmentsApiHandler();
        getDesignationApiHandler();
    }, [company.value, ticketType])

    useEffect (()=>{
        getDesignationApiHandler();

    },[department.value])

    const getBranchId = () =>
        ticketType?.id === type[1].id
            ? dashboardDetails?.permission_details?.branch_id
            : company?.value?.id

    function getCompanyEmployeeApi() {

        const params = {
            branch_id: getBranchId(),
            ...(department && { department_id: department?.value?.id }),
            ...(designation && { designation_id: designation?.value?.id }),
            per_page_count: -1,
        };

        dispatch(
            getEmployees({
                params,
                onSuccess: (response: any) => () => {
          
                },
                onError: (error) => () => {
                },
            })
        );
    }

    const submitTicketHandler = () => {
        setLoading(true)
        const params = {
            title: title?.value,
            description: description?.value,
           ...(referenceNo?.value &&{reference_number: referenceNo?.value}),
            ...(company?.value?.id && { brand_branch_id: company?.value?.id }),
            assigned_to_id: selectedUserId?.id,
            priority: selectedTicketPriority?.value?.id,
            ticket_attachments: [{ attachments:photo}],
            ...(department && { department_id: department?.value?.id }),
            ...(designation && { designation_id: designation?.value?.id }),
           ...(eta && {eta_time: eta}),
        };



        const validation = validate(ticketType?.id === "1" ? CREATE_EXTERNAL : CREATE_INTERNAL, params);
        if (ifObjectExist(validation)) {
            loginLoader.show()

            dispatch(
                raiseNewTicket({
                    params,
                    onSuccess: (response: any) => () => {
                        if (response.success) {
                            goBack();
                            loginLoader.hide()
                            showToast(response.message, "success");
                        }
                        setLoading(false)
                        // console.log('+++++++++++')

                    },
                    onError: (error) => () => {
                        showToast(error.error_message);
                        setLoading(false)
                        loginLoader.hide()
                    },
                })
            );
        } else {
            showToast(getValidateError(validation));
        }
    };


    function getAssociatedCompaniesApi() {
        const params = { q: "" };
        dispatch(
            getAssociatedCompaniesL({
                params,
                onSuccess: (response: any) => () => {
                    const companies = response.details
                    if (companies && companies.length > 0) {
                     
                        setDisableTicketType([]);

                    } else {
                        setTicketType(type[1]);
                        setDisableTicketType([type[0]] as never);
                    }
                },
                onError: () => () => {

                },
            })
        );
    }

    function getDepartmentsApiHandler() {

        const params = {
            branch_id: getBranchId(),
            per_page_count: -1,
        }



        dispatch(getDepartments({
            params,
            onSuccess: () => () => {
            },
            onError: () => () => {
            },
        }))
    }

    function getDesignationApiHandler() {

        const params = {
            branch_id: getBranchId(),
            ...(department?.value?.id &&{department_id:department?.value?.id}),
            per_page_count: -1,
        }



        dispatch(getDesignations({
            params,
            onSuccess: (response) => () => {

            },
            onError: () => () => {
            },
        }))
    }

    const handleEtaChange = (value: any) => {
        setEta(value);
        // setDate(value)
    };


    const getExternalCompanyStatus = () => ((ticketType && ticketType?.id === "2") || company.value?.id)
    return (
        <Card className="m-3">
            <div className='col'>
                <div className="row">
                    <Back />
                    <h3 className="ml-3">{translate('common.addTicket')!}</h3>
                </div>
            </div>
            <hr className='mt-3'></hr>

            <div className="col-auto pb-2 mt--4">
                <div className="row">
                    <ImagePicker
                        icon={image}
                        size='xl'
                        heading={translate("common.addAttachment")!}
                        noOfFileImagePickers={3}
                        onSelect={(image) => {

                          
                        }}
                     
                        onSelectImagePickers={(el)=>{
                            let array: any = []
      
                            for (let i = 0; i <= el.length; i++) {
                              let eventPickers = el[i]?.base64?.toString().replace(/^data:(.*,)?/, "")
                              if(eventPickers !==undefined){
                              array.push(eventPickers)
                              }
                              
                            }
                            setPhoto(array)

                          }}
                    />

                </div>
            </div>
            <div className="col-md-9 col-lg-5 ">
                <div className="pt-2">
                <Input
                    heading={translate("common.title")}
                    value={title.value}
                    onChange={title.onChange}
                />

                </div>
           
           <div className="pt--1">
           <TextAreaInput
                heading={translate('auth.description')!}
                value={description.value}
                onChange={description.onChange}
                className="form-control form-control-sm"
                
                />

           </div>
          
               <div>
               <Input
                    type={"text"}
                    heading={translate("auth.referenceNo")}
                    value={referenceNo.value}
                    onChange={referenceNo.onChange}
                />
               </div>
                <div className="mb-1">
                    <Radio
                        data={type}
                        selectItem={ticketType}
                        disableId={disableTicketType}
                        onRadioChange={(selected) => {
                            company.onChange({})
                            department.onChange({})
                            designation.onChange({})
                            if (selected) {
                                setTicketType(selected);
                            }
                        }}
                    />
                </div>

                {ticketType && ticketType?.id === "1" && (
                    
                    <div>
                        <DropDown
                        heading={translate("common.company")!}
                        placeHolder={translate('order.Select a company')!}
                        data={getDropDownCompanyDisplayData(associatedCompaniesL)}
                        onChange={(item) => {
                            company.onChange(item)
                        }}
                        selected={company.value}
                    />
                    </div>
                )}

                {getExternalCompanyStatus() && departments && departments.length > 0 &&
                <div>
                     <DropDown
                    heading={translate('common.department')}
                    placeHolder={translate('order.Select a Department')!}
                    data={getDropDownDisplayData(departments)}
                    onChange={(item) => {
                        department.onChange(item)
                    }}
                    selected={department.value}
                />
                </div>
                }

                {getExternalCompanyStatus() && designations && designations.length > 0 &&
                <div> <DropDown
                    heading={translate("common.department")!}
                    placeHolder={translate('order.Select a Designation')!}
                    data={getDropDownDisplayData(designations)}
                    onChange={(item) => {
                        designation.onChange(item)
                    }}
                    selected={designation.value}
                />
                </div>
                }
               
{getExternalCompanyStatus()  && employees && employees.length > 0 &&
                  <div>
                      <AutoComplete
                    variant={'custom'}
                        heading={translate("common.user")!}
                         data={getDropDownCompanyUser(employees)}
                          selected={selectedUserId}
                onChange={(item)=>{
                    setSelectedUserId(item)

                }} 
                    />
                    </div>}

              <div>  <DateTimePicker
                    heading={'ETA'}
                    id="eta-picker"
                    placeholder={'Select ETA'}
                    type="both"
                    onChange={handleEtaChange}
             
                />
                </div>
            </div>

           
        
            <div className="col mt-4">

                <LoadingButton size={'md'}
                    text={translate('common.submit')}
                    loading={loginLoader.loader}
                    onClick={submitTicketHandler} />

            </div>

           

        </Card >

    );
}

export { AddTicket };