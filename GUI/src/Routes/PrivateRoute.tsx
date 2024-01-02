import React from "react";
import { Route } from "react-router-dom";
import Header from "../Layout/header";

/**
 * This component is handling all the private routes .
 * @component
 */
const PrivateRoute = (Params: any) => {
  const { component: Component, ...rest } = Params;
  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          localStorage.getItem("logedInUser") ? (
            <>
              <Header {...props} />
              <Component {...props} />
            </>
          ) : (
            (window.location.href = "/")
          )
        }
      />
    </>
  );
};

export default PrivateRoute;
