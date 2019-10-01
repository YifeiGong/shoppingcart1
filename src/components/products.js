import React, { Component } from 'react';
import { Card, Button } from "antd";
import "antd/dist/antd.css";

export default class Products extends Component {

    render() {
        const productItems = this.props.products.map(product => (
            <div className="col-md-4 text-center">
                <Card hoverable title={product.title} style={{ height: 400 }} >
                     <a href={`#${product.sku}`}onClick={this.props.handleAddToCart}>
                        <img src={require(`../static/products/${product.sku}_2.jpg`)} alt={product.title} />
                        <h5>{product.style}</h5>                        
                    </a>
						<p>Price: ${product.price}</p>
						
                    <Button type="primary" onClick={() => this.props.handleAdd(product)}>Add to cart</Button>
                    </Card>
            </div>
        ));

        return (
            <div className="row">
                {productItems}
            </div>
        )
    }
}
