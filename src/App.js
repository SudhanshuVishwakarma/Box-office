import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Components/Nav';
import Home from './Pages/Home';
import Start from './Pages/Start';

function App() {
  return (
    <div>
      <Nav />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/start">
          <Start />
        </Route>

        <Route>
          <div>Not Found</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
