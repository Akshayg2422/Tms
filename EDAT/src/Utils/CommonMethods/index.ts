
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER } from '@Services';
import { icons } from '@Assets';


export const showToast = (type: 'success' | 'error' | 'default' | 'info', message: string) => {

  const style: object = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
  }

  let toastElement: string | number | null = null;
  switch (type) {
    case 'success':
      toastElement = toast.success(message, style)
      break;
    case 'error':
      toastElement = toast.error(message, style)
      break;
    case 'info':
      toastElement = toast.info(message, style)
      break;
    default:
      toastElement = toast(message, style)
      break;
  }

  return toastElement;
}

export function getImageUrl(url) {

  if (url) {
    if (url.substring(0, 5) === 'https') {
      return url
    }
    else {
      return SERVER + url
    }
  }
}

export function ifObjectExist(value: object) {
  let is_valid = true;
  console.log(Object.keys(value).length);

  if (Object.keys(value).length !== 0) {
    is_valid = false;
  }
  return is_valid;
}

export function convertToUpperCase(data: string) {
  // let toUpperCase = data.charAt(0).toUpperCase() + data.slice(1);
  return data
}

export const filteredDescription = (value: string) => {
  if (value.length > 57) {
    return value.substring(0, 57) + '...';
  }
  else {
    return value
  }
}

export const getObjectFromArrayByKey = (array: any, key: string, value: any) => {
  return array.find(item => {
    return item[key] === value;
  });
};
