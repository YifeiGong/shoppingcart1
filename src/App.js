import React, { useEffect, useState } from 'react';
import Products from './components/products';
import { Button, Icon, Drawer } from "antd";
import "antd/dist/antd.css";
import Filter from './components/filter';
import Basket from './components/basket';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyDgxBkbLBHoutLJZcT6G0iDEoRcp_YXxK0",
  authDomain: "shoppingcart-fac8e.firebaseapp.com",
  databaseURL: "https://shoppingcart-fac8e.firebaseio.com",
  projectId: "shoppingcart-fac8e",
  storageBucket: "",
  messagingSenderId: "479899425927",
  appId: "1:479899425927:web:d2bd65e9ba6aa2911a6c22"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const App = () => {
  const [data, setData] = useState({}); 
  const [cartItems, setCartItems] = useState([]);
  const products = Object.values(data);

  const handleAddToCart = function (e,product,productSize){
    let currentCartItems = [];
      let itemAlreadyInCart = false;
      cartItems.forEach(item =>{

        // how to get the product.size 
        if((item.product.sku === product.sku) && (item.size === productSize)){
          itemAlreadyInCart = true; 
          item.count++;
        }
        currentCartItems.push(item);
      });
      if (!itemAlreadyInCart){
        currentCartItems.push({product,count:1,size:productSize});
      }
      // localStorage.setItem("cartItems",JSON.stringify(cartItems));
      setCartItems(currentCartItems);
  };

  const handleRemoveFromCart = function (e,product,productSize){
    let currentCartItems = [];
      cartItems.forEach(item =>{
        if(item.product.sku !== product.sku || item.size != productSize) {
          currentCartItems.push(item);
        }
      });
      // localStorage.setItem("cartItems",JSON.stringify(cartItems));
      setCartItems(currentCartItems);
  };

  
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

    return (
      <div className="container">
        <div className="col-md-8">
   
   <br></br>
        <Icon type="tags" theme="twoTone" style={{ fontSize: 50 }}/>
        <h5>Shopping List</h5>
  
        

        <Products products = {products} handleAddToCartFunc =  {handleAddToCart}/>  

      </div>
      <div className="col-md-4">
      <br></br>
      <Icon type="shopping" theme="twoTone" style={{ fontSize: 50 }}></Icon>
      <h5>Check Out</h5>
      <Basket cartItems = {cartItems} handleRemoveFromCartFunc = {handleRemoveFromCart}/>
      
      </div>
      </div>
    );
  }


export default App;
