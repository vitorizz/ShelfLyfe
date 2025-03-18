import React, { useState } from "react";

// Custom hook for toggling
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue(!value);
  return [value, toggle];
}
export default useToggle;
