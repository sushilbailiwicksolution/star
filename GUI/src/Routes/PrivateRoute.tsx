import React from 'react';
import { Route } from 'react-router-dom';
import Header from './../Layout/header_3';

const PrivateRoute = (Params : any) => {
    const { component : Component, ...rest } = Params;
    return (
        <>
        <Route {...rest} render={props => (
            localStorage.getItem('logedInUser') ?
                (<><Header {...props} /><Component {...props} /></>)
            : (window.location.href="/")
        )} />
        </>
    );
};

export default PrivateRoute;
