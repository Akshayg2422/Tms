import React, { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button, Card, Divider, HomeContainer, NoDataFound, Spinner, Image, MenuBar, Modal, Input, DateTimePicker, Checkbox, MultiSelectDropDown, Dropzone, showToast, ImagePicker, TextAreaInput } from "@Components";
import { useInput, useLoader, useModal, useNavigation, useWindowDimensions } from "@Hooks";
import { ROUTES } from "@Routes";
import { translate } from "@I18n";
import { useSelector, useDispatch } from "react-redux";
import { MyFeedItem } from '@Modules'
import { addBroadCastMessages, getAssociatedCompanyBranch, getBroadCastMessages } from "@Redux";
import { CREATE_BROAD_CAST_EXTERNAL, CREATE_BROAD_CAST_INTERNAL, INITIAL_PAGE, getArrayFromArrayOfObject, getDisplayTimeDateMonthYearTime, getMomentObjFromServer, getPhoto, getValidateError, ifObjectExist, validate } from '@Utils'
import { icons } from "@Assets";

function AdminFeeds() {
  const { goTo } = useNavigation();
  const dispatch = useDispatch();
  const { height } = useWindowDimensions()
  const [loading, setLoading] = useState(false)
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
  const feedTitle = useInput('');
  const feedDescription = useInput("");
  const [internalCheck, setInternalCheck] = useState(false)
  const [externalCheck, setExternalCheck] = useState(false)
  const [isExternalDisable, setExternalDisable] = useState(false)
  const [selectedNoOfPickers, setSelectedNoOfPickers] = useState<any>()
  const [selectedFeed, setSelectedFeed] = useState<any>(undefined)

  const deleteFeedModal = useModal(false)

  const editFeedModal = useModal(false)
  const loginLoader = useLoader(false)


  let attachmentEdit = selectDropzone && selectDropzone.map((el, index) => {
    const { id, attachment_file } = el
    return {
      id: index + 1, photo: attachment_file,
    }

  })

  const MY_FEED_MENU = [
    {
      id: 0, name: translate('common.Edit'), icon: icons.edit,
    },
    {
      id: 1, name: translate('common.delete'), icon: icons.deleteCurve,
    }
  ]


  useEffect(() => {
    getBroadCastMessage(INITIAL_PAGE)
  }, []);

  function getBroadCastMessage(page_number: number) {
    setLoading(true)
    const params = {
      id: user_details?.id,
      page_number
    };
    dispatch(
      getBroadCastMessages({
        params,
        onSuccess: () => () => {
          setLoading(false)
        },
        onError: () => () => {
          setLoading(false)
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

  function proceedDeleteHandler() {
    const params = {
      id: selectedFeed?.id,
      is_deleted: true
    }
    loginLoader.show()
    dispatch(
      addBroadCastMessages({
        params,
        onSuccess: (response: any) => () => {
          if (response.success) {
            loginLoader.hide()
            showToast(response.message, 'success')
            deleteFeedModal.hide()
            getBroadCastMessage(INITIAL_PAGE)

          }
        },
        onError: (error) => () => {
          loginLoader.hide()
          showToast(error.error_message)
        },
      })
    );

  }

  function proceedEditHandler() {
    const params = {
      id: selectedFeed?.id,
      title: feedTitle?.value,
      description: feedDescription?.value,
      ...(selectedCompanies.length > 0 && {
        applicable_branches: getArrayFromArrayOfObject(selectedCompanies, "key"),
      }),
      for_internal_company: internalCheck,
      for_external_company: externalCheck,
      broadcast_attachments: [{ attachments: photo }],
    };

    const validation = validate(externalCheck ? CREATE_BROAD_CAST_EXTERNAL : CREATE_BROAD_CAST_INTERNAL, params);

    if (ifObjectExist(validation)) {
      loginLoader.show()
      dispatch(
        addBroadCastMessages({
          params,
          onSuccess: (response: any) => () => {
            if (response.success) {
              showToast(response.message, 'success')
              editFeedModal.hide()
              loginLoader.hide()
              getBroadCastMessage(INITIAL_PAGE)

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


  }

  console.log("dropzone--.", selectDropzone)

  function proceedCreatePost() {
    goTo(ROUTES["message-module"]["create-broadcast"])
  }

  return (

    <>
      {broadCastDetails && broadCastDetails.length > 0 ?
        <div className="col-7 d-flex justify-content-end mt-3 ml-4">
          <Button
            text={translate("order.CREATE POST")}
            className="text-white"
            size={"sm"}
            onClick={proceedCreatePost}
          />
        </div> : null}
      {
        loading && (
          <div className="d-flex justify-content-center align-item-center" style={{ minHeight: '200px', marginTop: '250px' }}>
            <Spinner />
          </div>
        )
      }
      
      {broadCastDetails && broadCastDetails.length > 0 ?
        <InfiniteScroll
          dataLength={broadCastDetails.length}
          hasMore={broadCastCurrentPage !== -1}
          className={'overflow-auto overflow-hide mt-0 '}
          loader={<h4>
            <Spinner />
          </h4>}
          style={{ overflowY: "auto"}}
          next={() => {
            if (broadCastCurrentPage !== -1) {
              getBroadCastMessage(broadCastCurrentPage)
            }
          }
          }
        >
          <div className={''} >
            {
              broadCastDetails?.map((item: any, index: number) => {
                return (
                  <div key={index} >
                    <Card className={'shadow-none border m-3 col-7 mt-4 mb--2'}>
                      <div className="row d-flex justify-content-end ">
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
                              setSelectDropzone(attachments)
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

      <Modal title={translate("product.Edit Feed")!} size={'lg'} isOpen={editFeedModal.visible} onClose={editFeedModal.hide}  >

        <div className="col-md-9 col-lg-7">
          <Input
            heading={translate("common.title")}
            value={feedTitle.value}
            onChange={feedTitle.onChange}
          />
          <TextAreaInput
            heading={translate('auth.description')!}
            value={feedDescription.value}
            onChange={feedDescription.onChange}
            className="form-control form-control-sm"
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

        <div className="col-auto pb-2  mt--4">
          <div className="row">
            <ImagePicker
              defaultPicker={true}
              defaultValue={attachmentEdit}
              noOfFileImagePickers={3}
              size='xl'
              heading={translate("auth.attach")!}
              onSelect={(image) => { }}
              onSelectImagePickers={(el) => {
                let array: any = []

                for (let i = 0; i <= el.length; i++) {

                  let editPickers = el[i]?.base64?.toString().replace(/^data:(.*,)?/, "")
                  if (editPickers !== undefined) {
                    array.push(editPickers)
                  }
                }
                setPhoto(array)
              }}
            />
          </div>
        </div>

        <div className="row justify-content-end">
          <div className="col-md-6 col-lg-4 ">
            <Button
              block
              loading={loginLoader.loader}
              text={translate('order.Update')}
              onClick={proceedEditHandler}
            />
          </div>
        </div>

      </Modal>
      <Modal isOpen={deleteFeedModal.visible} size="md" onClose={deleteFeedModal.hide}>
        <div>
          <div className="h4"> Are you sure you want to delete? </div>
          <div className="row d-flex justify-content-end">
            <Button text={translate('common.delete')}
              loading={loginLoader.loader}
              onClick={proceedDeleteHandler} />
          </div>
        </div>
      </Modal>
    </>

  )
}

export { AdminFeeds }


