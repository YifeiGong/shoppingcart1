import React, { useEffect, useState } from 'react';
import {Products} from './components/products';
import { Button, Icon, Drawer, Alert } from "antd";
import "antd/dist/antd.css";
import Filter from './components/filter';
import Basket from './components/basket';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

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

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const SignIn = () => (
  <StyledFirebaseAuth
    uiConfig={uiConfig}
    firebaseAuth={firebase.auth()}
  />
);
const App = () => {
  const [data, setData] = useState({}); 
  const [cartItems, setCartItems] = useState([]);
  const products = Object.values(data);
  const [user, setUser] = useState(null);

  

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      const handleData = add_new =>{
      	if(add_new.val()){
      		let result = {}
      		Object.keys(json).map(x=>{result[x] = Object.assign(json[x],add_new.val()[x])});
      		setData(json);
      	}
      };
      db.on('value',handleData,error=>alert(error));
      return () => {db.off('value',handleData)};
    };
    fetchProducts();
  }, []);

    useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  const handleAddToCart = function (e,product,productSize){
    if(!productSize){
      alert('Please Select A Size');
      return('Please Select A Size')
      }
    let InCart=false;
    let cart=[];
    cartItems.map(item=>{
      if((item.product.sku===product.sku)&&(item.size===productSize)){
        InCart = true;
        item.count++;
      }
      cart.push(item)
    });
    if(!InCart){
      cart.push({product,count:1,size:productSize});
    }
    setCartItems(cart);
  };

  const handleRemoveFromCart = function(e,product,productSize){
    let cart=[];
    cartItems.map(item=>{
      if((item.product.sku===product.sku)&&(item.size===productSize)){
        item.count--;
      }
      if(item.count>0){
     cart.push(item);
      }
    })
    setCartItems(cart);
  }

  
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
  
        

        <Products products = {products} handleAddToCart={handleAddToCart}/>  

      </div>
      <div className="col-md-4">
      <br></br>
      <Icon type="shopping" theme="twoTone" style={{ fontSize: 50 }}></Icon>
      <h5>Check Out</h5>
      <Basket cartItems = {cartItems} handleRemoveFromCartFunc = {handleRemoveFromCart}/>
      <React.Fragment>
      {user ? <div>
        <Alert
      message="Welcome"
      description= {user.displayName}
      type="success"
      showIcon
    />
      
      <Button primary onClick={() => firebase.auth().signOut()}>
      	Log Out
      </Button>
      </div> : <SignIn/>}

      </React.Fragment>
      </div>
      </div>
    );
  }


export default App;
