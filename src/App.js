import React, { Component } from 'react';
import Products from './components/products';
import { Button, Icon } from "antd";
import "antd/dist/antd.css";

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { products: [], filteredProducts: [] };
  }
  componentWillMount() {

    if (localStorage.getItem('cartItems')) {
      this.setState({ cartItems: JSON.parse(localStorage.getItem('cartItems')) });
    }

    fetch('../public/products.json').then(res => res.json())
      .catch(err => fetch('products.json').then(res => res.json()).then(data => data.products))
      .then(data => {
        this.setState({ products: data });
        this.listProducts();
      });
  }



 

  listProducts = () => {
    this.setState(state => {
      return { filteredProducts: state.products };
    })
  }
 

  render() {
    return (
      <div className="container">
        <div className="col-md-1 text-center">
        <br></br>
        <Button type="dashed" shape="square" style={{ fontSize: 20 }} icon="tags">Sizes</Button>
        
        

        </div>
        <div className="col-md-10">
        <h1 className="text-center" >Shopping Cart</h1>
  
        
            
           
            <Products products={this.state.filteredProducts} handleAddToCart={this.handleAddToCart} />
          

      </div>
      <div className="col-md-1">
      <h5>Check Out</h5>
      <Icon type="shopping" theme="twoTone" style={{ fontSize: 50 }}/>
      </div>
      </div>
    );
  }
}

export default App;
