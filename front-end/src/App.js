import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './components/Header';
import { Home } from './components/Home';
import { Blog } from './components/Blog';
import { About } from './components/About';
function App() {
  return (
    <Router>
      <div>
       <Header />


        <Switch>
        <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/blog">
            <Blog />
          </Route>
         
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
