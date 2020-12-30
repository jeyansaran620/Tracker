import React from 'react';
import { Route, Switch , Redirect } from "react-router-dom";
import {Jumbotron} from 'reactstrap';
import ProtectedRoute  from './ProtectedRoute';
import NavBar from './NavBar';
import Footer from './Footer';
import Login from './Login';
import OpenHome from './Open/Home';
import Home from './Home';
import AddType from './AddType';
import AddTool from './AddTool';
import AddRental from './AddRental';
import CloseRent from './CloseRent';
import AddCustomer from './AddCustomer';
import ViewTool from './ViewTool';
import OpenViewType from './Open/ViewType';
import ViewType from './ViewType';
import ViewCustomer from './ViewCustomer';
import ModType from './ModType';
import ModTool from './ModTool';
import ModCustomer from './ModCustomer';
import auth from "./auth";

const Main = () => {
    return (
        <div>  
            <NavBar />
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-md-8">
                            <h2>Tool Tracker</h2>
                            <p>A Fullstack site build with React JS and Express JS to maintain Tool details along with the tracking of their rentals with the customers.</p>
                        </div>
                    </div>
                </div>
                </Jumbotron>
            <div className="kernel">
            <Switch >
                <Route path="/Login" component={() => <Login />} />

                <Route path="/Home" render={(props) => {
                    if (auth.isAuthenticated()) {
                        return <Home {...props} />;
                    } 
                    else {
                        return <OpenHome {...props} />;
                    }}} />

                <ProtectedRoute path="/AddType" component={() => <AddType />} />
                <ProtectedRoute path="/AddTool" component={() => <AddTool />} />
                <ProtectedRoute path="/AddRent" component={() => <AddRental />} />
                <ProtectedRoute path="/CloseRent" component={() => <CloseRent />} />
                <ProtectedRoute path="/AddCustomer" component={() => <AddCustomer />} />

                <Route path="/ViewType/:id" render={(props) => {
                    if (auth.isAuthenticated()) {
                        return <ViewType {...props} />;
                    } 
                    else {
                        return <OpenViewType {...props} />;
                    }}} />

                <ProtectedRoute path="/ViewTool/:id" component={(props) => <ViewTool  {...props}/>} />
                <ProtectedRoute path="/ViewCustomer/:id" component={(props) => <ViewCustomer  {...props}/>} />
                <ProtectedRoute path="/ModType/:id" component={(props) => <ModType  {...props}/>} />
                <ProtectedRoute path="/ModTool/:id" component={(props) => <ModTool  {...props}/>} />
                <ProtectedRoute path="/ModCustomer/:id" component={(props) => <ModCustomer  {...props}/>} />
                <Redirect to="/Home"/>
            </Switch >
            </div>
            <Footer />
        </div>
    );
};

export default Main;