import {
    Button,
    HomeContainer,
    Input,
    Checkbox,
    Dropzone,
    showToast,
    MultiSelectDropDown,
    Back,
    DateTimePicker,
    ImagePicker,
    InputHeading,
    TextAreaInput
} from "@Components";
import { translate } from "@I18n";
import { getAssociatedCompanyBranch, addEvent } from "@Redux";
import {
    getValidateError,
    ifObjectExist,
    validate,
    getArrayFromArrayOfObject,
    // getMomentObjFromServer,
    // getServerTimeFromMoment,
    ADD_EVENT_EXTERNAL_RULES,
    ADD_EVENT_INTERNAL_RULES
} from "@Utils";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useInput, useKeyPress, useLoader, useNavigation } from "@Hooks";
import { useParams } from "react-router-dom";


function AddEvent() {

    const dispatch = useDispatch();
    const { goBack } = useNavigation();
    const { id } = useParams();
    const [modifiedCompanyDropDownData, setModifiedCompanyDropDownData] = useState();
    const [photo, setPhoto] = useState<any>([]);
    const [selectedCompanies, setSelectedCompanies] = useState<any>([]);
    // const [selectDropzone, setSelectDropzone] = useState<any>([{ id: "1" }]);
    // const [image, setImage] = useState("");
    const [startTime, setStartTime] = useState<any>("")
    const [endTime, setEndTime] = useState<any>("")
    const title = useInput("");
    const description = useInput("");
    const place = useInput("")
    const [internalCheck, setInternalCheck] = useState(true)
    const [externalCheck, setExternalCheck] = useState(false)
    const [isExternalDisable, setExternalDisable] = useState(false)
   
const loginLoader= useLoader(false)


    const handleStartTimeEtaChange = (value: any) => {
        setStartTime(value)
    };

    const handleEndTimeEtaChange = (value: any) => {
        setEndTime(value)
    };


 

    const isEnterPressed = useKeyPress("Enter");

    useEffect(() => {
      if (isEnterPressed) {
        submitAddEventHandler()
      }
    }, [isEnterPressed]);




    const submitAddEventHandler = () => {

        const params = {
            title: title?.value,
            place: place?.value,
            start_time: startTime,
            end_time: endTime,
            description: description?.value,
            ...(selectedCompanies.length > 0 && {
                applicable_branches: getArrayFromArrayOfObject(selectedCompanies, "key"),
            }),
            for_internal_company: internalCheck,
            for_external_company: externalCheck,
            event_attachments: [{ attachments: photo}],
        };

        const validation = validate(externalCheck ? ADD_EVENT_EXTERNAL_RULES : ADD_EVENT_INTERNAL_RULES, params);
        if (ifObjectExist(validation)) {
            loginLoader.show()
            dispatch(
                addEvent({
                    params,
                    onSuccess: (response: any) => () => {
                        if (response.success) {
                            console.log('came');
                            loginLoader.hide()

                            showToast(response.message, 'success')
                            goBack()
                        }
                    },
                    onError: (error) => () => {
                        showToast(error.error_message)
                        loginLoader.hide()
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
        <div className="m-3">
            <HomeContainer type={'card'}>
            <div className=" m-3">
        <div className={"col"}>
          <div className="row">
          <div ><Back /></div>
          <div className='ml-2 text-center'><h3>{translate('order.ADD EVENT')}</h3></div>
          </div>
        </div>
     
                
                <hr className='mt-2'></hr>
                <div className="col-md-9 col-lg-7">
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
                        heading={translate('order.Place')}
                        value={place.value}
                        onChange={place.onChange}
                    />

                    <DateTimePicker
                        id="time-picker"
                        placeholder={translate('order.Start Time')!}
                        type="both"
                        initialValue={startTime}
                        onChange={handleStartTimeEtaChange}
                    />

                    <DateTimePicker
                        id="time-picker"
                        // placeholder={'end Time'}
                        placeholder={translate('order.end Time')!}
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



                <div className="col-auto pb-2">
                <div className="row">
                <ImagePicker
                    size='xl'
                    heading= {translate("auth.attach")!}
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

                <div className="row justify-content-end">
                    <div className="mx-3">
                        <Button
    
                            text={translate("common.submit")}
                            onClick={submitAddEventHandler}
                            loading={loginLoader.loader}
                        />
                    </div>
                </div>

                </div>
            </HomeContainer>
        </div>
    );
}

export { AddEvent };
