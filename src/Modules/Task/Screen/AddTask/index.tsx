import {
    DropDown,
    Input,
    Radio,
    showToast,
    DateTimePicker,
    Card,
    Back,
    ImagePicker,
    Spinner,
    LoadingButton,
    AutoComplete,
    InputHeading,
    TextAreaInput,
    Button

} from "@Components";
import { translate } from "@I18n";
import {
    getEmployees,
    addTask,
    getDepartments,
    getDesignations,
    getAssociatedCompaniesL,
    getSubTaskGroups,
    getSubTaskGroupsSuccess
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
    getDropDownDisplayData,
    getPhoto,
    getDropDownCompanyUser,
    generateReferenceNo
} from "@Utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInput, useNavigation, useDropDown, useKeyPress, useLoader } from "@Hooks";
import moment from "moment";

function AddTask() {



    const dispatch = useDispatch();
    const { goBack } = useNavigation();
    const { dashboardDetails, departments, designations, associatedCompaniesL, employees } = useSelector(
        (state: any) => state.UserCompanyReducer
    );

    const DEFAULT_COMPANY = { id: dashboardDetails?.permission_details?.branch_id, display_name: '𝗦𝗘𝗟𝗙', name: 'self' }

    const { subTaskGroups } = useSelector(
        (state: any) => state.TaskReducer
    );

    const title = useInput("");
    const description = useInput("");


    const [referenceNo, setReferenceNo] = useState(generateReferenceNo());
    const [taskType, setTaskType] = useState(type[1]);
    const [disableTaskType, setDisableTaskType] = useState([]);
    const [loading, setLoading] = useState(false)
    const [photo, setPhoto] = useState<any>([]);
    const department = useDropDown({})
    const designation = useDropDown({})
    const company = useDropDown(DEFAULT_COMPANY)
    const taskGroup = useDropDown({})
    const [selectNoPickers, setSelectNoPickers] = useState<any>();
    const [image, setImage] = useState("");
    const [selectedUserId, setSelectedUserId] = useState<any>();
    const selectedTicketPriority = useDropDown(PRIORITY[1]);
    const [eta, setEta] = useState("")
    // let attach = photo.slice(-selectNoPickers)
    const [date, setDate] = useState<any>()
    const loginLoader = useLoader(false);


    const isEnterPressed = useKeyPress("Enter");

    useEffect(() => {
        if (isEnterPressed) {
            submitTaskHandler()
        }
    }, [isEnterPressed]);

    useEffect(() => {
        getAssociatedCompaniesApi();
    }, [])


    useEffect(() => {
        getCompanyEmployeeApi()
    }, [designation.value, department.value, company.value,])


    useEffect(() => {
        getDepartmentsApiHandler();
        getDesignationApiHandler();

    }, [company.value, taskType])

    useEffect(() => {
        // if(taskType?.id==='2'){
        getSubTaskGroupsApi();

        // }
    }, [company.value])



    const getBranchId = () =>
        taskType?.id === type[1].id
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
                onError: () => () => { },
            })
        );
    }

    const submitTaskHandler = () => {

        const params = {
            title: title?.value,
            description: description?.value,
            ...(referenceNo && { reference_number: referenceNo }),
            ...(company?.value?.id && { brand_branch_id: company?.value?.id }),
            ...(selectedUserId?.id && { assigned_to_id: selectedUserId?.id }),
            priority: selectedTicketPriority?.value?.id,
            task_attachments: [{ attachments: photo }],
            is_parent: true,
            eta_time: eta,
            group_id: taskGroup?.value?.id,
            ...(department?.value?.id && { department_id: department.value.id }),
            ...(designation?.value?.id && { designation_id: designation.value.id })

        };

        const validation = validate(taskType?.id === "1" ? CREATE_EXTERNAL : CREATE_INTERNAL, params);
        if (ifObjectExist(validation)) {
            loginLoader.show()
            setLoading(true)
            dispatch(
                addTask({
                    params,
                    onSuccess: (response: any) => () => {
                        if (response.success) {
                            goBack();
                            loginLoader.hide()
                            showToast(response.message, "success");
                        }
                        setLoading(false)

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

        const params = {
            per_page_count: -1,
            branch_id: company.value?.id ? company.value?.id : dashboardDetails?.permission_details?.branch_id

        };

        dispatch(
            getSubTaskGroups({
                params,
                onSuccess: (response: any) => () => {
                    console.log('ccc')

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

            <div className="col-auto pb-4 mt--4">
                <div className="row">
                    <ImagePicker
                        icon={image}
                        size='xl'
                        heading={translate("common.addAttachment")!}
                        noOfFileImagePickers={3}
                        onSelect={(image) => { }}
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

            <div className="col-md-9 col-lg-5">
                <div className="mt--2">
                    <Input

                        heading={translate("common.title")}
                        value={title.value}
                        onChange={title.onChange}

                    />

                </div>



                <div className="mt--2">
                    <TextAreaInput
                        heading={translate('auth.description')!}
                        value={description.value}
                        onChange={description.onChange}
                        className="form-control form-control-sm "

                    />

                </div>



                <div className="mt--2">
                    <Input
                        type={"text"}
                        heading={translate("auth.referenceNo")}
                        value={referenceNo}
                        onChange={(e) => { setReferenceNo(e.target.value) }}
                    />
                </div>


                <div className="mt--2">
                    <DropDown
                        heading={translate("auth.Task Priority")!}
                        selected={selectedTicketPriority.value}
                        placeHolder={translate('order.please select a task priority')!}
                        data={PRIORITY}
                        onChange={selectedTicketPriority.onChange}
                    />
                </div>
                <div className="my-3">
                    <Radio
                        data={type}
                        selectItem={taskType}
                        disableId={disableTaskType}
                        onRadioChange={(selected) => {
                            // company.onChange({})
                            department.onChange({})
                            designation.onChange({})
                            dispatch(
                                getSubTaskGroupsSuccess([])
                            )
                            if (selected) {
                                setTaskType(selected);


                            }
                        }}
                    />
                </div>

                {
                    taskType && taskType?.id === "1" && (
                        <div className="mt--2">
                            <DropDown
                                heading={translate("common.company")!}
                                placeHolder={translate('order.Select a company')!}
                                data={getDropDownCompanyDisplayData(associatedCompaniesL)}
                                onChange={(item) => {
                                    company.onChange(item)
                                    // getSubTaskGroupsApi()
                                }}
                                selected={company.value}
                            />
                        </div>
                    )
                }

                {
                    getExternalCompanyStatus() && departments && departments.length > 0 &&
                    <div className="mt--2">

                        <DropDown
                            heading={translate("common.department")!}
                            placeHolder={translate("order.Select a Department")!}
                            data={getDropDownDisplayData(departments)}
                            onChange={(item) => {
                                department.onChange(item)
                            }}
                            selected={department.value}
                        />
                    </div>
                }

                {
                    getExternalCompanyStatus() && designations && designations.length > 0 &&

                    <div className="mt--2">
                        <DropDown
                            heading={translate("auth.designation")}
                            placeHolder={translate('order.Select a Designation')!}
                            data={getDropDownDisplayData(designations)}
                            onChange={(item) => {
                                designation.onChange(item)
                            }}
                            selected={designation.value}
                        />
                    </div>
                }

                {
                    getExternalCompanyStatus() && employees && employees.length > 0 &&
                    <div className="mt--2">
                        <AutoComplete
                            variant={'custom'}
                            heading={translate("common.user")!}
                            data={getDropDownCompanyUser(employees)}
                            selected={selectedUserId}
                            onChange={(item) => {
                                setSelectedUserId(item)


                            }}
                        />
                    </div>
                }



                {
                    subTaskGroups && subTaskGroups.length > 0 &&
                    <div className="mt-3"><DropDown
                        heading={translate("common.selectGroup")}
                        placeHolder={translate('order.Select a Group')!}
                        data={getDropDownDisplayData(subTaskGroups)}
                        onChange={taskGroup.onChange}
                        selected={taskGroup.value}
                    />
                    </div>
                }

                <div className="mt--2">
                    <DateTimePicker
                        heading={'ETA'}
                        id="eta-picker"
                        placeholder={'Select ETA'}
                        type="both"
                        onChange={handleEtaChange}


                    />
                </div>
            </div >

            <div className="col ">
                <Button size={'md'}
                    loading={loginLoader.loader}
                    text={translate('common.submit')}
                    onClick={submitTaskHandler} />
            </div>
        </Card >

    );
}

export { AddTask };