import React, { Component } from 'react';

export default class Filter extends Component {

    render() {


        return (
            <div className="row">
                
                   
                
               
                    <label>
               <select className="form-control" value={this.props.sort} onChange={this.props.handleSortChange}>
                            <option value="">Order By </option>
                            <option value="lowestprice">Lowest to highest</option>
                            <option value="highestprice">Highest to lowest</option>
                        </select>
                    </label>
                
                    
                
            </div>
        )
    }
}
