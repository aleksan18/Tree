import axios from "axios";

const storageName = "allItems";
const requestItemsUrl = "https://localhost/api/items";
const updateItemUrl = "https://localhost/api/updateItem";
const createItemUrl ="https://localhost/api/createItem";
const deleteItemUrl="https://localhost/api/deleteItem";


export const requestItems = () => {

    return axios.get(requestItemsUrl)
                .then((response) => response.data)
                .catch((error) => {
                    throw error.response.data;
                });
} 
export const updateItem = (item,token) => {

    return axios.post(updateItemUrl, item,{headers:{authorization:`Bearer ${token}`}}) 
                .then((response) => response.data)
                .catch((error) => {
                    throw error.response.data;
                });
} 
export const createItem = (currentItem,token) => {

    return axios.post(createItemUrl, currentItem,{headers:{authorization:`Bearer ${token}`}}) 
                .then((response) => response.data)
                .catch((error) => {
                    console.log(error);
                    throw error.response.data;
                });
} 
export const deleteItemService = (deleteItem,token) => {

    return axios.post(deleteItemUrl, deleteItem,{headers:{authorization:`Bearer ${token}`}}) 
                .then((response) => response.data)
                .catch((error) => {
                    console.log(error);
                    throw error.response.data;
                });
} 