import React, { useEffect, useState } from 'react';
import { Card, Button, Select, Icon } from "antd";


const Basket = ({cartItems, handleRemoveFromCartFunc}) => {	

    const sumNumber = ({cartItems})=>{
		let sumNum = 0;
		cartItems.forEach(item =>{
            sumNum +=  item.count;});
            
        return sumNum;
        }
	const sumMoney = ({cartItems})=>{
		let sum = 0;
		cartItems.forEach(item =>{
            sum += item.product.price * item.count;});
            
		return sum;
	}


			return(
			<Card>
            {cartItems.map( item =>
							<li style={{ marginTop:20 }} key={`${item.product.sku}_${item.size}`}>
								<b>-{item.product.title}, {item.size}</b>
								X<b>{item.count}</b>
                                <Icon type="close-circle" theme="twoTone" onClick = {(e) => handleRemoveFromCartFunc(e,item.product,item.size)}/>
							</li>)}    
			
			{cartItems.length === 0? " Your shopping cart is empty" :<span></span> }
			{cartItems.length > 0 &&
				 <div>
                    <hr></hr>
                    <h4> You have {sumNumber({cartItems})} products. 
                    <br></br>
                   
					Total: $ {sumMoney({cartItems})}</h4>
                    <Button type="primary" onClick={() => alert('Todo: Implement checkout page.')} >Check Out Now</Button>
                </div>
			}
			
            </Card>
            )
}
export default Basket;