export const removeProps = (objRef, ...toRemain) => {
  // Get all keys of the object
  const keys = Object.keys(objRef);

  // Iterate through each key
  keys.forEach(key => {
    // Delete the property if it's not in the toRemain list
    if (!toRemain.includes(key)) {
      delete objRef[key];
    }
  });
};
