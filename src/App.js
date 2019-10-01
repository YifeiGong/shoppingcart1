import React, { Component } from 'react';
import Products from './components/products';
import { Button, Icon, Drawer } from "antd";
import "antd/dist/antd.css";
import Filter from './components/filter';
import Basket from './components/basket';
import Sizes from './components/checkbox';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { products: [], filteredProducts: [] };
  }
  state = { visible: false, childrenDrawer: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  showChildrenDrawer = () => {
    this.setState({
      childrenDrawer: true,
    });
  };

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false,
    });
  };

  
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

  handleAddToCart = (e, product) => {
    this.setState(state => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;

      cartItems.forEach(cp => {
        if (cp.id === product.id) {
          cp.count += 1;
          productAlreadyInCart = true;
        }
      });

      if (!productAlreadyInCart) {
        cartItems.push({ ...product, count: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  }

  listProducts = () => {
    this.setState(state => {
      if (state.sort !== '') {
        state.products.sort((a, b) =>
          (state.sort === 'lowestprice'
            ? ((a.price > b.price) ? 1 : -1)
            : ((a.price < b.price) ? 1 : -1)));
      } else {
        state.products.sort((a, b) => (a.id > b.id) ? 1 : -1);
      }

      return { filteredProducts: state.products };
    })
  }
  handleSortChange = (e) => {
    this.setState({ sort: e.target.value });
    this.listProducts();
  }
  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
    this.listProducts();
  }

 
 

  render() {
    return (
      <div className="container">
        <div className="col-md-1 text-left">
        <br></br>
        
        <Button type="primary" onClick={this.showDrawer}>
          Open drawer
        </Button>
        <Drawer
          title="Multi-level drawer"
          width={520}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Basket cartItems={this.state.cartItems} handleRemoveFromCart={this.handleRemoveFromCart} />
         
          
        </Drawer>
        
        <Icon type="tags" theme="twoTone" style={{ fontSize: 50 }}/>
        <Sizes count={this.state.filteredProducts.length}  
        handleSizeChange={this.handleSizeChange} />
       
        

        </div>
        <div className="col-md-10 text-center">
        <h1 className="text-center" >1</h1>
        <Filter handleSortChange={this.handleSortChange}/>
        

        <Products products={this.state.filteredProducts} handleAddToCart={this.handleAddToCart} />
            

      </div>
      <div className="col-md-1">
      <Button></Button>
      <Icon type="shopping" theme="twoTone" style={{ fontSize: 50 }}/>
      <h5>Check Out</h5>
      
      </div>
      </div>
    );
  }
}

export default App;
