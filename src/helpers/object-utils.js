/**
 * Removes properties from an object, keeping only the specified properties.
 * @param {object} objRef - The object from which properties should be removed.
 * @param {...string} toRemain - The properties to keep in the object.
 * @returns {void}
 */
export const removeProps = (objRef, ...toRemain) => {
  const keys = Object.keys(objRef);

  keys.forEach(key => {
    // Delete the property if it's not in the toRemain list
    if (!toRemain.includes(key)) {
      delete objRef[key];
    }
  });
};
