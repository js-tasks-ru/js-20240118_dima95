/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  const result = {};
  for (const item in obj) {
    if(!fields.includes(item)){
      result[item] = obj[item]
    }
  }
  return result;
};
