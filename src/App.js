// react
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// components
import Header from './components/header/header';
import Courses from './components/courses/courses';
import Cart from './components/cart/cart';
import LoginModal from './components/modal/modal'

// styles 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Header/>    
        <Switch>
          <Route path="/" exact component={Courses} />
          <Route path="/cart" component={Cart} />
        </Switch>
        <LoginModal/>
      </div>
    );
  }
}

export default App;
