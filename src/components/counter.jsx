import React, { Component } from 'react';

class Counter extends Component {
    state = { 
        count: 1,
        tags: ['tag1', 'tag2', 'tag3']
         };

    // constructor() {
    //     super();
    //     this.handleIncrement = this.handleIncrement.bind(this);
    // }

    handleIncrement = product => {
        console.log(product);
this.setState ({ count: this.state.count +1 })
         }
    render() { 
                return (
        <div>
           <span className={this.getBadgeClassses()}> {this.formatCount()}</span>
            <button 
                onClick={() => this.handleIncrement('product')} 
                className="btn btn-secondary btn-sm"
            >
                Increment
            </button>
                    <ul>
                        { this.state.tags.map (tag => <li key={tag}>{ tag }</li>)}
                    </ul>
        </div>
            );
    }

    getBadgeClassses() {
        let classes = "badge m-2 bg-";
        classes += (this.state.count === 0) ? "warning" : "primary";
        return classes;
    }

    formatCount(){
        const count = this.state;
        return this.state.count === 0 ? "Zero" : this.state.count;
    }
}
 
export default Counter;