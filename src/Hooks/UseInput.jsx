import React, { useState } from 'react';
function UseInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);
  const handleValueChange = ((event) => {
    setValue(event.target.value);
  });
  return [value, handleValueChange, setValue];
}
export default UseInput;