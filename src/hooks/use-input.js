import { useState, useReducer } from "react";

const intialInputState = {
  value: "",
  isTouched: false,
};
const intialStateReducer = (state, action) => {
  switch (action.type) {
    case "INPUT":
      return {
        ...state,
        value: action.value,
      };
    case "BLUR":
      return {
        ...state,
        isTouched: true,
      };
    case "RESET":
      return {
        ...state,
        value: "",
        isTouched: false,
      };
    default:
      return intialInputState;
  }
  // return intialInputState;
};

const useInput = (validateInput) => {
  const [inputState, dispatch] = useReducer(
    intialStateReducer,
    intialInputState
  );

  // State
  // const [enteredValue, setEnteredValue] = useState("");
  // const [isTouched, setIsTouched] = useState(false);

  // drieven State
  const valueIsValid = validateInput(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  // Handler
  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
    // setEnteredValue(event.target.value);
  };

  const valueBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
    // setIsTouched(true);
  };

  const resetInput = () => {
    dispatch({ type: "RESET" });
    // setEnteredValue("");
    // setIsTouched(false);
  };
  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    resetInput,
  };
};
export default useInput;
