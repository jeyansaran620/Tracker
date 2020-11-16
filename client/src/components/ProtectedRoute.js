import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";
import propTypes from 'prop-types';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/Login",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

ProtectedRoute.propTypes = {
    location: propTypes.object,
    component : propTypes.func.isRequired,

};

export default ProtectedRoute;

