import React, { Component } from 'react';

class Counter extends Component {
    componentDidUpdate(prevProps, prevState) {
        console.log("prevProps", prevProps);
        console.log("prevState", prevState);
        if (prevProps.counter.value !== this.props.counter.value) {
            // Ajax call and get new data grom te server
        }
    }

        componentWillUnmount() {
            console.log("Counter - Unmount");
        }


    render() { 
        return (
        <div className="container">
            <div className="row">
            <div className="col-1">
           <span className={this.getBadgeClassses()}> {this.formatCount()}</span>
           </div>
                <div className="col-1">
            <button 
                onClick={() => this.props.onIncrement(this.props.counter)} 
                className="btn btn-secondary btn-sm"
            >
                +
            </button>
            </div>

            <div className="col-1">
            <button 
                onClick={() => this.props.onDecrement(this.props.counter)} 
                className= {this.getButtonClasses()}
            >
                -
            </button>
            </div>
            
            <div className="col-1">

            <button 
            onClick={() => this.props.onDelete(this.props.counter.id)} 
            className="btn btn-danger btn-sm m-1">Delete
            </button>
            </div>
            

            </div>
        </div>
            );
    }

    getBadgeClassses() {
        let classes = "badge m-2 bg-";
        classes += (this.props.counter.value === 0) ? "warning" : "primary";
        return classes;
    }

    formatCount(){
        const {value} = this.props.counter;
        return value === 0 ? "Zero" : value;
    }

    getButtonClasses(){
        let button = "btn btn-secondary btn-sm";
        button += (this.props.counter.value <= 0) ? " disabled" : "";
        return button;
    }
}
 
export default Counter;