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
    ImagePicker
} from "@Components";
import { translate } from "@I18n";
import {
    getEmployees,
    addTask,
    getDepartments,
    getDesignations,
    getAssociatedCompaniesL

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
} from "@Utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInput, useNavigation, useDropDown } from "@Hooks";
import AutoSearchInput from "@Components//Core/AutoSearchInput";
import moment from "moment";

function AddSubTask() {


    const dispatch = useDispatch();
    const { goBack } = useNavigation();


    const { dashboardDetails, departments, designations,associatedCompaniesL } = useSelector(
        (state: any) => state.UserCompanyReducer
    );
    const { selectedTask } = useSelector(
        (state: any) => state.TaskReducer
    );

    const title = useInput("");
    const description = useInput("");
    const referenceNo = useInput("");
    const [taskType, setTaskType] = useState(type[1]);
    const [disableTaskType, setDisableTaskType] = useState([]);
    const [companies, setCompanies] = useState([])
    const [companyUsers, setCompanyUsers] = useState([])
    const [photo, setPhoto] = useState<any>([]);
    const department = useDropDown({})
    const designation = useDropDown({})
    const company = useDropDown({})
    // const taskGroup = useDropDown({})
    // const [selectDropzone, setSelectDropzone] = useState<any>([{ id: "1" }]);
    const [image, setImage] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedUserId, setSelectedUserId] = useState<any>();
    // const [, setDesignations] = useState([])
    const selectedTicketPriority = useDropDown("");
    const [date, setDate] = useState<any>(moment().format())
    const [eta, setEta] = useState("")
    const [selectedNoOfPickers,setSelectNoOfPickers]=useState<any>()
    let attach = photo.slice(-selectedNoOfPickers)


    useEffect(() => {
        getAssociatedCompaniesApi();

    }, [])

    useEffect(() => {
        getCompanyEmployeeApi()
    }, [designation.value, department.value, company.value])

    const getBranchId = () =>
        taskType?.id === type[1].id
            ? dashboardDetails?.permission_details?.branch_id
            : company?.value?.id

    const handleImagePicker = ( file: any) => {
        let newUpdatedPhoto = [...photo, file];
        setPhoto(newUpdatedPhoto);
    };

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

    const submitTaskHandler = () => {
        const params = {
            title: title?.value,
            description: description?.value,
            reference_number: referenceNo?.value,
            brand_branch_id: company?.value ? company?.value?.id : '',
            assigned_to_id: selectedUserId?.id,
            priority: selectedTicketPriority?.value?.id,
            task_attachments: [{ attachments: attach }],
            is_parent: false,
            eta_time: eta,
            parent_id: selectedTask?.id
        };


        const validation = validate(taskType?.id === "1" ? CREATE_SUB_TASK_EXTERNAL : CREATE_SUB_TASK_INTERNAL, params);

        if (ifObjectExist(validation)) {
            dispatch(
                addTask({
                    params,
                    onSuccess: (response: any) => () => {
                        if (response.success) {
                            goBack();
                            showToast(response.message, "success");
                        }
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
                        // const displayCompanyDropdown = companies.map(each => {
                        //     const { id, display_name } = each
                        //     return {
                        //         id: id, text: display_name, name: display_name,
                        //     }
                        // })
                        // setCompanies(displayCompanyDropdown)
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


    const getExternalCompanyStatus = () => ((taskType && taskType?.id === "2") || company.value?.id)


    return (
        <Card className="m-3">
            <div className='col'>
                <div className="row">
                    <Back />
                    <h3 className="ml-3">{translate("common.addSubTask")!}</h3>
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
                        data={getDropDownCompanyDisplayData( associatedCompaniesL )}
                        onChange={(item) => {
                            company.onChange(item)
                        }}
                        selected={company.value}
                    />
                )}

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



                {getExternalCompanyStatus() && companyUsers && companyUsers.length > 0 && 
                <AutoSearchInput
                    heading={translate("common.user")!}
                    placeholder={'please select a user...'}
                    data={companyUsers}
                    variant={true}
                    onSelect={(item) => {
                        // setSelectedUser(item.name);
                        setSelectedUserId(item)
                    }}
                />
                }

                <DropDown
                    heading={translate("auth.Task Priority")!}
                    selected={selectedTicketPriority.value}
                    placeHolder={translate('order.please select a task priority')!}
                    data={PRIORITY}
                    onChange={selectedTicketPriority.onChange} />

                <DateTimePicker
                    heading={translate("auth.eta")}
                    id="eta-picker"
                    placeholder={'Select ETA'}
                    type="both"
                    onChange={handleEtaChange}
                    value={date ? getMomentObjFromServer(date) : null!}
                />
            </div>

        

            <div className="col-auto pb-2">
                <div className="row">
                <ImagePicker
                    icon={image}
                    size='xl'
                    heading={translate("common.addAttachment")!}
                    noOfFileImagePickers={4}
                    onSelect={(image) => {
                        let file =image.toString().replace(/^data:(.*,)?/, "")
                        handleImagePicker(file)
                       
                    
                    }}
                    onSelectImagePicker={(el)=>{
                        setSelectNoOfPickers(el?.length)

                    }}
                />

                </div>
              

            </div>

            <div className="col mt-4">
                <Button
                    text={translate("common.submit")}
                    onClick={submitTaskHandler}
                />
            </div>

        </Card >

    );
}

export { AddSubTask };
