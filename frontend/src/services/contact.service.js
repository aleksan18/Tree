import axios from "axios";


const emailUrl = " https://localhost/api/contact";


export const contactEmail = (firstName, lastName, email, subject, message ) => {
    return axios
      .post(emailUrl, { firstName, lastName, email, subject, message})
      .then((response) => response.data)
      .catch((error) => {
        throw error.response.data;
      });
  };