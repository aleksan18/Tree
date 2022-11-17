import {useState} from "react"
import { Button, Link } from "@mui/material";
import { connect } from "react-redux";
import { DateTime } from "luxon";


const PaypalCheckoutButton = ({user, createOrderAction, updateItemsBasket, history, itemsInBasket}) => {
    console.log(itemsInBasket);
    let total = 0;
    const countSameItems = (receivedItem) => {
        const sameItemArray = itemsInBasket.filter(item => receivedItem._id === item._id);
        return sameItemArray.length;
      } 
    
      const itemsToDisplay = []
      if (itemsInBasket.length){
        for (let i = 0; i < itemsInBasket.length; i++){
            const item = itemsInBasket[i]
            const numberOfDuplicates = countSameItems(item) - 1
            itemsToDisplay.push(item)
            i += numberOfDuplicates
          }
    }
    if (itemsToDisplay.length){
        total = itemsToDisplay.reduce((sum, item) => {return sum + item.price * countSameItems(item)}, 0)
       
    }
    
    
    const emptyOrder = {items:itemsInBasket, userId:user.id, totalValue:0, sent:"", delivered:"", ordered:"", message:"", orderPaid:false, paypalOrderId: ""};
    const handleApprove = (order) => {
        // save the order with orderID
        if (order.id){
            console.log("Order.id ", order.id)
            const now = DateTime.fromISO(order.create_time)
            const nowToString = `${(now.day < 10) ? "0" : ""}${now.day}-${(now.month < 10) ? "0" : ""}${now.month}-${now.year}`
            const newOrder = {...emptyOrder, ordered:nowToString, totalValue:total,paypalOrderId:order.id,orderPaid:true}
            console.log("User", user)
            console.log("NewOrder ", newOrder)
            createOrderAction(newOrder,user.token)
            history.push("/orderConfirmation")
            updateItemsBasket({});
        }
        
    }
    const payLaterButton = () => {
        const now = DateTime.now()
        const nowToString = `${(now.day < 10) ? "0" : ""}${now.day}-${(now.month < 10) ? "0" : ""}${now.month}-${now.year}`
        const newOrder = {...emptyOrder, ordered:nowToString, totalValue:total}
        createOrderAction(newOrder,user.token);
        updateItemsBasket({});
        history.push("/orderConfirmation")

    }
        

    
    return (
        <>
            <Button sx={{ width: '750px', marginBottom:"10px" }}
             onClick={payLaterButton} 
             variant="contained">
                Pay Later
            </Button>
        </>
    )

}

export default PaypalCheckoutButton;