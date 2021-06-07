    import React, { Component } from 'react';
    import Counter from './counter';

    class Counters extends Component {

        render() { 
            const { onReset, counters, onDelete, onIncrement, onSet1, onDecrement } = this.props;
            return (
            <div>
            <button 
            className="btn btn-primary brn-sm m-2" 
            onClick = {onReset}
            >
                Reset</button> 
            <button 
            className="btn btn-primary brn-sm m-2" 
            onClick = {onSet1}>Set to 1</button> 
            {counters.map(counter=> (
            <Counter 
            key={counter.id} 
            onDelete={onDelete} 
            onIncrement= {onIncrement} 
            onDecrement = {onDecrement}
            counter= {counter}
            />
            ))}
            
            </div> 
            );
        }
    }
    
    export default Counters;