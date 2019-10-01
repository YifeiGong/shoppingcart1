import React, { useEffect, useState, Component } from 'react';
import Products from './components/products'

class App extends Component {
  constructor(props){
    super(props);
    this.state = { products:[], filteredProducts:[]}
  }
  render() {
    return (
      <div><h1>Shopping Cart</h1>
      
      <Products products = {this.state.filteredProducts}/>
      </div>
    )
  }
}
export default App;