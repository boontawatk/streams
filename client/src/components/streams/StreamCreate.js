import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { createStream } from "../../actions";

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
      <input
        type="text"
        onChange={input.onChange}
        value={input.value}
        autoComplete="off"
      />
      <div className="ui error message">{msg}</div>
    </div>
  );
};

const StreamCreate = (props) => {
  const onSubmit = (formValues) => {
    props.createStream(formValues);
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

const formWrapped = reduxForm({
  form: "streamCreate",
  validate,
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);
