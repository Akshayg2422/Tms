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
    Back,
    ImagePicker,
    Spinner,
    LoadingButton,
} from "@Components";
import { translate } from "@I18n";
import {
    getEmployees,
    addTask,
    getDepartments,
    getDesignations,
    getAssociatedCompaniesL,
    getSubTaskGroups
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
    getDropDownCompanyDisplayData,
    getDropDownDisplayData
} from "@Utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInput, useNavigation, useDropDown } from "@Hooks";
import moment from "moment";

function AddTask() {

    const dispatch = useDispatch();
    const { goBack } = useNavigation();


    const { dashboardDetails, departments, designations, associatedCompaniesL } = useSelector(
        (state: any) => state.UserCompanyReducer
    );
    const { subTaskGroups } = useSelector(
        (state: any) => state.TaskReducer
    );

    const title = useInput("");
    const description = useInput("");
    const referenceNo = useInput("");
    const [taskType, setTaskType] = useState(type[1]);
    const [disableTaskType, setDisableTaskType] = useState([]);
    // const [companies, setCompanies] = useState([])
    const [companyUsers, setCompanyUsers] = useState([])


    const [loading, setLoading] = useState(false)
    const [photo, setPhoto] = useState<any>([]);
    const department = useDropDown({})
    const designation = useDropDown({})
    const company = useDropDown({})
    const taskGroup = useDropDown({})
    const [selectNoPickers, setSelectNoPickers] = useState<any>();
    const [image, setImage] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedUserId, setSelectedUserId] = useState<any>();
    const selectedTicketPriority = useDropDown(PRIORITY[1]);
    const [eta, setEta] = useState("")
    let attach = photo.slice(-selectNoPickers)
    const [date, setDate] = useState<any>(moment().format())

    useEffect(() => {
        getAssociatedCompaniesApi();
        getSubTaskGroupsApi();
    }, [])

    useEffect(() => {
        getCompanyEmployeeApi()
    }, [designation.value, department.value, company.value,])


    useEffect(() => {
        getDepartmentsApiHandler();
        getDesignationApiHandler();
    }, [company.value, taskType])



    const getBranchId = () =>
        taskType?.id === type[1].id
            ? dashboardDetails?.permission_details?.branch_id
            : company?.value?.id

    const handleImagePicker = (file: any) => {
        let newUpdatedPhoto = [...photo, file];
        setPhoto(newUpdatedPhoto);
    };

    function getCompanyEmployeeApi() {

        const params = {
            code: getBranchId(),
            ...(department && { department_id: department?.value?.id }),
            ...(designation && { designation_id: designation?.value?.id }),
            per_page_count: -1,
        };

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
                onError: () => () => { },
            })
        );
    }

    const submitTaskHandler = () => {
        setLoading(true)
        const params = {
            title: title?.value,
            description: description?.value,
            reference_number: referenceNo?.value,
            ...(company?.value?.id && { brand_branch_id: company?.value?.id }),
            ...(selectedUserId?.id && { assigned_to_id: selectedUserId?.id }),
            priority: selectedTicketPriority?.value?.id,
            task_attachments: [{ attachments: attach }],
            is_parent: true,
            eta_time: eta,
            code: taskGroup?.value?.id,
            ...(department?.value?.id && { department_id: department.value.id }),
            ...(designation?.value?.id && { designation_id: designation.value.id })

        };

        const validation = validate(taskType?.id === "1" ? CREATE_EXTERNAL : CREATE_INTERNAL, params);
        if (ifObjectExist(validation)) {
            dispatch(
                addTask({
                    params,
                    onSuccess: (response: any) => () => {
                        if (response.success) {
                            goBack();
                            showToast(response.message, "success");
                        }
                        setLoading(false)

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
                        setDisableTaskType([]);

                    }

                    else {
                        setTaskType(type[1]);
                        setDisableTaskType([type[0]] as never);
                    }
                },
                onError: () => () => {

                },
            })
        );
    }


    function getSubTaskGroupsApi() {

        const params = {};
        dispatch(
            getSubTaskGroups({
                params,
                onSuccess: (response: any) => () => {

                },
                onError: () => () => {

                },
            })
        );
    }

    function getDepartmentsApiHandler() {

        const params = {
            code: getBranchId()
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
            code: getBranchId()
        }



        dispatch(getDesignations({
            params,
            onSuccess: (response) => () => {

            },
            onError: () => () => {
            },
        }))
    }

    // function getDropDownDisplayData(data: any, key: string = 'name') {
    //     if (data && data.length > 0) {
    //         return data.map(each => {
    //             return { ...each, text: each[key] }
    //         })
    //     }
    // }

    const handleEtaChange = (value: any) => {
        setEta(value);
        setDate(value)
    };


    const getExternalCompanyStatus = () => ((taskType && taskType?.id === "2") || company.value?.id)


    return (
        <Card className="m-3">
            <div className='col'>
                <div className="row mt--2">
                    <Back />
                    <h3 className="ml-3">{translate("common.addTask")!}</h3>
                </div>
            </div>
            <hr className='mt-2'></hr>

            <div className="col-auto pb-4 mt--3">
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
                            setSelectNoPickers(el?.length)

                        }}
                    />

                </div>


            </div>

            <div className="col-md-9 col-lg-5">

                {/* <div className="col-md-9 col-lg-5 ml--1">
                    <label className={`form-control-label ml--2`}>
                        {translate("common.addAttachment")}
                    </label>
                    <span className="row">
                        {selectDropzone &&
                            selectDropzone.map((el, index) => {
                                return (
                                    <div className="mb-2" >
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
                                    </div>
                                );
                            })}
                    </span>
                </div> */}



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
                <div >
                    <h4 className="">{translate('auth.description')}</h4>
                    <textarea style={{ width: '358px', height: '50px' }}
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

                <DropDown
                    heading={translate("auth.Task Priority")!}
                    selected={selectedTicketPriority.value}
                    placeHolder={translate('order.please select a task priority')!}
                    data={PRIORITY}
                    onChange={selectedTicketPriority.onChange} />

                <div className="mb-1">
                    <Radio
                        data={type}
                        selectItem={taskType}
                        disableId={disableTaskType}
                        onRadioChange={(selected) => {
                            setSelectedUser('')
                            company.onChange({})
                            department.onChange({})
                            designation.onChange({})
                            if (selected) {
                                setTaskType(selected);
                            }
                        }}
                    />
                </div>

                {taskType && taskType?.id === "1" && (
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
                    heading={translate("common.department")!}
                    placeHolder={translate("order.Select a Department")!}
                    data={getDropDownDisplayData(departments)}
                    onChange={(item) => {
                        department.onChange(item)
                    }}
                    selected={department.value}
                />
                }

                {getExternalCompanyStatus() && designations && designations.length > 0 && <DropDown
                    heading={translate("auth.designation")}
                    placeHolder={translate('order.Select a Designation')!}
                    data={getDropDownDisplayData(designations)}
                    onChange={(item) => {
                        designation.onChange(item)
                    }}
                    selected={designation.value}
                />
                }

                {getExternalCompanyStatus() && companyUsers && companyUsers.length > 0 &&
                    <AutoCompleteDropDownImage
                        heading={translate("common.user")!}
                        placeholder={translate("order.please select a user")!}
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
                    />}

                {subTaskGroups && subTaskGroups.length > 0 && <DropDown
                    heading={translate("common.selectGroup")}
                    placeHolder={translate('order.Select a Group')!}
                    data={getDropDownDisplayData(subTaskGroups)}
                    onChange={taskGroup.onChange}
                    selected={taskGroup.value}
                />
                }

                <DateTimePicker
                    heading={'ETA'}
                    id="eta-picker"
                    placeholder={'Select ETA'}
                    type="both"
                    onChange={handleEtaChange}
                    value={date ? getMomentObjFromServer(date) : null!}

                />
            </div>


            {/* <div className="col mt-4">
                <Button
                    text={loading ? "Loading..." : translate("common.submit")}
                    onClick={submitTaskHandler}
                    disabled={loading}
                >
                    {loading && <Spinner/>}
                </Button>
            </div>  */}

            <div className="col mt-4">

                <LoadingButton size={'md'}
                    text={translate('common.submit')}
                    loading={loading}
                    onClick={submitTaskHandler} />

            </div>


        </Card >

    );
}

export { AddTask };
