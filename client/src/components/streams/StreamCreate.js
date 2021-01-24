import React from "react";
import { Field, reduxForm } from "redux-form";

const StreamCreate = (props) => {
  const onSubmit = (formValues) => {};
  const renderInput = ({ input, label, meta }) => {
    let msg = "";
    let errClass = "field";
    if (meta.touched && meta.error) {
      msg = meta.error;
      errClass = "field error";
    }
    return (
      <div className={errClass}>
        <label>{label}</label>
        <input type="text" {...input} autoComplete="off" />
        <div className="ui error message">{msg}</div>
      </div>
    );
  };
  return (
    <form className="ui form error" onSubmit={props.handleSubmit(onSubmit)}>
      <Field name="title" component={renderInput} label="Enter title" />
      <Field
        name="description"
        component={renderInput}
        label="Enter Description"
      />
      <button className="ui button primary">submit</button>
    </form>
  );
};

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};

export default reduxForm({
  form: "streamCreate",
  validate,
})(StreamCreate);
