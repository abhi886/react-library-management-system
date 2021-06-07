import React, { Component } from 'react';
import NavBar from './components/navbar';
import Counters from './components/counters';

import './App.css';

class App extends Component {
  state = { 
    counters: [
        {id:1, value:4 },
        {id:2, value:0 },
        {id:3, value:0 },
        {id:4, value:0 },
    ]
 };
 
constructor() {
  super();
  console.log("App - Constructor");
}

componentDidMount() {
  console.log('App = Mounted');
}

 handleReset = () => {
  const counters =  this.state.counters.map(c => {
         c.value = 0;
         return c;
     });
     this.setState({counters});
 };

 handleSet1 = () => {
     const counters = this.state.counters.map(c => {
         c.value = 1;
         return c ;  
     });
     this.setState({counters});
 }

 handleIncrement = counter => {
     const counters = [...this.state.counters];
     const index = counters.indexOf(counter);
     counters[index] = {...counter};
     counters[index].value++;
    this.setState({ counters });
    }

    handleDecrement = counter => {
      const counters = [...this.state.counters];
      const index = counters.indexOf(counter);
      counters[index] = {...counter};
      counters[index].value--;
     this.setState({ counters });
     }

 handleDelete = (counterId) => {
const counters = this.state.counters.filter(c => c.id !== counterId);
this.setState( {counters })    };
render() {

console.log('App-Renderd');
  return (
    <>
    <NavBar totalCounters={this.state.counters.filter(c => c.value > 0).length} />
    <main className="container">
      <Counters 
      counters={this.state.counters}
      onReset={this.handleReset} 
      onIncrement={this.handleIncrement}
      onSet1={this.handleSet1}
      onDelete={this.handleDelete}
      onDecrement={this.handleDecrement}
       />
    </main>
    </>
  )};
}

export default App;
