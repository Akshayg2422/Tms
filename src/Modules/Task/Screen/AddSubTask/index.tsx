import {
    Button,
    DropDown,
    Input,
    Radio,
    showToast,
    DateTimePicker,
    Card,
    Back,
    ImagePicker,
    AutoComplete,
    InputHeading,
    TextAreaInput,
} from "@Components";
import { translate } from "@I18n";
import {
    getEmployees,
    addTask,
    getDepartments,
    getDesignations,
    getAssociatedCompaniesL,
    setSelectedTaskCode

} from "@Redux";
import {
    CREATE_SUB_TASK_EXTERNAL,
    CREATE_SUB_TASK_INTERNAL,
    CREATE_EXTERNAL,
    getValidateError,
    ifObjectExist,
    type,
    validate,
    PRIORITY,
    getMomentObjFromServer,
    getDropDownCompanyDisplayData,
    getDropDownCompanyUser,
    generateReferenceNo,
    getDropDownDisplayData,
} from "@Utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInput, useNavigation, useDropDown, useKeyPress, useLoader } from "@Hooks";
import moment from "moment";

function AddSubTask() {


    const dispatch = useDispatch();
    const { goBack } = useNavigation();


    const { dashboardDetails, associatedCompaniesL, employees, departments, designations } = useSelector(
        (state: any) => state.UserCompanyReducer
    );
    const { selectedTask } = useSelector(
        (state: any) => state.TaskReducer
    );
    const loginLoader = useLoader(false);

    const title = useInput("");
    const description = useInput("");
    const referenceNo = useInput(generateReferenceNo());
    const [taskType, setTaskType] = useState(type[1]);
    const [disableTaskType, setDisableTaskType] = useState([]);
    const [photo, setPhoto] = useState<any>([]);
    const department = useDropDown({})
    const designation = useDropDown({})
    const company = useDropDown({})
    const [image, setImage] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedUserId, setSelectedUserId] = useState<any>();
    const selectedTicketPriority = useDropDown(PRIORITY[1]);
    const [date, setDate] = useState<any>(moment().format())
    const [eta, setEta] = useState("")


    const isEnterPressed = useKeyPress("Enter");

    useEffect(() => {
        if (isEnterPressed) {
            submitTaskHandler()
        }
    }, [isEnterPressed]);

    useEffect(() => {
        getAssociatedCompaniesApi();
        getDepartmentsApiHandler();
        getDesignationApiHandler()

    }, [])

    useEffect(() => {
        getCompanyEmployeeApi()
    }, [designation.value, department.value, company.value])
    useEffect(() => {
        getDepartmentsApiHandler();
        getDesignationApiHandler()

    }, [company.value])

    const getBranchId = () =>
        taskType?.id === type[1].id
            ? dashboardDetails?.permission_details?.branch_id
            : company?.value?.id

    function getCompanyEmployeeApi() {

        const params = {
            branch_id: getBranchId(),
            ...(department && { department_id: department?.value?.id }),
            ...(designation && { designation_id: designation?.value?.id })
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

    const getExternalCompanyStatus = () => ((taskType && taskType?.id === "2") || company.value?.id)

    const submitTaskHandler = () => {
        const params = {
            title: title?.value,
            description: description?.value,
            ...(referenceNo?.value && { reference_number: referenceNo?.value }),
            brand_branch_id: company?.value ? company?.value?.id : '',
            assigned_to_id: selectedUserId?.id,
            priority: selectedTicketPriority?.value?.id,
            task_attachments: [{ attachments: photo }],
            is_parent: false,
            eta_time: eta,
            parent_code: selectedTask
        };


        const validation = validate(taskType?.id === "1" ? CREATE_SUB_TASK_EXTERNAL : CREATE_SUB_TASK_INTERNAL, params);

        if (ifObjectExist(validation)) {
            loginLoader.show()
            dispatch(
                addTask({
                    params,
                    onSuccess: (response: any) => () => {
                        if (response.success) {
                            goBack();
                            dispatch(
                                setSelectedTaskCode(false)
                              )
                            loginLoader.hide()
                            showToast(response.message, "success");
                        }
                    },
                    onError: (error) => () => {
                        loginLoader.hide()

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

                        setDisableTaskType([]);

                    } else {
                        setTaskType(type[1]);
                        setDisableTaskType([type[0]] as never);
                    }
                },
                onError: () => () => {

                },
            })
        );
    }

    const handleEtaChange = (value: any) => {
        setEta(value);
        setDate(value)
    };


    return (
        <Card className="m-3">
            <div className='col'>
                <div className="row">
                    <Back />
                    <h3 className="ml-3">{translate("common.addSubTask")!}</h3>
                </div>
            </div>
            <hr className='mt-3'></hr>



            <div className="col-auto pb-2">
                <div className="row">
                    <ImagePicker
                        icon={image}
                        size='xl'
                        heading={translate("common.addAttachment")!}
                        noOfFileImagePickers={3}
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

            <div className="col-md-9 col-lg-5">
                <Input
                    heading={translate("common.title")}
                    value={title.value}
                    onChange={title.onChange}
                />

                <TextAreaInput
                    heading={translate('auth.description')!}
                    value={description.value}
                    onChange={description.onChange}
                    className="form-control form-control-sm"

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
                        placeHolder={'Select a company'}
                        data={getDropDownCompanyDisplayData(associatedCompaniesL)}
                        onChange={(item) => {
                            company.onChange(item)

                        }}
                        selected={company.value}
                    />
                )}

                {getExternalCompanyStatus() && (
                    <DropDown
                        heading={translate("common.department")!}
                        data={getDropDownDisplayData(departments)}
                        onChange={(item) => {
                            department.onChange(item)
                        }}
                        selected={department.value}
                    />
                )}
                {getExternalCompanyStatus() && (
                    <DropDown
                        heading={translate("auth.designation")}
                        data={getDropDownDisplayData(designations)}
                        onChange={(item) => {
                            designation.onChange(item)
                        }}
                        selected={designation.value}
                    />
                )}



                {getExternalCompanyStatus() && employees && employees.length > 0 &&
                    <AutoComplete
                        variant={'custom'}
                        heading={translate("common.user")!}
                        data={getDropDownCompanyUser(employees)}
                        selected={selectedUserId}
                        onChange={(item) => {
                            setSelectedUserId(item)

                        }}
                    />}


                <DateTimePicker
                    heading={translate("auth.eta")}
                    id="eta-picker"
                    placeholder={'Select ETA'}
                    type="both"
                    onChange={handleEtaChange}
                />
            </div>

            <div className="col mt-4">
                <Button
                    loading={loginLoader.loader}
                    text={translate("common.submit")}
                    onClick={submitTaskHandler}
                />
            </div>

        </Card >

    );
}

export { AddSubTask };
