const ERRORS = {
  SOMETHING_WENT_WRONG: 'Something went wrong, please try again later',
  INVALID_REQUEST: 'Invalid Request',
};
const GENDER_LIST = [
  { id: 'M', title: 'Male' },
  { id: 'F', title: 'Female' },
  { id: 'O', title: 'Others' },
];
const DESIGNATION_LIST = [
  { id: 'true', title: 'Business Owner' },
  { id: 'false', title: 'Management' },
];


const TABLE_ELEMENT_TEXT_BUTTON = 1
const TABLE_ELEMENT_TEXT_STATUS = 2
const TABLE_ELEMENT_TEXT_IMAGE = 3
const TABLE_CONTENT_TYPE_REPORT = 1

function isExist(val: any) {
  return val ? val : ''
}

export const LANGUAGE_ENGLISH = 'EN';

export { ERRORS, TABLE_ELEMENT_TEXT_BUTTON, TABLE_ELEMENT_TEXT_STATUS, TABLE_ELEMENT_TEXT_IMAGE, TABLE_CONTENT_TYPE_REPORT, isExist };
