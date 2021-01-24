import React from "react";
import { Field, reduxForm } from "redux-form";

const StreamCreate = (props) => {
  console.log(props);
  const onSubmit = (formValues) => {
    console.log(formValues);
  };
  const renderInput = ({ input, label }) => {
    return (
      <div className="field">
        <label>{label}</label>
        <input type="text" {...input} />
      </div>
    );
  };
  return (
    <form className="ui form" onSubmit={props.handleSubmit(onSubmit)}>
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

export default reduxForm({
  form: "streamCreate",
})(StreamCreate);
