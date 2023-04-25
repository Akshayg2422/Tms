import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getTasks, getTaskItem, setIsSync, getSelectReferenceId, getAssociatedCompanyBranch, getSelectSubTaskId, getTaskGroup, getTaskGroupl } from "@Redux";
import { HomeContainer, Button, DropDown, InputHeading, Image, CommonTable, Priority, Status, NoDataFound, Badge, PageNation, Checkbox, Card } from "@Components";
import { useInput } from "@Hooks";
import { useNavigation, useDropDown } from "@Hooks";
import { HOME_PATH } from "@Routes";
import { translate } from "@I18n";
import { getPhoto, paginationHandler, STATUS_LIST, PRIORITY_DROPDOWN_LIST, SEARCH_PAGE, getMomentObjFromServer, COMPANY_TYPE, getDisplayDateTimeFromMoment, INITIAL_PAGE } from "@Utils";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { icons } from "@Assets";
import { TaskGroups, TaskFilter } from '@Modules'

function Tasks() {



  const [selectedTaskGroup, setSelectedTaskGroup] = useState({})
  const date = new Date();
  const time = date.getHours()

  const { goTo } = useNavigation();
  const { tasks, taskNumOfPages, taskCurrentPages } = useSelector((state: any) => state.AdminReducer);
  const dispatch = useDispatch();
  const { getTaskGrouplDetails } = useSelector((state: any) => state.CompanyReducer);
  const search = useInput("");
  const [subCheckBox, setSubCheckBox] = useState(false)
  // const filteredTasks = useDropDown(FILTERED_LIST[2])
  const taskStatus = useDropDown(STATUS_LIST[2])
  const taskPriority = useDropDown(PRIORITY_DROPDOWN_LIST[0])
  const companyType = useDropDown(COMPANY_TYPE[0])
  const { isSync } = useSelector((state: any) => state.AppReducer);
  const [modifiedCompanyDropDownData, setModifiedCompanyDropDownData] = useState();
  const [basicTag, setBasicTag] = useState(true)
  const [advanceTag, setAdvanceTag] = useState(false)
  const [selectTag, setSelectTag] = useState<any>([0])

  const getCompanyBranchDropdown = (details: any) => {

    let companies: any = [];
    companies.push({ id: '', text: '𝗦𝗘𝗟𝗙' })

    if (details && details.length > 0) {
      details.forEach(({ id, display_name }) => {
        companies = [
          ...companies,
          { id: id, text: display_name, name: display_name },
        ];
      });
      setModifiedCompanyDropDownData(companies);
    }
  };





  useEffect(() => {
    const params = {}
    dispatch(
      getTaskGroupl({
        params,
        onSuccess: (response: any) => () => {

        },
        onError: () => () => {
        },
      })
    )
  }, [])

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
    if (!isSync.tasks) {
      getTaskHandler(taskCurrentPages)
      // getTaskGroupPage(INITIAL_PAGE)
    }

  }, [isSync, subCheckBox])


  const getTaskHandler = (pageNumber: number) => {
    // const params = {
    //   q_many: search.value,
    //   tasks_by: filteredTasks?.value.id,
    //   task_status: taskStatus?.value.id,
    //   company: companyType.value.id,
    //   priority: taskPriority.value.id,
    //   page_number: pageNumber,
    //   group: selectTag?.id ? selectTag?.id : 'ALL',
    //   include_subtask: subCheckBox,
    // };

    // dispatch(
    //   getTasks({
    //     params,
    //     onSuccess: (response) => () => {
    //       setSyncTickets(true)

    //     },
    //     onError: () => () => { },
    //   })
    // );
  };








  return (
    <>
      <HomeContainer>
        <TaskGroups onClick={setSelectedTaskGroup} />
        <TaskFilter />
      </HomeContainer>
    </>
  );
}

export { Tasks };