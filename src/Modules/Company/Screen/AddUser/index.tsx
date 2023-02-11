import { useEffect } from "react";
import { useDispatch ,useSelector} from "react-redux";
import {
  HomeContainer,
  Input,
  DropDown,
  H,
  Button,
  showToast,
} from "@Components";
import {
  GENDER_LIST,
  ADD_USER_RULES,
  validate,
  ifObjectExist,
  getValidateError,
} from "@Utils";
import { useInput, useDropDown, useNavigation } from "@Hooks";
import { translate } from "@I18n";
import { addEmployee } from "@Redux";
import { Container } from "reactstrap";


function AddUser() {

  const { companyDetailsSelected  } = useSelector(
    (state: any) => state.AdminReducer
  );
  console.log(companyDetailsSelected ,"companyDetailsSelected---------adduserscreen ")


  const dispatch = useDispatch();
  const firstName = useInput("");

  const contactNumber = useInput("");
  const email = useInput("");
  const gender = useDropDown(GENDER_LIST[0]);
  const designation = useInput("");
  
  const {goBack} = useNavigation()

  const submitAddUserHandler = () => {
  
    const params = {
      branch_id: companyDetailsSelected.branch_id,
      first_name: firstName.value,
      mobile_number: contactNumber.value,
      email: email.value,
      gender: gender.value?.id,
      designation_name: designation.value,
    };

    const validation = validate(ADD_USER_RULES, {
      branch_id:companyDetailsSelected.branch_id,
      first_name: firstName.value,
      mobile_number: contactNumber.value,
      ...(email.value && {email: email.value}),
      gender: gender.value?.id,
      designation_name: designation.value,
    });
    console.log(validation,"vvvvvvvvvvvvv")

    if (ifObjectExist(validation)) {
      dispatch(
        addEmployee({
          params,
          onSuccess: () => {
            goBack()
          },
          onError: () => {},
        })
      );
    } else {
    
      showToast(getValidateError(validation));
    }
  };

  return (
    <>
      <HomeContainer isCard title={translate("common.addUser")!}>
        <div className="row mt--3">
          <div className="col-md-9 col-lg-7">
            <Input
              heading={translate("auth.name")}
              value={firstName.value}
              onChange={firstName.onChange}
            />
            <Input
              type={"number"}
              heading={translate("auth.contactNumber")}
              maxLength={10}
              value={contactNumber.value}
              onChange={contactNumber.onChange}
            />
            <Input
              heading={translate("auth.email")}
              value={email.value}
              onChange={email.onChange}
            />
            <DropDown
              heading={translate("auth.gender")}
              data={GENDER_LIST}
              value={gender.value}
               onChange={gender.onChange}
            
            />
            <Input
              heading={translate("auth.designation")}
              value={designation.value}
              onChange={designation.onChange}
            />
           
           <Container>
           </Container>
            
         
            
          </div>
        </div>
        <div className="row justify-content-end">
          <div className="col-md-6 col-lg-4  my-4">
            <Button
              block
              text={translate("common.submit")}
              onClick={submitAddUserHandler}
            />
          </div>
        </div>
      </HomeContainer>
    </>
  );
}
export { AddUser };
