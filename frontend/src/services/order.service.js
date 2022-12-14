import axios from "axios";
const getCurrentOrderUrl="https://localhost/api/orders/order";
const getAllOrdersUrl="https://localhost/api/orders/orders";
const updateOrderUrl="https://localhost/api/orders/updateOrder";
const deleteOrderUrl="https://localhost/api/orders/deleteOrder";
const createOrderUrl = "https://localhost/api/orders/createOrder";
const saveCartUrl = "https://localhost/api/orders/saveCart"

export const getAllOrders= (token)=>{
    return axios.post(getAllOrdersUrl,{},{headers:{authorization:`Bearer ${token}`}})
        .then((response)=>response.data)
        .catch((error)=>{
        console.log(error);
        throw error.response.data;
    })
}
export const createOrderService = (order,token) => {
    return axios.post(createOrderUrl, order,{headers:{authorization:`Bearer ${token}`}}) 
                .then((response) => response.data)
                .catch((error) => {
                    console.log(error);
                    throw error.response.data;
                });
} 

export const saveCartService = (cart,token) => {
    return axios.post(saveCartUrl, {cart},{headers:{authorization:`Bearer ${token}`}}) 
                .then((response) => response.data)
                .catch((error) => {
                    console.log(error);
                    throw error.response.data;
                });
} 
export const getCurrentOrderApi=(orderId,token)=>{
    return axios.post(getCurrentOrderUrl,{orderId},{headers:{authorization:`Bearer ${token}`}})
    .then(response=>response.data)
    .catch((err)=>{
        console.log(err);
        throw err.response.data})
}
export const getUpdateOrderApi=(order,token)=>{
    return axios.post(updateOrderUrl,order,{headers:{authorization:`Bearer ${token}`}})
    .then(response=>response.data)
    .catch((err)=>{
        console.log(err);
        throw err.response.data})
}
export const deleteOrderService = (order,token)=>{
    return axios.post(deleteOrderUrl,{order},{headers:{authorization:`Bearer ${token}`}})
    .then(response => response.data)
    .catch((err)=>{
        console.log(err);
        throw err.response.data;
    })
}
