export function ifObjectExist(value: object) {
  let is_valid = true;
  
  if (Object.keys(value).length !== 0) {
    is_valid = false;
  }
  return is_valid;
}
