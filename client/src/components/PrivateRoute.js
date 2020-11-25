import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  return (
    <Route
      {...rest}
      render={(props) => {
        const { location } = props;
        return user || token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
