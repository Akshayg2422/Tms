export function ifObjectExist(value: object) {
  let is_valid = true;
  
  if (Object.keys(value).length !== 0) {
    is_valid = false;
  }
  return is_valid;
}


export function changeDropDownDataKey(arr: any) {
  if (arr && arr.length > 0) {
    return arr.map((elm: any) => ({ id: elm.id, text: elm.name }));
  }
}

export function convertToUpperCase(data: string) {
  let toUpperCase = data.charAt(0).toUpperCase() + data.slice(1);
  return toUpperCase
}
