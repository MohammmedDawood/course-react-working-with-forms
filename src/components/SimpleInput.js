import React, { useState } from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredValue,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    resetInput: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  // Email State
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailWasTouched, setEnteredEmailWasTouched] = useState(false);

  // Email dreiven State
  const enteredEmailIsValid = enteredEmail.includes("@");
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailWasTouched;

  let formIsValid = false;
  if (!nameInputHasError && enteredEmailIsValid) {
    formIsValid = true;
  }

  //Email Handler
  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const emailInputBlurHandler = (event) => {
    setEnteredEmailWasTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid && enteredEmailIsValid) {
      return;
    }

    //reset states
    resetNameInput();
    setEnteredEmail("");
    setEnteredEmailWasTouched(false);
  };
  const nameInputClasses = nameInputHasError
    ? "form-control  invalid"
    : "form-control";
  const emailInputClasses = emailInputIsInvalid
    ? "form-control  invalid"
    : "form-control";
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredValue}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInputIsInvalid && (
          <p className="error-text">Please enter a vlid Email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
