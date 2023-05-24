import {
    Button,
    DropDown,
    Input,
    Radio,
    Dropzone,
    showToast,
    DateTimePicker,
    AutoCompleteDropDownImage,
    Card,
    Back
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
} from "@Utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInput, useNavigation, useDropDown } from "@Hooks";
import AutoSearchInput from "@Components//Core/AutoSearchInput";

function AddTicket() {


    const dispatch = useDispatch();
    const { goBack } = useNavigation();


    const { dashboardDetails, departments, designations } = useSelector(
        (state: any) => state.UserCompanyReducer
    );
    // const { ticketGroups } = useSelector(
    //     (state: any) => state.TicketReducer
    // );

    const title = useInput("");
    const description = useInput("");
    const referenceNo = useInput("");
    const [ticketType, setTicketType] = useState(type[1]);
    const [disableTicketType, setDisableTicketType] = useState([]);
    const [companies, setCompanies] = useState([])
    const [companyUsers, setCompanyUsers] = useState([])

    const [photo, setPhoto] = useState<any>([]);
    const department = useDropDown({})
    const designation = useDropDown({})
    const company = useDropDown({})
    // const ticketGroup = useDropDown({})
    const [selectDropzone, setSelectDropzone] = useState<any>([{ id: "1" }]);
    const [image, setImage] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedUserId, setSelectedUserId] = useState<any>();
    const [, setDesignations] = useState([])
    const selectedTicketPriority = useDropDown("");
    const [eta, setEta] = useState("")
    let attach = photo.slice(-4, 9)


    useEffect(() => {
        getAssociatedCompaniesApi();
        // console.log('========>>>')
    }, [])

    useEffect(() => {
        getCompanyEmployeeApi()
        // console.log('=======><><>')
    }, [designation.value, department.value])


    useEffect(() => {
        getDepartmentsApiHandler();
        getDesignationApiHandler();
    }, [company.value, ticketType])

    const getBranchId = () =>
        ticketType?.id === type[1].id
            ? dashboardDetails?.permission_details?.branch_id
            : company?.value?.id

    const handleImagePicker = (index: number, file: any) => {
        let newUpdatedPhoto = [...photo, file];
        setPhoto(newUpdatedPhoto);
    };

    function getCompanyEmployeeApi() {

        const params = {
            branch_id: getBranchId(),
            ...(department && { department_id: department?.value?.id }),
            ...(designation && { designation_id: designation?.value?.id })
        };


        console.log('getCompanyEmployeeApi=====>' + JSON.stringify(params));

        dispatch(
            getEmployees({
                params,
                onSuccess: (response: any) => () => {
                    let companiesUser: any = [];
                    const companyDetails = response?.details
                    companiesUser = companyDetails.map((item: any) => {
                        return { ...item, designation: item?.designation?.name, department: item?.department?.name }
                    });
                    setCompanyUsers(companiesUser);
                },
                onError: (error) => () => {
                },
            })
        );
    }

    const submitTicketHandler = () => {
        const params = {
            title: title?.value,
            description: description?.value,
            reference_number: referenceNo?.value,
            ...(company?.value?.id && { brand_branch_id: company?.value?.id }),
            assigned_to_id: selectedUserId?.id,
            priority: selectedTicketPriority?.value?.id,
            ticket_attachments: [{ attachments: attach }],
             eta_time: eta,
        };
        console.log('==========>',params )


        const validation = validate(ticketType?.id === "1" ? CREATE_EXTERNAL : CREATE_INTERNAL, params);
        if (ifObjectExist(validation)) {
            console.log('=======><')
            dispatch(
                raiseNewTicket({
                    params,
                    onSuccess: (response: any) => () => {
                        if (response.success) {
                            goBack();
                            showToast(response.message, "success");
                        }
                        console.log('+++++++++++')
                    },
                    onError: (error) => () => {
                        showToast(error.error_message);
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
                        const displayCompanyDropdown = companies.map(each => {
                            const { id, display_name } = each
                            return {
                                id: id, text: display_name, name: display_name,
                            }
                        })
                        setCompanies(displayCompanyDropdown)
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




    function getDropDownDisplayData(data: any, key: string = 'name') {
        if (data && data.length > 0) {
            return data.map(each => {
                return { ...each, text: each[key] }
            })
        }
    }

    const handleEtaChange = (value: any) => {
        setEta(value);
    };


    const getExternalCompanyStatus = () => ((ticketType && ticketType?.id === "2") || company.value?.id)
    return (
        <Card className="m-3">
            <div className='col'>
                <div className="row">
                    <Back />
                    <h3 className="ml-3">{translate("common.addTicket")!}</h3>
                </div>
            </div>
            <hr className='mt-3'></hr>
            <div className="col-md-9 col-lg-5">
                <Input
                    heading={translate("common.title")}
                    value={title.value}
                    onChange={title.onChange}
                />
                <Input
                    heading={translate("auth.description")}
                    value={description.value}
                    onChange={description.onChange}
                />
                <Input
                    type={"text"}
                    heading={translate("auth.referenceNo")}
                    value={referenceNo.value}
                    onChange={referenceNo.onChange}
                />
                <div className="mb-2">
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
                        placeHolder={'Select a company'}
                        data={companies}
                        onChange={(item) => {
                            company.onChange(item)
                        }}
                        selected={company.value}
                    />
                )}

                {getExternalCompanyStatus() && departments && departments.length > 0 && <DropDown
                    heading={'Department'}
                    placeHolder={'Select a Department...'}
                    data={getDropDownDisplayData(departments)}
                    onChange={(item) => {
                        department.onChange(item)
                    }}
                    selected={department.value}
                />
                }

                {getExternalCompanyStatus() && designations && designations.length > 0 && <DropDown
                    heading={'Designation'}
                    placeHolder={'Select a Designation'}
                    data={getDropDownDisplayData(designations)}
                    onChange={(item) => {
                        designation.onChange(item)
                    }}
                    selected={designation.value}
                />
                }

                {/* {getExternalCompanyStatus() && companyUsers && companyUsers.length > 0 &&
                    <AutoCompleteDropDownImage
                        heading={translate("common.user")!}
                        placeholder={'please select a user...'}
                        value={selectedUser}
                        getItemValue={(item) => item.name}
                        item={companyUsers}
                        onChange={(event, value) => {
                            setSelectedUser(value)
                        }}
                        onSelect={(value, item) => {
                            setSelectedUser(value);
                            setSelectedUserId(item)
                        }}
                    />} */}


{ getExternalCompanyStatus() && companyUsers && companyUsers.length > 0 &&  <AutoSearchInput 
                    heading={translate("common.user")!}
                    placeholder={'please select a user...'}
                    data={companyUsers}
                    variant={true}
                    onSelect={( item)=>{
                        // setSelectedUser(item.name);
                        setSelectedUserId(item)
                    
                    }}
                

                    />
                }


                <DropDown
                    heading={translate("common.ticketPriority")!}
                    selected={selectedTicketPriority.value}
                    placeHolder={'please select a ticket priority...'}
                    data={PRIORITY}
                    onChange={selectedTicketPriority.onChange} />

                <DateTimePicker
                    heading={'ETA'}
                    id="eta-picker"
                    placeholder={'Select ETA'}
                    type="both"
                    onChange={handleEtaChange}
                />
            </div>

            <div className="col-md-9 col-lg-5 mt-3">
                <label className={`form-control-label`}>
                    {'Add Attachment'}
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
            </div>



            <div className="col mt-4">
                <Button
                    text={translate("common.submit")}
                    onClick={submitTicketHandler}
                />
            </div>

        </Card >

    );
}

export { AddTicket };