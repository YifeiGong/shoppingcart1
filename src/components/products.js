import React, { useEffect, useState } from 'react';
import { Card, Button, Select } from "antd";
import "antd/dist/antd.css";



const Products = ({products, handleAddToCartFunc}) => (
    <div>
      {products.map(product => <Product key={product.sku} product={product} handleFunc={handleAddToCartFunc} />)}
    </div>
    );

    const Product = ({product, handleFunc}) => {
        const [Size, setSize] = useState("S");

        const handleSizeChange = select_id => {
          setSize(document.getElementById(select_id).value);
        };
        
    return(
       
        <div className = "col-md-4">
              <Card hoverable title={product.title} style={{ height: 450, marginTop:20 }} >
              <div className = "text-center">
        <img src= {`./data/products/${product.sku}_1.jpg`} alt = {product.title} style={{ height: 200 }} />
                        <h5>{product.style}</h5>                        
                    
                      
              <select style={{ marginTop:20 }} id={`${product.sku}-size-select`} onChange={()=>handleSizeChange(`${product.sku}-size-select`)}>
              <option value='S'>S</option>
              <option value='M'>M</option>
              <option value='L'>L</option>
              <option value='XL'>XL</option>
              </select>
              <br></br>
              <b >{`$${product.price} `}</b>
              <br></br>
              <Button type="primary" 
              onClick = {(e) => handleFunc(e,product,Size)} >Add to Card</Button></div>
            
         
       
        </Card>
        </div>   
        
      )};
    
    
    export default Products;