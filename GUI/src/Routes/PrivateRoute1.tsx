import React from 'react';
import { Route } from 'react-router-dom';
import Header1 from './../Layout/header_2';

const PrivateRoute = (Params : any) => {
    const { component : Component, ...rest } = Params;
    return (
        <>
        <Route {...rest} render={props => (
            localStorage.getItem('logedInUser') ?
                (<><Header1 {...props} /><Component {...props} /></>)
            : (window.location.href="/")
        )} />
        </>
    );
};

export default PrivateRoute;
