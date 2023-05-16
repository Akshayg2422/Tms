import {
    Button,
    HomeContainer,
    Input,
    Checkbox,
    Dropzone,
    showToast,
    MultiSelectDropDown,
    Back,
    DateTimePicker
} from "@Components";
import { translate } from "@I18n";
import { getAssociatedCompanyBranch, addEvent } from "@Redux";
import {
    getValidateError,
    ifObjectExist,
    validate,
    getArrayFromArrayOfObject,
    getMomentObjFromServer,
    getServerTimeFromMoment,
    ADD_EVENT_EXTERNAL_RULES,
    ADD_EVENT_INTERNAL_RULES
} from "@Utils";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useInput, useNavigation } from "@Hooks";


function AddEvent() {

    const dispatch = useDispatch();
    const { goBack } = useNavigation();
    const [modifiedCompanyDropDownData, setModifiedCompanyDropDownData] = useState();
    const [photo, setPhoto] = useState<any>([]);
    const [selectedCompanies, setSelectedCompanies] = useState<any>([]);
    const [selectDropzone, setSelectDropzone] = useState<any>([{ id: "1" }]);
    const [image, setImage] = useState("");
    const [startTime, setStartTime] = useState<any>("")
    const [endTime, setEndTime] = useState<any>("")
    const title = useInput("");
    const description = useInput("");
    const place = useInput("")
    const [internalCheck, setInternalCheck] = useState(true)
    const [externalCheck, setExternalCheck] = useState(false)
    const [isExternalDisable, setExternalDisable] = useState(false)



    const handleStartTimeEtaChange = (value: any) => {
        setStartTime(value)
    };

    const handleEndTimeEtaChange = (value: any) => {
        setEndTime(value)
    };


    let attach = photo.slice(-2, 4)

    const handleImagePicker = (index: number, file: any) => {
        let newUpdatedPhoto = [...photo, file];
        setPhoto(newUpdatedPhoto);
    };




    const submitAddEventHandler = () => {

        const params = {
            title: title?.value,
            place: place?.value,
            start_time: getServerTimeFromMoment(getMomentObjFromServer(startTime)),
            end_time: getServerTimeFromMoment(getMomentObjFromServer(endTime)),
            description: description?.value,
            ...(selectedCompanies.length > 0 && {
                applicable_branches: getArrayFromArrayOfObject(selectedCompanies, "key"),
            }),
            ...(internalCheck && { for_internal_company: true }),
            ...(externalCheck && { for_external_company: true }),
            event_attachments: [{ attachments: attach }],
        };

        const validation = validate(externalCheck ? ADD_EVENT_EXTERNAL_RULES : ADD_EVENT_INTERNAL_RULES, params);

        if (ifObjectExist(validation)) {
            dispatch(
                addEvent({
                    params,
                    onSuccess: (response: any) => () => {
                        if (response.success) {
                            console.log('came');

                            showToast(response.message, 'success')
                            goBack()
                        }
                    },
                    onError: (error) => () => {
                        showToast(error.error_message)
                    },
                })
            );
        } else {
            showToast(getValidateError(validation));
        }
    };

    useEffect(() => {
        const params = { q: "" };
        dispatch(
            getAssociatedCompanyBranch({
                params,
                onSuccess: (response: any) => () => {
                    getCompanyBranchDropdown(response.details);
                },
                onError: () => () => {

                },
            })
        );
    }, []);


    const getCompanyBranchDropdown = (details: any) => {
        let companies: any = [];

        if (details && details.length > 0) {
            details.forEach(({ id, display_name }) => {
                companies = [
                    ...companies,
                    { key: id, value: display_name, name: display_name },
                ];
            });
            setModifiedCompanyDropDownData(companies);
            setExternalDisable(false)

        } else {
            setExternalDisable(true)
        }

    }



    return (
        <div>
            <HomeContainer type={'card'} className="m-3">
                <div className='row mx-3 d-inline-flex justify-content-center'>
                    <Back />
                    <div className='ml-2 text-center'><h3>{'ADD EVENT'}</h3></div>
                </div>
                <hr className='mt-3'></hr>
                <div className="col-md-9 col-lg-7">
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
                        heading={'Place'}
                        value={place.value}
                        onChange={place.onChange}
                    />

                    <DateTimePicker
                        id="time-picker"
                        placeholder={'Start Time'}
                        type="both"
                        initialValue={startTime}
                        onChange={handleStartTimeEtaChange}
                    />

                    <DateTimePicker
                        id="time-picker"
                        placeholder={'end Time'}
                        type={'both'}
                        initialValue={endTime}
                        onChange={handleEndTimeEtaChange}
                    />

                    <div className="row col ">
                        <div className="pr-3">
                            <Checkbox
                                id={'1'}
                                disabled={isExternalDisable}
                                defaultChecked={externalCheck}
                                text={'External'}
                                onCheckChange={
                                    setExternalCheck
                                }
                            />
                        </div>
                        <Checkbox
                            id={'2'}
                            text={'Internal'}
                            defaultChecked={internalCheck}
                            onCheckChange={setInternalCheck}
                        />
                    </div>

                    {externalCheck && (
                        <MultiSelectDropDown
                            heading={translate("common.company")!}
                            options={modifiedCompanyDropDownData!}
                            displayValue={"value"}
                            onSelect={(item) => {
                                setSelectedCompanies(item);
                            }}
                            onRemove={(item) => {
                                setSelectedCompanies(item);
                            }}
                        />
                    )}

                </div>


                <div className="col">
                    <label className={`form-control-label`}>
                        {translate("auth.attach")}
                    </label>
                </div>

                <div className="col-md-9 col-lg-7 pb-4 ">
                    {selectDropzone &&
                        selectDropzone.map((el: any, index: number) => {
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
                    <div className="col-md-6 col-lg-4 ">
                        <Button
                            block
                            text={translate("common.submit")}
                            onClick={submitAddEventHandler}
                        />
                    </div>
                </div>
            </HomeContainer>
        </div>
    );
}

export { AddEvent };
