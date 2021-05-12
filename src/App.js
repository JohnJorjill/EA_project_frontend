import React from "react";
import { Route, Switch } from "react-router-dom";
import Login_page from './pages/Login_page';
import Main_page from './pages/Main_page';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Login_page}>{}</Route>
        <Route path='/main' component={Main_page} />
      </Switch>
    </div>
  );
}

export default App;