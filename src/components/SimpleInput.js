import React, { useState } from "react";
const SimpleInput = (props) => {
  // Name State
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameWasTouched, setEnteredNameWasTouched] = useState(false);

  // Email State
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailWasTouched, setEnteredEmailWasTouched] = useState(false);

  // Name dreiven State
  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameWasTouched;

  // Email dreiven State
  const enteredEmailIsValid = enteredEmail.includes("@");
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailWasTouched;

  let formIsValid = false;
  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }
  //Name Handler
  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameWasTouched(true);
  };

  //Email Handler
  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const emailInputBlurHandler = (event) => {
    setEnteredEmailWasTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEnteredNameWasTouched(true);

    if (!enteredNameIsValid && enteredEmailIsValid) {
      return;
    }
    console.log(enteredName);

    //reset states
    setEnteredName("");
    setEnteredNameWasTouched(false);
    setEnteredEmail("");
    setEnteredEmailWasTouched(false);
  };
  const nameInputClasses = nameInputIsInvalid
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
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && (
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
