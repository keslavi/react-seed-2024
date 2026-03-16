import _isEmpty from "lodash/isEmpty";

const customIsEmpty= (value, legacyBehavior=false)=>{
  if (legacyBehavior) return _isEmpty(value);

  const originalResult = _isEmpty(value);
  if (originalResult) return true;

  if (typeof value==='string' && value.trim() === '') return true;
  if (typeof value==='object' && Object.keys(value).length === 0) return true;
  
  // Recursive object check
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    const keys = Object.keys(value);
    if (keys.length === 0) return true;
    // Recursively check if all values are empty
    return keys.every(key => customIsEmpty(value[key]));
  }
  
  // Recursive array check
  if (Array.isArray(value)) {
    if (value.length === 0) return true;
    // Recursively check if all items are empty
    return value.every(item => customIsEmpty(item));
  }

  return false;
};

globalThis.isEmpty = customIsEmpty;

_.isEmpty = customIsEmpty;

export {customIsEmpty as isEmpty};
export default customIsEmpty;


