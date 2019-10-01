import React, { Component } from 'react';


export default class Sizes extends Component {

    render() {


        return (
            <div className="row">
                
                    {`${this.props.count} products found.`}
                    <label > Filter Size
               <select className="form-control" value={this.props.size} onChange={this.props.handleSizeChange}>
                            <option value="">ALL</option>
                            <option value="x">XS</option>
                            <option value="s">S</option>
                            <option value="m">M</option>
                            <option value="l">L</option>
                            <option value="xl">XL</option>
                            <option value="xxl">XXL</option>
                        </select>
                    </label>
               
                    
                
                   
                
            </div>
        )
    }
}
