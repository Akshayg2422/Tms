import React, { useEffect, useState } from 'react'
import { useLoader, useNavigation } from '@Hooks'
import { Back, Button, Card } from '@Components'
import DropDown from '@Components//Core/DropDown'
import { useDispatch, useSelector } from "react-redux";
import { postGenericCrudDetails, fetchStudentsList, fetchFacultiesList, fetchCourses, fetchApproverList, fetchRefererList } from '@Redux';
import { showToast } from '@Utils';
import moment, { Moment, isMoment } from 'moment'
import { translate } from '@I18n'

function AssignCourseToStudents({isCourseNotAssigned}) {
console.log("namee---->",isCourseNotAssigned)
  const { goTo } = useNavigation()
  
  const { facultiesListData, studentsListData, registeredCourses, approverListData, refererListData, currentCourse } = useSelector(
    (state: any) => state.DashboardReducer
  );

  // console.log("11111111111222222", currentCourse[0].id);


  const dispatch = useDispatch()
  const [studentId, setStudentId] = useState('')
  const [facultyId, setFacultyId] = useState('')
  const [courseId, setCourseId] = useState("")
  const [approverId, setApproverId] = useState('')
  const [referrerId, setReferrerId] = useState('')
  const [text, setText] = useState('')
  const AssignCourseLoader = useLoader(false)


  let date = moment().format("YYYY-MM-DD")

  useEffect(() => {
    if (!studentsListData) {
      const params = {}
      dispatch(fetchStudentsList({
        params,
        onSuccess: (success: any) => {
        },
        onError: (error: string) => {
        },
      }))

    }
    if (!facultiesListData) {
      const params = {}
      dispatch(fetchFacultiesList({
        params,
        onSuccess: (success: any) => {
        },
        onError: (error: string) => {
        },
      }))
    }

    if (!approverListData) {
      const params = {}
      dispatch(fetchApproverList({
        params,
        onSuccess: (success: any) => {
        },
        onError: (error: string) => {
        },
      }))
    }

    if (!registeredCourses) {
      dispatch(fetchCourses({}))
    }
    if (!refererListData) {
      dispatch(fetchRefererList({}))
    }
  }, [])

  const onSubmitHandler = () => {
    AssignCourseLoader.showLoader()

    const params = {
      mq: "student__StudentCourse",
      data: {
        start_date: date,
        base_status: "ST",
        is_inprogress: true,
        employee_company_id: studentId,
        referrer_id: referrerId,
        faculty_id: facultyId,
        approver_id: approverId,
        course_id: courseId ? courseId : currentCourse[0]?.id //3f02e787-9aef-4e0f-b4d2-fe6ed7df2815
      }
    }

    dispatch(postGenericCrudDetails({
      params,
      onSuccess: (success: any) => {
        AssignCourseLoader.hideLoader()
        dispatch(fetchStudentsList({}))
        showToast('success', success.message)
      },
      onError: (error: string) => {
        AssignCourseLoader.hideLoader()
      },

    }))
  }
  // console.log("boolll--->",isCourseNotAssigned, "currentcourse-->",currentCourse[0].id,"iddddd", courseId);
  
  return (
    <div className='container-fluid '>
      <div className='mt-4'>
        {/* <Back text={'Assign course to students'} /> */}
        <h3>{'Assign Course to Student'} </h3>
      </div>
      <div className='mt-2'>
        <Card isLoading={AssignCourseLoader.loader}>

          <div className='pl-3 pr-3 mt-3'>
            <DropDown heading={'Student'} data={studentsListData}
              onChange={(e) => {
                setStudentId(e.target.value)
              }}
              placeholder={'Student'}
            />
          </div>
          <div className='pl-3 pr-3 mt-3'>
            <DropDown heading={'Course'}
              disabled = {isCourseNotAssigned? false : true}
              data={registeredCourses}
              value={isCourseNotAssigned ? courseId : currentCourse[0]?.id }
              onChange={(e) => {                
                setCourseId(isCourseNotAssigned ? e.target.value : currentCourse[0]?.id)
              }}
              placeholder={'Course'}
            />
          </div>
          <div className='pl-3 pr-3 mt-3'>
            <DropDown heading={'Faculty'} data={facultiesListData}
              onChange={(e) => {
                setFacultyId(e.target.value)
              }}
              placeholder={'Faculty'}
            />
          </div>
          <div className='pl-3 pr-3 mt-3'>
            <DropDown heading={'Approver'} data={approverListData}
              onChange={(e) => {
                setApproverId(e.target.value)
              }}
              placeholder={'Approver'}
            />
          </div>
          <div className='pl-3 pr-3 mt-3'>
            <DropDown heading={'Referrer'} data={refererListData}
              onChange={(e) => {
                setReferrerId(e.target.value)
              }}
              placeholder={'Referrer'}
            />
          </div>
          <div className='mt-3 pl-3 pr-3' >
            <label className='form-control-label'>{'Note'}</label>
            <textarea className="form-control"
              name={'Note'}
              onChange={() => setText(text)}
              placeholder={translate('course.typeHere')!} />
          </div>
          <div className='text-right mt-3 pr-3'>
            <Button text={translate('common.submit')}
              onClick={() => onSubmitHandler()}
            />
          </div>
        </Card>
      </div>
    </div>
  )
}
export { AssignCourseToStudents }