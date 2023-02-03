import { CardStatus, ProgressTrackCard, AdminNavbar } from "@Modules";
import { Card, CommonTable, Button, NoRecordsFound, Image, Modal, Breadcrumbs } from '@Components'
import { fetchCourses, fetchCourseTopics, fetchStudentCourseSection, fetchStudentCourseTopics, settingCourseTopicName } from '@Redux';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { icons } from "@Assets";
import { useModal, useNavigation, useLoader } from '@Hooks'
import { ROUTES } from "@Routes";
import { translate } from '@I18n'
import { filteredDescription } from "@Utils";


const progressList = [
  {
    id: 1, img: 'https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-social-logo.png', imgHeading: 'tamil',
    progressMax: 100, progressValue: 20,
  },
  {
    id: 2, img: 'https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-social-logo.png', imgHeading: 'tamil',
    progressMax: 100, progressValue: 40
  },
  {
    id: 3, img: 'https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-social-logo.png', imgHeading: 'tamil',
    progressMax: 100, progressValue: 1
  },
  {
    id: 4, img: 'https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-social-logo.png', imgHeading: 'tamil',
    progressMax: 100, progressValue: 1
  }

]

function CourseSection() {

  const { goTo } = useNavigation()
  const dispatch = useDispatch();
  const modal = useModal(false)

  const { currentCourse, studentCourseTopics, studentCourseSection, dashboardDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );

  console.log("currentCoursecurrentCoursecurrentCourse", dashboardDetails);


  const { loginDetails } = useSelector((state: any) => state.AppReducer);


  const [courseTopicsParentData, setCourseTopicsParentData] = useState<any>()
  const [courseTopicsParentChildData, setCourseTopicsParentChildData] = useState<any>()
  const [tableTitle, setTableTitle] = useState<any>()
  const [modalTitle, setModalTitle] = useState('')
  const courseLoader = useLoader(false);
  const ProgressTrackCardLoader = useLoader(false)
  const courseTopicLoader = useLoader(false)


  useEffect(() => {

    if (currentCourse) {

      ProgressTrackCardLoader.showLoader()
      const params = {
        student_course_id: currentCourse[0].id
      }

      dispatch(fetchStudentCourseSection({
        params,
        onSuccess: (success: any) => {
          ProgressTrackCardLoader.hideLoader()
          getCourseTopics(success?.details[0])

        },

        onError: (error: string) => {
          ProgressTrackCardLoader.hideLoader()
        },
      }))
    }
    // if (studentCourseSection) {
    //   getCourseTopics(studentCourseSection[0])
    // }
  }, [])


  const getCourseTopics = (item) => {

    courseTopicLoader.showLoader()

    setTableTitle(item)
    const params = {
      course_section_id: item.id
    }

    dispatch(fetchStudentCourseTopics({
      params,
      onSuccess: (success: any) => {
        courseTopicLoader.hideLoader()
        console.log("course topicss===>", success);

        let isParentTopics = success.details.filter((el) => el.is_parent === true)
        setCourseTopicsParentData(isParentTopics)
      },
      onError: (error: string) => {
        courseTopicLoader.hideLoader()
      },
    }))
  }

  const getCourseTopicsParentChild = (item) => {
    let childTopics = studentCourseTopics.filter((el: any) => item.id === el.parent)
    console.log("child data==>", childTopics);

    setCourseTopicsParentChildData(childTopics)
    setModalTitle(item.name)
    if (childTopics) {
      modal.onChange(true)
    }
  }

  const normalizedParentData = (data: any) => {
    return data.map((el: any) => {
      let isChild = studentCourseTopics?.some((item) => item.parent === el.id)

      return {
        image: <Image
          variant={'rounded'}
          alt="..."
          src={icons.defaultImage}
        />,
        concept: el.name,
        "Status":
          <Button size="sm" text={el.completed ? translate('course.view') : translate('course.start')}
            onClick={() => {
              dispatch(settingCourseTopicName(el))
              goTo('/dashboard' + ROUTES.HOME.TOPIC_SECTION)
            }}
          />,
        "": <>{isChild ? <Image src={icons.dropDown} onClick={() => {
          getCourseTopicsParentChild(el)
        }} height={10} width={15} /> : ''}</>

      };
    });
  };
  const breadCrumsData: any = [
    { id: 1, title: 'Dashboard' },
    { id: 2, title: 'Course / Javascript' },

  ]
  return (
    <>
      <AdminNavbar userName={dashboardDetails?.user_details?.name} userProfile={dashboardDetails?.user_details?.photo} />
      <div className="container-fluid  pb-6 mb-0" >
        <div className="row align-items-center py-4">
          <div className="col-sm-6 " >
            <h6 className="h2 d-inline-block mb-0">Alternative</h6>
            <Breadcrumbs
              items={breadCrumsData}
              listClassName={'breadcrumb-links'}
              className="d-none d-md-inline-block ml-md-4"
              icons={'fas fa-home'}
              link={'/dashboard'}
            />
          </div>
        </div>
      </div>
      <div className="mt--6 container-fluid">
        {progressList && progressList?.length > 0 && <CardStatus data={progressList} onClick={() => { }} />}
        <div className=" flex-column flex-xl-row">
          <div className="row">
            <div className="col-sm-8 order-1">
              <Card isLoading={courseLoader.loader} className="p-0" style={{ height: '75.5vh' }}>
                <h2 className="h3">{tableTitle?.name || 'Topics'}</h2>
                <h5 className="mt--2 text-muted ">{filteredDescription(tableTitle?.description || '')}</h5>

                {tableTitle && <h6 className="text-muted ls-1 mt--2">
                  {`${courseTopicsParentData?.length}/${courseTopicsParentData?.length} ${courseTopicsParentData?.length > 1 ? 'Topics' : 'Topic'}`}
                </h6>}

                {courseTopicsParentData && courseTopicsParentData?.length > 0 ?
                  <div className=" overflow-auto scroll-hidden " style={{ height: '54vh', marginLeft: '-39px', marginRight: '-39px' }}>
                    <CommonTable displayDataSet={normalizedParentData(courseTopicsParentData)}
                      isLoading={courseTopicLoader.loader}
                    />
                  </div>
                  :
                  <div className=" d-flex justify-content-center align-items-center" style={{
                    height: "60.2vh"
                  }}>
                    <NoRecordsFound />
                  </div>
                }
              </Card>
            </div>
            <div className="col-sm-4 order-2" >

              {studentCourseSection && studentCourseSection?.length > 0 &&
                <ProgressTrackCard
                  isImage
                  title={studentCourseSection[0].name}
                  taskCompletionRatio={`${studentCourseSection.length}/${studentCourseSection.length}`}
                  completionRatioText={studentCourseSection.length > 1 ? 'Sections' : 'Section'}
                  isLoading={ProgressTrackCardLoader.loader}
                  data={studentCourseSection}
                  onClick={(item) => {
                    getCourseTopics(item)
                  }}
                />
              }
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={modal.visible} onClose={() => modal.onChange(false)} title={modalTitle} size={'lg'}>
        {courseTopicsParentChildData && courseTopicsParentChildData?.length > 0 ?
          <div className=" overflow-auto mt--5" style={{ marginLeft: '-39px', marginRight: '-39px' }} >
            <CommonTable displayDataSet={normalizedParentData(courseTopicsParentChildData)}
            />
          </div>
          : <NoRecordsFound />}
      </Modal>

    </>
  );
}

export { CourseSection };
