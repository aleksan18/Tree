import axios from "axios";

const storageName = "userData";
const loginUrl = " https://localhost/api/auth/login";
const refreshUrl = "https://localhost/api/auth/refreshUser";
const registerUrl = " https://localhost/api/auth/register";
const updateUserUrl = " https://localhost/api/auth/updateUser";
const confirmationUrl = " https://localhost/api/auth/confirmation";
export const loginApi = (email, password) => {
  return axios
    .post(loginUrl, { email, password })
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};
export const updateUserApi =(name,email,username,firstName,lastName,password,passwordConfirm,phone,address)=>{
  return axios.post(updateUserUrl,{name,email,username,firstName,lastName,password,passwordConfirm,phone,address}).then((response)=>response.data).catch((error)=>{
    throw error.response.data;
  })
}
export const refreshUser = (token) => {
  return axios
    .post(refreshUrl, {},{headers:{authorization:`Bearer ${token}`}})
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};
export const registerApi = (email,username,password,confirmPassword,firstName,lastName,phone,address) =>{
  return axios.post(registerUrl,{email,username,password,confirmPassword,firstName,lastName,phone,address}).then((response)=>response.data).catch((error)=>{
    throw error.response.data;
  })
};
export const getEmailConfirmation = (hash)=>{
  return axios.post(confirmationUrl,{hash}).then(response=>response.data).catch((error)=>{
    throw error.response.data;
  });
}
export const getLocalAuthToken = () =>
  JSON.parse(localStorage.getItem(storageName));

export const setAuthToken = (token) => {
  localStorage.setItem(storageName, JSON.stringify(token));
};

export const removeAuthToken = () => {
  localStorage.removeItem(storageName);
};
