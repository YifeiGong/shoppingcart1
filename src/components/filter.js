import React, { Component } from 'react';

export default class Filter extends Component {

    render() {


        return (
            <div className="container">
                 <div className="col-md-4 text-left">
                    <label>
               <select className="form-control" value={this.props.sort} onChange={this.props.handleSortChange}>
                            <option value="">Order By </option>
                            <option value="lowestprice">Lowest to highest</option>
                            <option value="highestprice">Highest to lowest</option>
                        </select>
                    </label>
                    </div>
                    <div className="col-md-6 text-left">
                {`${this.props.count} products found.`}
                
                </div>
                
                    





                
            </div>
        )
    }
}
