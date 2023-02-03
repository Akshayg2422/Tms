import { Back, Button, Card, CommonTable, NoRecordsFound } from '@Components';
import { useLoader, useNavigation } from '@Hooks';
import { fetchStudentCourseTasks } from '@Redux';
import { ROUTES } from '@Routes';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

function TopicSection() {

  const dispatch = useDispatch();
  const { goTo } = useNavigation()

  const { studentCourseTasks, courseTopicName } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const courseTaskLoader = useLoader(false)
  console.log("coursetaskssss--->", studentCourseTasks);


  useEffect(() => {

    courseTaskLoader.showLoader()
    const params = {
      course_topic_id: courseTopicName?.id
    }

    dispatch(fetchStudentCourseTasks({ 
      params,
    onSuccess:(success)=>{
      courseTaskLoader.hideLoader()
    },
    onError:(error)=>{
      courseTaskLoader.hideLoader()
    }
    }))
  }, [])

  const normalizedTaskData = (data: any) => {
    return data.map((el: any) => {
      return {
        concept: el.name,
        mandatory: <span className={`text-${el.is_manditory === true ? 'success' : 'danger'} mr-1`}>         ●</span>,
        "Status": <Button size="sm" text={"Start"} onClick={() => goTo('/dashboard' + ROUTES.HOME.LANDING, false)} />,

      };
    });
  };

  return (
    <>
      <div className='container-fluid p-2'>
        <div className='pb-3'>  <Back text={courseTopicName?.name} /></div>
        <Card className='overflow-auto scroll-hidden mt-0 ' style={{ height: '82.4vh' }}>
          {studentCourseTasks && studentCourseTasks?.length > 0 ?
            <div className=" overflow-auto " style={{ marginLeft: '-39px', marginRight: '-39px' }}>
              <CommonTable displayDataSet={normalizedTaskData(studentCourseTasks)} 
              isLoading={courseTaskLoader.loader}
              />
            </div>
            : <NoRecordsFound />
          }
        </Card>
      </div>
    </>
  )
}

export { TopicSection };
