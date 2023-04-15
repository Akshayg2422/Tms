import {
    Button,
    DropDown,
    HomeContainer,
    Input,
    Radio,
    Dropzone,
    showToast,
    DateTimePicker,
    Image
} from "@Components";
import { translate } from "@I18n";
import {
    getEmployees,
    addTask,
    setIsSync,
    getAssociatedCompanyBranch,
    getTasks,
    getTaskGroup,
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
import { icons } from "@Assets";

function AddSubTask() {
    const dispatch = useDispatch();
    const { goBack } = useNavigation();

    const [typeSelect, setTypeSelect] = useState(type[0]);
    const [isSelect, setIsSelect] = useState(false);

    const { dashboardDetails, taskItem, getSubTaskId, getTaskGroupDetails } = useSelector(
        (state: any) => state.AdminReducer
    );
    const { isSync } = useSelector((state: any) => state.AppReducer);

    const [modifiedCompanyDropDownData, setModifiedCompanyDropDownData] =
        useState();
    const [photo, setPhoto] = useState<any>([]);
    const [companyUserDashboard, setCompanyUserDashboard] = useState<any>();
    const [selectedCompany, setSelectedCompany] = useState<any>({});
    const [selectDropzone, setSelectDropzone] = useState<any>([{ id: "1" }]);
    const [image, setImage] = useState("");

    const referenceNo = useInput("");
    const title = useInput("");
    const description = useInput("");
    const selectedUser = useDropDown("");
    const selectedTicketPriority = useDropDown("");
    const [eta, setEta] = useState("")
    const [selectGroup, setSelectGroup] = useState<any>('')
    const [showTaskGroup, setShowTaskGroup] = useState<any>([]);


    const handleImagePicker = (index: number, file: any) => {
        let newUpdatedPhoto = [...photo, file];
        setPhoto(newUpdatedPhoto);
    };



    const submitTaskHandler = () => {
        const params = {
            title: title?.value,
            description: description?.value,
            reference_number: referenceNo?.value,
            brand_branch_id: selectedCompany?.id || "",
            assigned_to_id: selectedUser?.value?.id,
            priority: selectedTicketPriority?.value?.id,
            task_attachments: [{ attachments: photo }],
            is_parent: false,
            eta_time: eta,
            parent_id: getSubTaskId ? getSubTaskId.id : taskItem?.id,
            group_id: selectGroup?.id
        };


        const validation = validate(typeSelect?.id === "1" ? CREATE_EXTERNAL : CREATE_INTERNAL, params);

        if (ifObjectExist(validation)) {
            dispatch(
                addTask({
                    params,
                    onSuccess: (response: any) => () => {
                        if (response.success) {
                            goBack();
                            showToast(response.message, "success");
                        }
                        dispatch(
                            setIsSync({
                                ...isSync,
                                issues: false,
                            })
                        );
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

    const getCompanyBranchDropdown = (details: any) => {


        let companies: any = [];

        if (details && details.length > 0) {
            details.forEach(({ id, display_name }) => {
                companies = [
                    ...companies,
                    { id: id, text: display_name, name: display_name },
                ];
            });

            setModifiedCompanyDropDownData(companies);
        } else {
            setTypeSelect(type[1]);
            setIsSelect(true);
        }
    };

    useEffect(() => {
        const params = { q: "" };
        dispatch(
            getAssociatedCompanyBranch({
                params,
                onSuccess: (response: any) => () => {
                    dispatch(
                        setIsSync({
                            ...isSync,
                            companies: false,
                        })
                    );
                    getCompanyBranchDropdown(response.details);

                },
                onError: () => () => {

                },
            })
        );
    }, []);

    useEffect(() => {
        const params = {
            branch_id:
                typeSelect?.id === "2"
                    ? dashboardDetails?.permission_details?.branch_id
                    : selectedCompany?.id || "",
        };

        dispatch(
            getEmployees({
                params,
                onSuccess: (response: any) => () => {
                    let companiesDashboard: any = [];
                    response?.details?.forEach(({ id, name }) => {
                        companiesDashboard = [...companiesDashboard, { id, text: name }];
                    });
                    setCompanyUserDashboard(companiesDashboard);
                },
                onError: (error) => () => {
                    setCompanyUserDashboard([]);
                },
            })
        );
    }, [typeSelect, selectedCompany]);

    const handleEtaChange = (value: any) => {
        setEta(value);
    };

    useEffect(() => {
        getTaskGroupList()
    }, [])


    const getTaskGroupList = () => {
        const params = {};

        dispatch(
            getTaskGroup({
                params,
                onSuccess: (response: any) => () => {
                    let subTaskGroupLists: any = [];
                    response?.details?.data?.forEach((item) => {
                        subTaskGroupLists = [...subTaskGroupLists, { ...item, text: item.name }]
                    })
                    setShowTaskGroup(subTaskGroupLists)
                },
                onError: (error: string) => () => { },
            })
        );
    };

    return (
        <div>
            <HomeContainer isCard >
                <div className='row col '>
                    <div
                        onClick={() => goBack()}
                    >
                        <Image
                            size={'sm'}
                            variant='rounded'
                            className='bg-white mt--1  pl-2'
                            src={icons.backArrow} />
                    </div>
                    <div className='pl-2'>  <h3>{translate("common.addSubTask")!}</h3>
                    </div>
                </div>
                <div className="col-md-9 col-lg-7">
                    <Input
                        heading={translate("auth.title")}
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
                    <div
                        onClick={() => {
                            isSelect &&
                                showToast("there is no associatedBranches in this company");
                        }}
                    >
                        <Radio
                            data={type}
                            selectItem={typeSelect}
                            disableId={isSelect ? type[1] : ""}
                            onRadioChange={(selected) => {
                                setSelectedCompany({});
                                if (selected) {
                                    setTypeSelect(selected);
                                }
                            }}
                        />
                    </div>

                    {typeSelect && typeSelect?.id === "1" && (
                        <DropDown
                            heading={translate("common.company")}
                            data={modifiedCompanyDropDownData}
                            onChange={setSelectedCompany}
                            selected={selectedCompany}
                        />
                    )}

                    <DropDown
                        selected={selectedUser.value}
                        heading={translate("common.user")}
                        data={companyUserDashboard}
                        onChange={selectedUser.onChange}
                    />
                    <DropDown
                        selected={selectedTicketPriority.value}
                        heading={translate("common.ticketPriority")}
                        data={PRIORITY}
                        onChange={selectedTicketPriority.onChange}
                    />
                    <DropDown
                        selected={selectGroup}
                        heading={translate("common.selectGroup")}
                        data={showTaskGroup}
                        onChange={setSelectGroup}
                    />
                    <DateTimePicker
                        id="eta-picker"
                        heading="ETA"
                        placeholder="Select ETA"
                        type="both"
                        onChange={handleEtaChange}
                    />
                </div>

                <div className="pl-3">
                    <label className={`form-control-label`}>
                        {translate("auth.attach")}
                    </label>
                </div>

                <div className="col-md-9 col-lg-7 pb-4 ">
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
                                        setSelectDropzone([{ id: "1" }, { id: "2" }]);
                                    }}
                                />
                            );
                        })}
                </div>

                <div className="row justify-content-end">
                    <div className="col-md-6 col-lg-4  my-4">
                        <Button
                            block
                            text={translate("common.submit")}
                            onClick={submitTaskHandler}
                        />
                    </div>
                </div>
            </HomeContainer>
        </div>
    );
}

export { AddSubTask };
