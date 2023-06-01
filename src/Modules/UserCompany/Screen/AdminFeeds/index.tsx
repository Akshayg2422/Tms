import React, { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button, Card, Divider, HomeContainer, NoDataFound, Spinner, Image, MenuBar, Modal, Input, DateTimePicker, Checkbox, MultiSelectDropDown, Dropzone, showToast, ImagePicker } from "@Components";
import { useInput, useModal, useNavigation, useWindowDimensions } from "@Hooks";
import { ROUTES } from "@Routes";
import { translate } from "@I18n";
import { useSelector, useDispatch } from "react-redux";
import { MyFeedItem } from "@Modules";
import { addBroadCastMessages, getAssociatedCompanyBranch, getBroadCastMessages } from "@Redux";
import { CREATE_BROAD_CAST_EXTERNAL, CREATE_BROAD_CAST_INTERNAL, INITIAL_PAGE, getArrayFromArrayOfObject, getDisplayTimeDateMonthYearTime, getMomentObjFromServer, getPhoto, getValidateError, ifObjectExist, validate } from '@Utils'
import { icons } from "@Assets";

function AdminFeeds() {
  const { goTo } = useNavigation();
  const dispatch = useDispatch();
  const { height } = useWindowDimensions()
  const { broadCastDetails, broadCastCurrentPage } = useSelector(
    (state: any) => state.CommunicationReducer
  );

  const { dashboardDetails } = useSelector(
    (state: any) => state.UserCompanyReducer
  );


  const { user_details } = dashboardDetails
  const [modifiedCompanyDropDownData, setModifiedCompanyDropDownData] = useState();
  const [photo, setPhoto] = useState<any>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<any>([]);
  const [selectDropzone, setSelectDropzone] = useState<any>([{ id: "1" }]);
  const [image, setImage] = useState("");
  const feedTitle = useInput('');
  const feedDescription = useInput("");
  const [internalCheck, setInternalCheck] = useState(false)
  const [externalCheck, setExternalCheck] = useState(false)
  const [isExternalDisable, setExternalDisable] = useState(false)
  const [selectedNoOfPickers,setSelectedNoOfPickers]=useState<any>()
  const [selectedFeed, setSelectedFeed] = useState<any>(undefined)

  const deleteFeedModal = useModal(false)

  const editFeedModal = useModal(false)


  let AttachmentEdit = selectDropzone &&selectDropzone.map((el,index)=>{
  const {id,attachment_file}=el
  return {
   id:index+1, photo: attachment_file,
}

 })

 console.log(AttachmentEdit,"ppppp")

  const MY_FEED_MENU = [
    {
      id: 0, name: 'Edit', icon: icons.edit,
    },
    {
      id: 1, name: 'delete', icon: icons.deleteCurve,
    },
  ]


  useEffect(() => {
    getBroadCastMessage(INITIAL_PAGE)
  }, []);

  function getBroadCastMessage(page_number: number) {
    const params = {
      id: user_details?.id,
      page_number
    };
    dispatch(
      getBroadCastMessages({
        params,
        onSuccess: () => () => {
        },
        onError: () => () => {
        },
      })
    );
  }

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



  let attach = photo.slice(-selectedNoOfPickers)

  const handleImagePicker = ( file: any) => {
    let newUpdatedPhoto = [...photo, file];
    setPhoto(newUpdatedPhoto);
  };

  function proceedDeleteHandler() {
    const params = {
      id: selectedFeed?.id,
      is_deleted: true
    }

    dispatch(
      addBroadCastMessages({
        params,
        onSuccess: (response: any) => () => {
          if (response.success) {
            showToast(response.message, 'success')
            deleteFeedModal.hide()
            getBroadCastMessage(INITIAL_PAGE)

          }
        },
        onError: (error) => () => {
          showToast(error.error_message)
        },
      })
    );

  }

  console.log("image------>", image)


  function proceedEditHandler() {
    const params = {
      id: selectedFeed?.id,
      title: feedTitle?.value,
      description: feedDescription?.value,
      ...(selectedCompanies.length > 0 && {
        applicable_branches: getArrayFromArrayOfObject(selectedCompanies, "key"),
      }),
      ...(internalCheck && { for_internal_company: true }),
      ...(externalCheck && { for_external_company: true }),
      broadcast_attachments: [{ attachments: attach }],
    };

    console.log(JSON.stringify(params),"===---????")

    const validation = validate(externalCheck ? CREATE_BROAD_CAST_EXTERNAL : CREATE_BROAD_CAST_INTERNAL, params);

    // if (ifObjectExist(validation)) {
    //   dispatch(
    //     addBroadCastMessages({
    //       params,
    //       onSuccess: (response: any) => () => {
    //         if (response.success) {
    //           showToast(response.message, 'success')
    //           editFeedModal.hide()
    //           getBroadCastMessage(INITIAL_PAGE)


    //         }
    //       },
    //       onError: (error) => () => {
    //         showToast(error.error_message)
    //       },
    //     })
    //   );
    // } else {
    //   showToast(getValidateError(validation));
    // }


  }

  console.log("dropzone--.", selectDropzone)

  function proceedCreatePost() {
    goTo(ROUTES["message-module"]["create-broadcast"])
  }

  return (

    <>
      {broadCastDetails && broadCastDetails.length > 0 ?
        <div className="col-7 text-right my-1">
          <Button
            text={'CREATE POST'}
            className="text-white"
            size={"sm"}
            onClick={proceedCreatePost}
          />
        </div> : null}
      {broadCastDetails && broadCastDetails.length > 0 ?
        <InfiniteScroll
          dataLength={broadCastDetails.length}
          hasMore={broadCastCurrentPage !== -1}
          loader={<h4>
            <Spinner />
          </h4>}
          className={'overflow-auto overflow-hide'}
          style={{ overflowY: "auto" }}
          next={() => {
            if (broadCastCurrentPage !== -1) {
              getBroadCastMessage(broadCastCurrentPage)
            }
          }
          }>

          <div className={''} >
            {
              broadCastDetails?.map((item: any, index: number) => {
                return (
                  <div key={index}>
                    <Card className={'shadow-none border m-3 col-7 mt-4 mb--2'}>
                      <div className="row d-flex justify-content-end mt-3">
                        <MenuBar menuData={MY_FEED_MENU}
                          onClick={(element) => {
                            if (element.id === MY_FEED_MENU[0].id) {
                              editFeedModal.show()
                              setSelectedFeed(item)
                              const { title, attachments, description, created_by, created_at, applicable_branches, for_internal_company, for_external_company } = item
                              feedTitle.set(title)
                              feedDescription.set(description)
                              setInternalCheck(for_internal_company)
                              setExternalCheck(for_external_company)
                            //   AttachmentEdit = attachments &&attachments.map(el=>{
                            //    const {id,attachment_file}=el
                            //    return {
                            //     id: id, photo: attachment_file,
                            // }

                            //   })
                              setSelectDropzone(attachments)
                              console.log(attachments,"aattacchhmmm")


                              const updatedData = applicable_branches.map(item => {
                                return {
                                  key: item.id,
                                  name: item.register_name,
                                  value: item.register_name
                                }
                              })

                              setSelectedCompanies(updatedData)

                            } else if (element.id === MY_FEED_MENU[1].id) {
                              setSelectedFeed(item)
                              deleteFeedModal.show()
                            }
                          }}
                        />
                      </div>
                      <MyFeedItem key={item.id} item={item} />
                    </Card>
                  </div>
                );
              })}
          </div>

        </InfiniteScroll>
        : <div className="vh-100 d-flex d-flex align-items-center justify-content-center my-3">
          <NoDataFound buttonText={'create post'} onClick={proceedCreatePost} isButton />
        </div>
      }

      <Modal title={"Edit Feed "} size={'lg'} isOpen={editFeedModal.visible} onClose={editFeedModal.hide}  >

        <div className="col-md-9 col-lg-7">
          <Input
            heading={translate("common.title")}
            value={feedTitle.value}
            onChange={feedTitle.onChange}
          />
          <Input
            heading={translate("auth.description")}
            value={feedDescription.value}
            onChange={feedDescription.onChange}
          />

          <div className="row col ">
            <div className="pr-3">
              <Checkbox
                id={'1'}
                disabled={isExternalDisable}
                defaultChecked={externalCheck}
                text={'External'}
                onCheckChange={setExternalCheck}
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
              defaultValue={selectedCompanies}
              onSelect={(item) => {
                setSelectedCompanies(item);
              }}
              onRemove={(item) => {
                setSelectedCompanies(item);
              }}
            />
          )}

        </div>


        {/* <div className="col">
          <label className={`form-control-label`}>
            {translate("auth.attach")}
          </label>
        </div> */}

        {/* <div className="col-md-9 col-lg-7 pb-4 ">
          {selectDropzone &&
            selectDropzone.map((el: any, index: number) => {
              return (
                <Dropzone
                  variant="ICON"
                  icon={getPhoto(el?.attachment_file)}
                  size="xl"
                  onSelect={(image) => {
                    let file = image.toString().replace(/^data:(.*,)?/, "");
                    handleImagePicker(index, file);
                    setSelectDropzone([{ id: "1" }, { id: "2" }]);
                  }}
                />
              );
            })}
        </div> */}
           <div className="col-auto pb-2">
                <div className="row">
                <ImagePicker
                   defaultPicker={true}
                   defaultValue={AttachmentEdit}
                    size='xl'
                    heading= {translate("auth.attach")!}
                    noOfFileImagePickers={2}
                    onSelect={(image) => {
                        let file =image.toString().replace(/^data:(.*,)?/, "")
                        handleImagePicker(file)
                       
                    
                    }}
                    onSelectImagePicker={(el)=>{
                      setSelectedNoOfPickers(el?.length)

                    }}
                />

                </div>
              

            </div>

        



        <div className="row justify-content-end">
          <div className="col-md-6 col-lg-4 ">
            <Button
              block
              text={'Update'}
              onClick={proceedEditHandler}
            />
          </div>
        </div>


      </Modal>
      <Modal isOpen={deleteFeedModal.visible} size="md" onClose={deleteFeedModal.hide}>
        <div>
          <div className="h4"> Are you sure you want to delete? </div>
          <div className="row d-flex justify-content-end">
            <Button text={'Delete'} onClick={proceedDeleteHandler} />
          </div>
        </div>
      </Modal>
    </>

  )
}

export { AdminFeeds }


