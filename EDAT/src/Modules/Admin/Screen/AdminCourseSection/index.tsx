import { icons } from "@Assets";
import { Breadcrumbs, Button, Card, CommonTable, DragAndReorder, Image, Input, Modal, Divider, NoRecordsFound, Dropzone } from '@Components';
import { useLoader, useModal, useNavigation } from '@Hooks';
import { translate } from '@I18n';
import { AdminNavbar, DropDownMenuArrow, ProgressTrackCard } from "@Modules";
import { fetchCourses, fetchCourseTopics, handleDndModal, otpLoginFailure, postGenericBatchCrudDetails, postGenericCrudDetails, settingCourseTopicName, settingCurrentCourse, settingCurrentCourseSection, settingDefaultCourse } from '@Redux';
import { ROUTES } from "@Routes";
import { getImageUrl, showToast, convertToUpperCase, filteredDescription } from '@Utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";


function AdminCourseSection() {

  const { goTo } = useNavigation()

  const dispatch = useDispatch();
  const modal = useModal(false)

  const { registeredCourses, courseTopics, dashboardDetails, isOpenDndModal, currentCourse, currentCourseSectionObject,defaultCourse } = useSelector(
    (state: any) => state.DashboardReducer
  );

  console.log("ooooooooooo=========---==oooooo", currentCourse);



  const { loginDetails } = useSelector((state: any) => state.AppReducer);

  const [defaultCard, setDefaultCard] = useState(false)

  const [courseTopicsParentData, setCourseTopicsParentData] = useState<any>([])
  const [courseTopicsParentChildData, setCourseTopicsParentChildData] = useState<any>()
  const [tableTitle, setTableTitle] = useState<any>(currentCourse[0]?.sections[0])
  const [modalTitle, setModalTitle] = useState('')
  const [addCourseSectionModal, setAddCourseSectionModal] = useState(false)
  const [addCourseTopicModal, setAddCourseTopicModal] = useState(false)
  const [addCourseTopicTasksModal, setAddCourseTopicTasksModal] = useState(false)

  const [currentCourseSection, setCurrentCourseSection] = useState(currentCourse[0]?.sections[0]?.id)
  const [currentCourseTopicParent, setCurrentCourseTopicParent] = useState<any>()
  const [dragAndReorderData, setDragAndReorderData] = useState([]);
  const [image, setImage] = useState<any>(null)
  const courseTopicLoader = useLoader(false)
  const ProgressTrackCardLoader = useLoader(false)
  const postGenericCrudDetailsLoader = useLoader(false)
  const courseSectionModalLoader = useLoader(false)
  const [currentEditItemId, setCurrentEditItemId] = useState<any>()
  const [currentDeleteItem, setCurrentDeleteItem] = useState<any>()
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteGenericCRUDParams, setDeleteGenericCRUDParams] = useState<any>()
  const [currentKey, setCurrentKey] = useState("")
  const [defaultSectionData, setDefaultSectionData] = useState(registeredCourses[0].sections)
  const [sectionData, setSectionData] = useState(currentCourse[0]?.sections)


  /**
   * Generic CRUD to add course details
   */
  const [addCourseDetails, setAddCourseDetails] = useState<any>({
    name: '', description: ''
  })


  useEffect(() => {

    dispatch(settingDefaultCourse(registeredCourses[0].sections))
    /**
     * initially data getting for course topics
     */

    if (currentCourseSectionObject) {
      getCourseTopics(currentCourseSectionObject)
      setCurrentCourseSection(currentCourseSectionObject)
    }
    else if (currentCourse[0]?.sections.length > 0) {
      getCourseTopics(currentCourse[0]?.sections[0])
      setCurrentCourseSection(currentCourse[0]?.sections[0])
    }
    else {
      dispatch(settingDefaultCourse(''))

      setCourseTopicsParentData([])
      setTableTitle('')
    }

  }, [currentCourse])


  const getCourses = () => {
    ProgressTrackCardLoader.showLoader()

    const params = {}
    dispatch(fetchCourses({
      params,
      onSuccess: (success: any) => {
        console.log("success=====>", success);
        // const currentSection

        dispatch(settingCurrentCourse(currentCourse))

        ProgressTrackCardLoader.hideLoader()
      },
      onError: (error: string) => {
        ProgressTrackCardLoader.hideLoader()
      },
    }))
  }


  const getCourseTopics = (item) => {
    console.log("222222222222222", item);

    setTableTitle(item)
    courseTopicLoader.showLoader()

    const params = {
      course_section_id: item?.id
    }


    dispatch(fetchCourseTopics({
      params,
      onSuccess: (success: any) => {
        console.log("xxxxxxxxxxx", success);

        courseTopicLoader.hideLoader()
        let isParentTopics = success.data.filter((el) => el.is_parent === true)
        setCourseTopicsParentData(isParentTopics)
        setDragAndReorderData(isParentTopics)
      },
      onError: (error: string) => {
        courseTopicLoader.hideLoader()
      },
    }))
  }

  const getCourseTopicsParentChild = (item: any) => {
    let childTopics = courseTopics.data.filter((el: any) => item.id === el.parent_id)
    setCourseTopicsParentChildData(childTopics)
    setModalTitle(item.name)
    if (childTopics) {
      modal.onChange(true)
    }
  }

  const normalizedParentData = (data: any) => {
    return data.map((el: any) => {
      let isChild = courseTopics.data.some((item) => item.parent_id === el.id)

      return {
        image:
          <Image
            variant={'rounded'}
            alt="..."
            src={el.thumbnail ? getImageUrl(el.thumbnail) : icons.defaultImage}
          />,
        concept: el.name,

        'Action': <div className="ml-3">{isChild ? <Image src={icons.dropDown} onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          getCourseTopicsParentChild(el)
          setCurrentCourseTopicParent(el)
        }} height={10} width={15} /> : ''}</div>,

        "":
          <Button size="sm" text={"Add Child"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentCourseTopicParent(el)
              setAddCourseTopicTasksModal(!addCourseTopicTasksModal)
            }}
          />,

        "  ": <><DropDownMenuArrow
          onAddClick={(e) => {
            // e.preventDefault();
            e.stopPropagation();
            setCurrentEditItemId(el.id)
            setAddCourseDetails({
              name: el.name, description: el.description
            })
            setImage(getImageUrl(el.thumbnail))
            el.is_parent ? setAddCourseTopicModal(!addCourseTopicModal) : setAddCourseTopicTasksModal(!addCourseTopicTasksModal)
          }
          }

          onDeleteClick={(e) => {
            // e.preventDefault();
            e.stopPropagation();
            setCurrentDeleteItem(el)
            setDeleteModal(!deleteModal)
            setDeleteGenericCRUDParams({ mq: "course__Topic", data: { id: el.id }, force_delete: true })
            setCurrentKey('Course Topic')
          }}
        />
        </>,

      };
    });
  };


  const breadCrumbsData: any = [
    { id: 1, title: 'Dashboard' },
    { id: 2, title: 'Admin Course / Javascript' },

  ]

  const validateInputFields = () => {
    if (!addCourseDetails?.name) {
      showToast('error', translate('course.nameCannotBeEmpty ')!)
      return false
    }
    else if (!addCourseDetails?.description) {
      showToast('error', translate('course.descriptionCannotBeEmpty ')!)
      return false
    }
    else {
      return true
    }
  }

  /**
   * Generic CRUD
   */

  const onSubmitCourseHandler = (params: { mq: string; data: any; }, key: string) => {
    if (validateInputFields()) {
      postGenericCrudDetailsLoader.showLoader()
      dispatch(postGenericCrudDetails({
        params,
        onSuccess: (success: any) => {
          showToast('success', success.message)
          setImage(null)
          postGenericCrudDetailsLoader.hideLoader()
          if (key === 'courseSection') {
            const params = {}
            dispatch(fetchCourses({
              params,
              onSuccess: (success: any) => {
                console.log("gggdfdf",success);
                dispatch(settingDefaultCourse(success[0].sections))
                // setDefaultSectionData(success[0].sections)
                let current = success.filter((item) => item.name === currentCourse[0].name)
                dispatch(settingCurrentCourse(current))
              },
              onError: (error: string) => {

              },

            }))

            setAddCourseDetails({
              name: "", description: ""
            })
            setCurrentEditItemId(undefined)
            setImage(null)
            setAddCourseSectionModal(false)
          }
          else if (key === 'courseTopic') {

            setAddCourseDetails({
              name: "", description: ""
            })
            setCurrentEditItemId(undefined)
            setImage(null)
            setAddCourseTopicModal(false)
            getCourseTopics(currentCourseSection)
          }
          else {

            setAddCourseDetails({
              name: "", description: ""
            })
            setCurrentEditItemId(undefined)
            setImage(null)
            modal.onChange(false)
            getCourseTopics(currentCourseSection)
            setAddCourseTopicTasksModal(false)
          }
        },
        onError: (error: string) => {
          console.log(error, "errrrrr");
          courseTopicLoader.hideLoader()
          postGenericCrudDetailsLoader.hideLoader()
          // showToast('error', error.)

        },
      }))
    }

  }

  const onDeleteHandler = (params: any, key: string) => {

    courseSectionModalLoader.showLoader()
    dispatch(postGenericCrudDetails({
      params,
      onSuccess: (success: any) => {
        courseSectionModalLoader.hideLoader()
        showToast('success', success.message)
        setImage(null)

        if (key === "Course Section") {

          const params = {}
          dispatch(fetchCourses({
            params,
            onSuccess: (success: any) => {
              let current = success.filter((item) => item.name === currentCourse[0].name)
              dispatch(settingCurrentCourse(current))

            },
            onError: (error: string) => {

            },

          }))
          dispatch(settingCurrentCourseSection(''))
          getCourseTopics(currentCourse[0]?.sections[0])
          setCurrentCourseSection(currentCourse[0]?.sections[0])
          setAddCourseSectionModal(false)
          setDeleteModal(false)

        }
        else if (key === 'Course Topic') {

          setDeleteModal(false)
          setAddCourseTopicModal(false)
          getCourseTopics(currentCourseSection)
        }
        else {

          modal.onChange(false)
          setDeleteModal(false)
          getCourseTopics(currentCourseSection)
          setAddCourseTopicTasksModal(false)
        }
      },
      onError: (error: string) => {
        courseSectionModalLoader.hideLoader()
      },
    }))

  }

  const onChangeHandler = (e) => {
    setAddCourseDetails({ ...addCourseDetails, [e.target.name]: e.target.value })
  }


  function onSubmitDnd(params: any, key: string) {
    courseSectionModalLoader.showLoader()
    dispatch(postGenericBatchCrudDetails({
      params,
      onSuccess: (success: any) => {
        if (key === 'courseSection') {
          courseSectionModalLoader.hideLoader()
          showToast('success', success.message)
          dispatch(handleDndModal(true))
          
          dispatch(fetchCourses({
            params,
            onSuccess: (success: any) => {
              let current = success.filter((item) => item.name === currentCourse[0].name)
              dispatch(settingCurrentCourse(current))
            },
            onError: (error: string) => {

            },

          }))
        }
        else if (key === 'courseTopic') {
          courseSectionModalLoader.hideLoader()
          showToast('success', success.message)
          dispatch(handleDndModal(true))
          getCourseTopics(currentCourseSection)
        }
        else {
          modal.onChange(!modal.visible)
          courseSectionModalLoader.hideLoader()
          showToast('success', success.message)
          dispatch(handleDndModal(false))
          getCourseTopics(currentCourseSection)

        }

      },
      onError: (error: string) => {
        courseSectionModalLoader.hideLoader()
        dispatch(handleDndModal(true))
      }
    }))
  }


  return (
    <>
      <AdminNavbar userName={dashboardDetails?.user_details?.name} userProfile={dashboardDetails?.user_details?.photo} />
      <div className="container-fluid  pb-6" >
        <div className="py-4">
          {/* <div className="col " >
            <h6 className="h2 d-inline-block mb-0">Alternative</h6>
            <Breadcrumbs
              items={breadCrumbsData}
              listClassName={'breadcrumb-links'}
              className="d-none d-md-inline-block ml-md-4"
              icons={'fas fa-home'}
              link={'/dashboard'}
              onButtonClick={() => {
                goTo('/dashboard' + ROUTES.ADMIN.ASSIGN_COURSE_STUDENTS)
              }}
            />
          </div> */}
          {dashboardDetails?.user_details?.is_faculty && (
            <div className='text-right' >
              <Button
                size={'sm'}
                text={'Assign Course'}
                onClick={() => { goTo('/dashboard' + ROUTES.ADMIN.ASSIGN_COURSE_STUDENTS) }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="mt--6 container-fluid">
        <div className=" flex-column flex-xl-row">
          <div className="row d-flex" >
            <div className="col-sm-8 order-1">
              <Card className="p-0" style={{ height: '75vh' }}>
                <div className="row">
                  <div className="col-sm-8 ">
                    <h2 className="h3 ">{tableTitle?.name}</h2>
                    <h5 className="mt--2 text-muted ">{filteredDescription(tableTitle?.description || '')}</h5>
                    {tableTitle && <h6 className="text-muted ls-1 mt--2">
                      {`${courseTopicsParentData?.length}/${courseTopicsParentData?.length} ${courseTopicsParentData?.length > 1 ? 'Topics' : 'Topic'}`}
                    </h6>}

                  </div>
                  <div className="col">
                    <div className=" float-right d-flex ">
                      <DragAndReorder
                        title={translate('course.courseSectionTopic')!}
                        isDndModalOpen={isOpenDndModal}
                        dndData={dragAndReorderData}
                        onSubmitClick={(topic) => {
                          const params = {
                            mq: "course__Topic",
                            data: topic
                          }
                          // console.log("paramsssss--->", params);
                          onSubmitDnd(params, "courseTopic")
                        }}
                      />

                      <Button
                        className="btn float-right ml-0"
                        color="primary"
                        href="#pablo"
                        onClick={() => {
                          setAddCourseTopicModal(!addCourseTopicModal)
                        }}
                        size="sm"
                        text={translate('course.add')}
                      />
                    </div>

                  </div>
                </div>

                {courseTopicsParentData && courseTopicsParentData?.length > 0 ?
                  <div className=" overflow-auto scroll-hidden mt--2" style={{ height: '60vh', marginLeft: '-39px', marginRight: '-39px' }}>
                    <CommonTable
                      isLoading={courseTopicLoader.loader}
                      displayDataSet={normalizedParentData(courseTopicsParentData)}
                      tableOnClick={(e, index, item) => {

                        e.stopPropagation();
                        dispatch(settingCourseTopicName(courseTopicsParentData[index]))
                        goTo('/dashboard' + ROUTES.HOME.ADMIN_TOPIC_SECTION, false)
                      }}
                    />
                  </div>
                  :
                  <div className=" d-flex justify-content-center align-items-center" style={{
                    height: "65.2vh"
                  }}>

                    <NoRecordsFound />
                  </div>
                }
              </Card>

            </div>

            <div className="col-sm-4 order-2  ">
              {/* {!defaultCard && currentCourse?.length < 1 && (
                <Card style={{ height: '75vh' }}>
                  <div className=" d-flex justify-content-center align-items-center" style={{
                    height: '75vh'
                  }}>

                    <NoRecordsFound />
                  </div>
                </Card>
              )} */}
              {registeredCourses && registeredCourses?.length > 0 &&
                <ProgressTrackCard
                  isImage
                  title={convertToUpperCase(currentCourse[0]?.name || registeredCourses[0].name)}
                  isLoading={ProgressTrackCardLoader.loader}
                  headerButton={translate('course.add')!}
                  data={currentCourse.length > 0 ? currentCourse[0]?.sections : defaultCourse}
                  taskCompletionRatio={`${currentCourse[0]?.sections?.length || defaultCourse?.length}/${currentCourse[0]?.sections?.length || defaultCourse?.length}`}
                  ClassName={'pl-0 '}
                  completionRatioText={currentCourse[0]?.sections?.length > 1 ? 'Sections' : 'Section'}
                  isDndModalOpen={isOpenDndModal}
                  isDropDownMenuArrow={true}
                  onClick={(item) => {
                    dispatch(settingCurrentCourseSection(item))
                    setCurrentCourseSection(item)
                    getCourseTopics(item)
                  }}
                  onAddClick={() => {
                    setAddCourseSectionModal(true)
                  }}
                  dropDownClick={(item) => {
                    setCurrentEditItemId(item.id)
                    setAddCourseDetails({
                      name: item.name, description: item.description
                    })
                    setImage(getImageUrl(item.thumbnail))
                    setAddCourseSectionModal(true)
                  }}
                  dropDownDeleteClick={(item) => {
                    setCurrentDeleteItem(item)
                    setDeleteGenericCRUDParams({ mq: "course__CourseSection", data: { id: item.id }, force_delete: true })
                    setCurrentKey("Course Section")
                    setDeleteModal(!deleteModal)

                  }}
                  dndData={currentCourse.length > 0 ? currentCourse[0]?.sections : defaultCourse}
                  onSubmitDndClick={(course) => {
                    const params = {
                      mq: "course__CourseSection",
                      data: course
                    }
                    // console.log("paramsssss--->", params);

                    onSubmitDnd(params, "courseSection")
                  }}
                />
              }
              {/* {!currentCourse &&
                <Card style={{ height: '75vh' }}>
                  <div className=" d-flex justify-content-center align-items-center" style={{
                    height: '75vh'
                  }}>

                    <NoRecordsFound />
                  </div>
                </Card>
              } */}
            </div>
          </div>
        </div>
      </div>

      {/**
       * child dnd modal
       */}

      <Modal isOpen={modal.visible} onClose={() => modal.onChange(!modal.visible)} title={modalTitle} isHeaderChildren={

        <div className="text-right ml-9 pl-5">
          <DragAndReorder
            title={modalTitle}
            dndData={courseTopicsParentChildData}
            isDndModalOpen={isOpenDndModal}
            onSubmitClick={(topic) => {
              const params = {
                mq: "course__Topic",
                data: topic
              }
              // console.log("paramssssschilddd--->", params);

              onSubmitDnd(params, 'courseTopicChild')
            }}
          />
        </div>
      }
        size='lg'
      >
        {courseTopicsParentChildData && courseTopicsParentChildData?.length > 0 ?
          <div className=" overflow-auto" style={{ marginLeft: '-37px', marginRight: '-37px' }} >
            <CommonTable displayDataSet={normalizedParentData(courseTopicsParentChildData)}
              noHeader
            />
          </div>
          : <NoRecordsFound />}
      </Modal>

      {/* Generic CRUD Course section adding modal */}

      <Modal isModalLoading={postGenericCrudDetailsLoader.loader} isOpen={addCourseSectionModal} onClose={() => {
        setImage(null)
        setAddCourseSectionModal(!addCourseSectionModal)
        setAddCourseDetails({
          name: "", description: ""
        })
        setCurrentEditItemId(undefined)

      }} title={currentEditItemId ? 'Edit Course section' : translate('course.addCourseSection')!}>
        <div className="mt--4 pb-3">
          <h4>Select Image</h4>
          <Dropzone variant='ICON'
            icon={image}
            onSelect={(image) => {
              let encoded = image.toString().replace(/^data:(.*,)?/, '');
              setImage(encoded)
            }
            } />
        </div>
        <Input
          heading={translate('auth.name')}
          placeholder={translate('auth.name')!}
          value={addCourseDetails.name}
          name={'name'}
          onChange={(e) => onChangeHandler(e)}
        />
        <label className='form-control-label'>{translate('course.description')}</label>
        <textarea
          cols={5}
          name={'description'}
          value={addCourseDetails.description}
          className="form-control"
          placeholder={translate('course.typeHere')!}
          onChange={(e) => {
            onChangeHandler(e)
          }}
        />
        <div className="text-right mt-3">
          <Button onClick={() => {
            const params = {
              mq: "course__CourseSection",
              data: {
                name: convertToUpperCase(addCourseDetails.name),
                description: convertToUpperCase(addCourseDetails.description),
                order_sequence: currentCourse[0]?.sections.length + 1,
                course_id:currentCourse.length > 0 ? currentCourse[0]?.id: registeredCourses[0].id,
                ...(currentEditItemId && { id: currentEditItemId }),
                ...(image && { thumbnail: image }),
                // id: currentEditItemId
              }
            }
            console.log("paramsssorderrrs---------------->", params);
            onSubmitCourseHandler(params, 'courseSection')
          }} text={translate('common.submit')} size={'sm'} />
        </div>
      </Modal>
      {/* Generic CRUD Course section topic adding modal */}

      <Modal isOpen={addCourseTopicModal}
        isModalLoading={postGenericCrudDetailsLoader.loader}
        onClose={() => {
          setImage(null)
          setAddCourseTopicModal(!addCourseTopicModal)
          setAddCourseDetails({
            name: "", description: ""
          })
          setCurrentEditItemId(undefined)

        }}
        title={currentEditItemId ? 'Edit course section topic' : translate('course.addCourseSectionTopic')!}>
        <div className="mt--4 pb-3">
          <h4>Select Image</h4>
          <Dropzone
            variant='ICON'
            icon={image}
            onSelect={(image) => {
              let encoded = image.toString().replace(/^data:(.*,)?/, '');
              setImage(encoded)
            }
            } />
        </div>
        <Input
          heading={translate('auth.name')}
          placeholder={translate('auth.name')!}
          value={addCourseDetails.name}
          name={'name'}
          onChange={(e) => onChangeHandler(e)}
        />
        <label className='form-control-label'>{translate('course.description')}</label>
        <textarea
          cols={5}
          name={'description'}
          value={addCourseDetails.description}
          className="form-control"
          placeholder={translate('course.typeHere')!}
          onChange={(e) => {
            onChangeHandler(e)
          }}
        />
        <div className="text-right mt-3">
          <Button onClick={() => {

            const params = {
              mq: "course__Topic",
              data: {
                tag: 'JS',
                name: convertToUpperCase(addCourseDetails.name),
                description: convertToUpperCase(addCourseDetails.description),
                course_id: currentCourse.length > 0 ? currentCourse[0]?.id: registeredCourses[0].id,
                course_section_id: currentCourseSection?.id,
                is_parent: true,
                ...(image && { thumbnail: image }),
                ...(currentEditItemId && { id: currentEditItemId })
              }
            }

            if (currentCourse[0]?.sections.length > 0 || registeredCourses[0].sections.length > 0) {
              onSubmitCourseHandler(params, 'courseTopic')
            }
            else {
              showToast('info', 'Please add atleast one Course Section')
              setAddCourseDetails({
                name: null, description: null
              })
              setAddCourseTopicModal(!addCourseTopicModal)
            }

          }} text={translate('common.submit')} size={'sm'} />
        </div>
      </Modal>

      {/* Generic CRUD Course section Topics Tasks adding modal */}

      <Modal isOpen={addCourseTopicTasksModal}
        isModalLoading={postGenericCrudDetailsLoader.loader}
        onClose={() => {
          setImage(null)
          setAddCourseTopicTasksModal(!addCourseTopicTasksModal)
          setAddCourseDetails({
            name: "", description: ""
          })
          setCurrentEditItemId(undefined)

        }}
        title={translate('course.addCourseSectionTopic')!} >
        <div className="mt--5 ml--1">
          <h5 >{'Under  ' + currentCourseTopicParent?.name}</h5>
        </div>
        <div className=" pb-3">
          <h4>Select Image</h4>
          <Dropzone variant='ICON'
            icon={image}
            onSelect={(image) => {
              let encoded = image.toString().replace(/^data:(.*,)?/, '');
              setImage(encoded)
            }
            } />
        </div>
        <Input
          heading={translate('auth.name')}
          placeholder={translate('auth.name')!}
          value={addCourseDetails.name}
          name={'name'}
          onChange={(e) => onChangeHandler(e)}
        />
        <label className='form-control-label'>{translate('course.description')}</label>
        <textarea
          cols={5}
          name={'description'}
          value={addCourseDetails.description}
          className="form-control"
          placeholder={translate('course.typeHere')!}
          onChange={(e) => {
            onChangeHandler(e)
          }}
        />
        <div className="text-right mt-3">
          <Button onClick={() => {

            const params = {
              mq: "course__Topic",
              data: {
                tag: 'JS',
                name: convertToUpperCase(addCourseDetails.name),
                description: convertToUpperCase(addCourseDetails.description),
                course_id: currentCourse.length > 0 ? currentCourse[0]?.id: registeredCourses[0].id,
                course_section_id: currentCourseSection?.id,
                is_parent: false,
                parent_id: currentCourseTopicParent.id,
                ...(image && { thumbnail: image }),
                ...(currentEditItemId && { id: currentEditItemId })
              }
            }
            courseTopicLoader.showLoader()

            onSubmitCourseHandler(params, 'courseTopicTasks')
          }} text={translate('common.submit')} size={'sm'} />
        </div>
      </Modal>

      {/**
       * delete modal
       */}

      <Modal isOpen={deleteModal} onClose={() => { setDeleteModal(!deleteModal) }} title={`Do you want to delete the selected ${currentKey} ?`} titleClassname={'text-muted fw-light'}>
        <div className="mt--4 ml--1">
          <h2>{currentDeleteItem?.name}</h2>
        </div>

        <div className='text-right'>
          <Button
            color={'secondary'}
            text={translate('common.cancel')}
            onClick={() => { setDeleteModal(!deleteModal) }}
          />
          <Button

            text={'Proceed'}
            onClick={() => {
              onDeleteHandler(deleteGenericCRUDParams, currentKey)
            }}
          />
        </div>
      </Modal>
    </>
  );
}

export { AdminCourseSection };

