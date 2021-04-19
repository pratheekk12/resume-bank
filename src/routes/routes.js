
import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Home from '../Home'
import Login from '../Login'
import Dashboard from '../Dashboard/view'
import PrivateRoute from './privateRoute'


const createRoutes = () => (
      <Switch>
         <Route path="/" component={Home} exact={true}/>
         <Route path="/login" component={Login} exact={true}/>
         <PrivateRoute path="/dashboard" component={Dashboard} exact={true}/>
       </Switch>
);

export default createRoutes;