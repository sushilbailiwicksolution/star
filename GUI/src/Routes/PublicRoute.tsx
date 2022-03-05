import React from 'react';
import { Route } from 'react-router-dom';

const PublicRoute = (Params: any) => {
  const { component: Component, ...rest } = Params;
  console.log('PublicRoute', Params);
  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          localStorage.getItem('logedInUser') ? (
            (window.location.href = '/dashboard')
          ) : (
            <>
              <Component {...props} />
            </>
          )
        }
      />
    </>
  );
};

export default PublicRoute;
