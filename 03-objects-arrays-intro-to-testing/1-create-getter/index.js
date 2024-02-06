/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const keys = path.split('.');

  return function(obj) {
    let result = obj;
    try {
      for (const key of keys) {
        result = result[key];
      }
    } catch (error) {
      return undefined
    }
    return result;
  };
}
