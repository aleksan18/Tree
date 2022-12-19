
import React, { useState, useEffect } from "react";
import { connect} from "react-redux";
import { Auth } from "../components/Auth";
import { loginRequest } from "../redux/actions/auth";
import {formErrorAction} from "../redux/actions/message";
import { useHistory } from "react-router-dom";

const AuthPage=({scenario,requesting,successful,formErrorAction,handleClickOpen,modalOpen,handleClose,loginRequest,errors})=>{
  const history = useHistory();
  //form errors are for loading errors received from the backend onto the form as an error helper text
  //useEffect will track the errors array if it changes and it will re-render the page
  const [formErrors, setFormErrors] = useState({});
  useEffect(() => {
    console.log(errors);
    if (errors) {
    errors.forEach((error) => {
        setFormErrors((i) => ({ ...i, [error.param]: error.msg }));
      });
    }
  }, [errors]);
  //login form used for submitting
  const [form, setForm] = useState({
    email: "",
    password:"",
  });
  // changes form values
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    checkForm(event.target.name,event.target.value )
  };
  //submitting the login
  const submitHandler = async (event) => {
    event.preventDefault();
    
    if(errors.length === 0 && (form.email.length !== 0 || form.password.length !== 0)){
      loginRequest(form);
      setFormErrors([]);
    }else{
      formErrorAction([...errors,{param:"email",msg:`Email should not be empty`,value:"a"},{param:"password",msg:`Password should not be empty`,value:"a"}])
    }
  };
  const checkForm= (targetName,targetValue)=>{
    if(targetValue.match("^[a-zA-Z0-9_@,]*$") != null){
      formErrorAction([...errors,{param:targetName,msg:`${targetName} should have valid characters`,value:"a"}])
    }
    if(targetValue.length === 0){
      formErrorAction([...errors,{param:targetName,msg:`${targetName} should not be empty`,value:"a"}])
    }else{
      formErrorAction([])
     setFormErrors([])
    }
  }
  return(
    <Auth
    modalOpen={modalOpen}
    handleClose={handleClose}
    changeHandler={changeHandler}
    submitHandler={submitHandler}
    form={form}
    formErrors={formErrors}
    />
  )
}
const mapStateToProps = (state) => {
  return {
    requesting:state.auth.requesting,
    successful:state.auth.successful,
    errors:state.message.errors,
    scenario:state.message.scenario
  }
}
export default connect(mapStateToProps,{loginRequest,formErrorAction})(AuthPage)
