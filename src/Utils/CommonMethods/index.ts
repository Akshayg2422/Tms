import {
  getPhoto,
} from "@Utils";


export function ifObjectExist(value: object) {
  let is_valid = true;

  if (Object.keys(value).length !== 0) {
    is_valid = false;
  }
  return is_valid;
}


export function ifObjectKeyExist(object: any, key: string) {
  return object["key"] !== undefined
}

export function changeDropDownDataKey(arr: any) {
  if (arr && arr.length > 0) {
    return arr.map((elm: any) => ({ id: elm.id, text: elm.name }));
  }
}

export function convertToUpperCase(data: any) {
  let toUpperCase = data && data.charAt(0).toUpperCase() + data.slice(1);
  return toUpperCase
}

export function getStatusFromCode(dashboardDetails: any, status: string) {
  const statusCodes: any = {};
  dashboardDetails && dashboardDetails?.status_code && dashboardDetails?.status_code.length > 0 &&
    dashboardDetails?.status_code.forEach((pair: any) => {
      const code = pair[0];
      const description = pair[1];
      statusCodes[code] = description;
    });

  return statusCodes[status];

}

export const ifObjectHasKey = (object: any, key: string) => {
  let isExist = false;
  if (object.hasOwnProperty(key)) {
    isExist = true;
  } else {
    isExist = false;
  }

  return isExist;
};

export const adminDate= true


export const getObjectFromArrayByKey = (array: any, key: string, value: any) => {
  return array?.find(item => {
    return item[key] === value;
  });
};

export function paginationHandler(type: 'next' | 'prev' | 'current', position: number) {
  let page = type === 'next' ? position + 1 : type === 'prev' ? position - 1 : position;
  return page;
}

export function getArrayFromArrayOfObject(data: Array<any>, key: string) {
  let modifiedArr: any = [];
  if (data && data.length > 0) {
    data.forEach((el: any) => { modifiedArr = [...modifiedArr, el[key]]; });
  }
  return modifiedArr;
}

export function capitalizeFirstLetter(string: any) {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
}

export function stringSlice(string: any, slice: number = 3) {
  return string.slice(0, slice)
}

export function stringSlices(string: any, slice: number = 35) {
  return string.slice(0, slice)
}

export function stringToUpperCase(string: any) {
  return string.toUpperCase();
}

export const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;

  const platform = navigator.platform;
  const regex = /\(([^)]+)\)/;
  const match = regex.exec(userAgent);
  let brand
  let model
  if (match && match.length > 1) {
    const deviceInfo = match[1].split(';');
    brand = deviceInfo[0].trim();
    model = deviceInfo[1].trim();
  }
  return { brand, model, platform }
}


export async function imagePickerConvertBase64(array) {
  const promises = array.map(async (each) => {
    let photo = await getPhoto(each.photo);
    const base64 = await fetch(photo)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise((res) => {
          reader.onloadend = () => {
            res(reader.result);
          }
        })
      })
    return {
      ...each,
      base64: base64
    };

  });

  return Promise.all(promises);
}


export const getCurrentDayAndDate = (date: any) => {
  const currentDate = new Date(date);
  const options: any = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  return currentDate.toLocaleDateString('en-US', options);
};

export function getDropDownDisplayData(data: any) {

  return data && data?.map((item: any) => {
    return {
      ...item,
      text: item.name
    }
  })
}

export function getDropDownCompanyDisplayData(data: any) {
  return data && data?.map((item: any) => {
    return {
      ...item,
      text: item.display_name
    }
  })
}


export function setDataCode(data: any) {
  return data && data?.map((item: any) => {
   
    return {
      ...item,
      title: item
    }
  })
}

export function getDropDownCompanyUser(data: any) {
  return data && data?.map((item: any) => {
    return {
      text: item.name,
      id: item.id,
      title: JSON.stringify({ designation: item?.designation?.name, department: item?.department?.name, image: getPhoto(item?.profile_image) }),
    }
  })
}



export const generateReferenceNo = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';

  let randomLetters = '';
  let randomNumbers = '';

  // Generate random letters
  for (let i = 0; i < 6; i++) {
    randomLetters += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  // Generate random numbers
  for (let i = 0; i < 4; i++) {
    randomNumbers += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  return randomLetters + randomNumbers;
};


// export const handleDataAvailable = (event: any) => {
//   if (event.data.size > 0) {
//     const audioBlob = new Blob([event.data], { type: 'audio/wav' });
//     const reader: any = new FileReader();
//     reader.onload = () => {
//       const base64Audio = reader.result.split(',')[1];
//       setAudioData(base64Audio)
//       getChatDetails(base64Audio, 'audio')
//     };
//     reader.readAsDataURL(audioBlob);
//   }
// };







