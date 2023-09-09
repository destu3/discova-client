// Removes properties from an object, keeping only the specified properties.
export const removeProps = (objRef, ...toRemain) => {
  const keys = Object.keys(objRef);

  keys.forEach(key => {
    // Delete the property if it's not in the toRemain list
    if (!toRemain.includes(key)) {
      delete objRef[key];
    }
  });
};
