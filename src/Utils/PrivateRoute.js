import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./AuthContext";
import LoginButton from '../Components/LoginButton'

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return (user )? (<Component {...props} />) : (<LoginButton />);
      }}
    >
    </Route>
  );
}
