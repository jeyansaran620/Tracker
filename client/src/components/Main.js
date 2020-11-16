import React from 'react';
import { Route, Switch , Redirect } from "react-router-dom";
import ProtectedRoute  from './ProtectedRoute';
import NavBar from './NavBar';
import Login from './Login';
import Home from './Home';
import AddType from './AddType';
import AddTool from './AddTool';
import AddRental from './AddRental';
import CloseRent from './CloseRent';
import AddCustomer from './AddCustomer';
import ToolView from './ToolView';
import TypeView from './TypeView';
import CustomerView from './CustomerView';

const Main = () => {
    return (
        <div>  
            <NavBar />
            <Switch >
                <Route path="/Login" component={() => <Login />} />
                <ProtectedRoute path="/Home" component={() => <Home />} />
                <ProtectedRoute path="/AddType" component={() => <AddType />} />
                <ProtectedRoute path="/AddTool" component={() => <AddTool />} />
                <ProtectedRoute path="/AddRent" component={() => <AddRental />} />
                <ProtectedRoute path="/CloseRent" component={() => <CloseRent />} />
                <ProtectedRoute path="/AddCustomer" component={() => <AddCustomer />} />
                <ProtectedRoute path="/TypeView/:id" component={(props) => <TypeView  {...props}/>} />
                <ProtectedRoute path="/ToolView/:id" component={(props) => <ToolView  {...props}/>} />
                <ProtectedRoute path="/CustomerView/:id" component={(props) => <CustomerView  {...props}/>} />
                <Redirect to="/Home"/>
            </Switch >
        </div>
    );
};

export default Main;