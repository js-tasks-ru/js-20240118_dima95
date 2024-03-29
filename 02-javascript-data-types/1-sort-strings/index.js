/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const sortedArray = [...arr].sort((a, b) => {
    const comparisonResult = a.localeCompare(b, ['ru', 'en'], { caseFirst: 'upper' });

    if (param === 'asc') {
      return comparisonResult;
    }
    if (param === 'desc') {
      return -comparisonResult;
    }
  });

  return sortedArray;
}
