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
    getMomentObjFromServer,
    getDropDownDisplayData,
    getDropDownCompanyDisplayData,
    getDropDownCompanyUser,
} from "@Utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInput, useNavigation, useDropDown } from "@Hooks";
import moment from "moment";

function AddTicket() {
    const dispatch = useDispatch();
    const { goBack } = useNavigation();
    const { dashboardDetails, departments, designations, associatedCompaniesL,employees } = useSelector(
        (state: any) => state.UserCompanyReducer
    );

    const title = useInput("");
    const description = useInput("");
    const referenceNo = useInput("");
    const [ticketType, setTicketType] = useState(type[1]);
    const [disableTicketType, setDisableTicketType] = useState([]);
    // const [companies, setCompanies] = useState([])
    const [companyUsers, setCompanyUsers] = useState([])
    const [photo, setPhoto] = useState<any>([]);
    const department = useDropDown({})
    const designation = useDropDown({})
    const company = useDropDown({})
    // const ticketGroup = useDropDown({})
    // const [selectDropzone, setSelectDropzone] = useState<any>([{ id: "1" }]);
    const [image, setImage] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedUserId, setSelectedUserId] = useState<any>();
    const selectedTicketPriority = useDropDown(PRIORITY[1]);
    const [eta, setEta] = useState("")
    const [selectNoOfPickers, setSelectNoOfPickers] = useState<any>()
    const [loading, setLoading] = useState(false)
    let attach = photo.slice(-selectNoOfPickers)
    const [date, setDate] = useState<any>(moment().format())


    useEffect(() => {
        getAssociatedCompaniesApi();
    }, [])

    useEffect(() => {
        getCompanyEmployeeApi()

    }, [designation.value, department.value])


    useEffect(() => {
        getDepartmentsApiHandler();
        getDesignationApiHandler();
    }, [company.value, ticketType])

    const getBranchId = () =>
        ticketType?.id === type[1].id
            ? dashboardDetails?.permission_details?.branch_id
            : company?.value?.id

    const handleImagePicker = (file: any) => {
        let newUpdatedPhoto = [...photo, file];
        setPhoto(newUpdatedPhoto);
    };

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
            ticket_attachments: [{ attachments: attach }],
            ...(department && { department_id: department?.value?.id }),
            ...(designation && { designation_id: designation?.value?.id }),
           ...(eta && {eta_time: eta}),
        };



        const validation = validate(ticketType?.id === "1" ? CREATE_EXTERNAL : CREATE_INTERNAL, params);
        if (ifObjectExist(validation)) {

            dispatch(
                raiseNewTicket({
                    params,
                    onSuccess: (response: any) => () => {
                        if (response.success) {
                            goBack();
                            showToast(response.message, "success");
                        }
                        setLoading(false)
                        // console.log('+++++++++++')

                    },
                    onError: (error) => () => {
                        showToast(error.error_message);
                        setLoading(false)
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
                        // const displayCompanyDropdown = companies.map(each => {
                        //     const { id, display_name } = each
                        //     return {
                        //         id: id, text: display_name, name: display_name,
                        //     }
                        // })
                        // setCompanies(displayCompanyDropdown)
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
            branch_id: getBranchId()
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
            branch_id: getBranchId()
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
        setDate(value)
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

            <div className="col-auto pb-2 mt--2">
                <div className="row">
                    <ImagePicker
                        icon={image}
                        size='xl'
                        heading={translate("common.addAttachment")!}
                        noOfFileImagePickers={4}
                        onSelect={(image) => {

                            let file = image.toString().replace(/^data:(.*,)?/, "")
                            handleImagePicker(file)
                        }}
                        onSelectImagePicker={(el) => {
                            setSelectNoOfPickers(el?.length)

                        }}
                    />

                </div>
            </div>
            <div className="col-md-9 col-lg-5 mt--1">
                <Input
                    heading={translate("common.title")}
                    value={title.value}
                    onChange={title.onChange}
                />
                {/* <Input
                    heading={translate("auth.description")}
                    value={description.value}
                    onChange={description.onChange}
                /> */}
                <div className="col-lg-5">
                    <h4 className="ml--3">{translate('auth.description')}</h4>
                    <textarea 
                        value={description.value}
                        onChange={description.onChange}
                        className="form-control form-control-sm" />
                </div>
                <Input
                    type={"text"}
                    heading={translate("auth.referenceNo")}
                    value={referenceNo.value}
                    onChange={referenceNo.onChange}
                />
                <div className="mb-1">
                    <Radio
                        data={type}
                        selectItem={ticketType}
                        disableId={disableTicketType}
                        onRadioChange={(selected) => {
                            setSelectedUser('')
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
                    <DropDown
                        heading={translate("common.company")!}
                        placeHolder={translate('order.Select a company')!}
                        data={getDropDownCompanyDisplayData(associatedCompaniesL)}
                        onChange={(item) => {
                            company.onChange(item)
                        }}
                        selected={company.value}
                    />
                )}

                {getExternalCompanyStatus() && departments && departments.length > 0 && <DropDown
                    heading={translate('common.department')}
                    placeHolder={translate('order.Select a Department')!}
                    data={getDropDownDisplayData(departments)}
                    onChange={(item) => {
                        department.onChange(item)
                    }}
                    selected={department.value}
                />
                }

                {getExternalCompanyStatus() && designations && designations.length > 0 && <DropDown
                    heading={translate("common.department")!}
                    placeHolder={translate('order.Select a Designation')!}
                    data={getDropDownDisplayData(designations)}
                    onChange={(item) => {
                        designation.onChange(item)
                    }}
                    selected={designation.value}
                />
                }
               
{getExternalCompanyStatus()  && employees && employees.length > 0 &&
                    <AutoComplete
                    variant={'custom'}
                        heading={translate("common.user")!}
                         data={getDropDownCompanyUser(employees)}
                          selected={selectedUserId}
                onChange={(item)=>{
                    setSelectedUserId(item)

                }} 
                    />}

                <DateTimePicker
                    heading={'ETA'}
                    id="eta-picker"
                    placeholder={'Select ETA'}
                    type="both"
                    onChange={handleEtaChange}
                    value={date ? getMomentObjFromServer(date) : null!}
                />
            </div>

            {/* <div className="col-md-9 col-lg-5 mt-3">
                <label className={`form-control-label`}>
                    {translate('common.addAttachment')}
                </label>
                <div>
                    {selectDropzone &&
                        selectDropzone.map((el, index) => {
                            return (
                                <Dropzone
                                    variant="ICON"
                                    icon={image}
                                    size="xl"
                                    onSelect={(image) => {
                                        let file = image.toString().replace(/^data:(.*,)?/, "");
                                        handleImagePicker(index, file);
                                        { selectDropzone.length > 0 && setSelectDropzone([{ id: "1" }, { id: "2" }]); }
                                        { selectDropzone.length > 1 && setSelectDropzone([{ id: "1" }, { id: "2" }, { id: "3" }]); }
                                        { selectDropzone.length > 2 && setSelectDropzone([{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }]); }
                                    }}
                                />
                            );
                        })}
                </div>
            </div> */}
        
            <div className="col mt-4">

                <LoadingButton size={'md'}
                    text={translate('common.submit')}
                    loading={loading}
                    onClick={submitTicketHandler} />

            </div>

            {/* <div className="col mt-4">
                <LoadingButton text={translate('common.submit')} 
                               size={'md'}  
                               loading={loading}
                               onClick={submitTicketHandler}/>


            </div> */}

        </Card >

    );
}

export { AddTicket };