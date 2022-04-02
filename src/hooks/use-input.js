import { useState } from "react";

const useInput = (validateInput) => {
  // State
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  // drieven State
  const valueIsValid = validateInput(enteredValue);
  const hasError = !valueIsValid && isTouched;

  // Handler
  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const valueBlurHandler = (event) => {
    setIsTouched(true);
  };

  const resetInput = () => {
    setEnteredValue("");
    setIsTouched(false);
  };
  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    resetInput,
  };
};
export default useInput;
