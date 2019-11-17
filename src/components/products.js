import React, { useEffect, useState } from 'react';
import { Card, Button, Select } from "antd";
import "antd/dist/antd.css";

const Products = ({products,handleAddToCart}) =>{
	const [productSize,setProductSize] = useState('');

	return(
	products.map(product => 
       
        <div className = "col-md-4">
              <Card hoverable title={product.title} style={{ height: 450, marginTop:20 }} >
              <div className = "text-center">
        <img src= {`./data/products/${product.sku}_1.jpg`} alt = {product.title} style={{ height: 200 }} />
                        <h5>{product.style}</h5>                        
                    
          <Button size="small"  key='S' onClick = {()=> setProductSize('S')} disabled >S</Button>
          <Button size="small"  key='M' onClick = {()=> setProductSize('M')} disabled={product.M === 0}>M</Button>
          <Button size="small"  key='L' onClick = {()=> setProductSize('L')} disabled={product.L === 0}>L</Button>
          <Button size="small"  key='XL' onClick = {()=> setProductSize('XL')} disabled={product.XL === 0}>XL</Button>   
             
              <br></br>
              <b >{`$${product.price} `}</b>
              <br></br>
              
            <Button type="primary" onClick={(e)=> handleAddToCart(e,product,productSize)}> Add To Cart </Button>
            </div>
       
        </Card>
        </div>   
        
        )
        )
      }
      
      export {Products}