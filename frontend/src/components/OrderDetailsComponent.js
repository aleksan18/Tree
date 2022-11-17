import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import {requestAllItems, setCurrentItem} from "../redux/actions/item";
import { Grid, TextField, Button, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import FileBase from 'react-file-base64';
import {updateItem, createItem} from "../redux/actions/item";
import PaypalCheckoutButton from './PaypalCheckoutButton';
import { useHistory } from "react-router-dom"
import { updateItemsBasket} from "../redux/actions/basket";

const OrderDetailsComponent = ({ goBack,user, itemsInBasket, createOrderAction }) => {
    const history = useHistory()
    // const [noMoreItemsToAdd, setNoMoreItemsToAdd] = useState(false);
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
    
    
    // const userProperties = Object.getOwnPropertyNames(user)
    const [form, setForm] = useState({...user});

    // const [checked, setChecked] = useState(false);
    // let checked = false

    const handleSubmit = (e) => { // e = event
        console.log("Details: ", form)
        e.preventDefault();

        clear();
    }
    const clear = () => {
    }

    const cancel = () => {

    }


    const capitalizeString = (initialStr) => {
        return initialStr
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
    };


    return (
        <>
        <Grid container spacing={2}>
        <Grid item xs={12}>
        <Typography variant="h3">Order Details</Typography>
        <Paper>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6" sx={{ margin: '20px' }} >Customer Information</Typography>
                {/* <Checkbox
                    checked={checked}
                    onChange={checkboxPressed}
                    inputProps={{ 'aria-label': 'controlled' }}
                /> */}
                <TextField sx={{ marginBottom: '15px' }} name="first-name" variant="outlined" disabled
                           label="First Name" fullWidth value={form.firstName} 
                           onChange={(e) => ({ ...form, firstName: e.target.value })} />
                <TextField sx={{ marginBottom: '15px' }} name="last-name" variant="outlined" disabled
                           label="Last Name" fullWidth value={form.lastName} 
                           onChange={(e) => ({ ...form, lastName: e.target.value })} />
                <TextField sx={{ marginBottom: '15px' }} name="email" variant="outlined" disabled
                           label="Email" fullWidth value={form.email} multiline
                           onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <TextField sx={{ marginBottom: '15px' }} name="address" variant="outlined" disabled
                           label="Address" fullWidth value={form.address} 
                           onChange={(e) => setForm({ ...form, address: e.target.value })} />
                <TextField sx={{ marginBottom: '15px' }} name="phone" variant="outlined" disabled
                           label="Phone" fullWidth value={form.phone} 
                           onChange={(e) => setForm({ ...form, phone: e.target.value })} />       
            </form>
        </Paper>
        <Typography variant="h6" sx={{ marginTop: '10px' }}>Chosen Items</Typography>
        </Grid>
        <Grid item xs={12}>
         
<TableContainer component={Paper}>
<Table sx={{ minWidth: 650 }} aria-label="items-table">
  <TableHead>
    <TableRow>
      <TableCell>Item</TableCell>
      <TableCell align="right">Quantity</TableCell>
      <TableCell align="right">Unit Price</TableCell>
      <TableCell align="right">Total Price</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {itemsToDisplay.map((item) => (
      <TableRow
        key={item.name}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {capitalizeString(item.name)}
        </TableCell>
        <TableCell align="right">{countSameItems(item)}</TableCell>
        <TableCell align="right">{item.price} DKK</TableCell>
        <TableCell align="right">{item.price * countSameItems(item)} DKK</TableCell>
        
      </TableRow>
    ))}
  </TableBody>
</Table>
</TableContainer>
</Grid>
  <Grid item xs={12}>
    <PaypalCheckoutButton user={user}
     history={history}
     updateItemsBasket={updateItemsBasket}
     itemsInBasket={itemsInBasket} 
     createOrderAction={createOrderAction}/>
  </Grid>
  <Grid item xs={12}>
    <Button onClick={goBack} variant="outlined">Back</Button>
  </Grid>
  </Grid>
</>
    );
}

const mapStateToProps = (state) => {
    return {
        itemsInBasket: state.basket.itemsInBasket, 
        userIsAuthenticated: state.user.isAuthenticated,
    };
};

export default connect(mapStateToProps, {})(OrderDetailsComponent);