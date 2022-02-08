import React from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router";

function ProtectedRoute({ children, ...rest }) {
  const history = useHistory();
   
  return (
    <Route
      {...rest}
      render={() => {
        return localStorage.getItem("AccessToken") != null
          ? children
          : history.push("/auth/login/");
      }}
    />
  );
}

export default ProtectedRoute;
