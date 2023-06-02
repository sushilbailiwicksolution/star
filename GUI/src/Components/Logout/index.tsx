import React, { useEffect } from 'react';

function Logout(props:any) {
    useEffect(() => {
        localStorage.removeItem('logedInUser');
        props.history.push('/');
    }, [])

    return(null)
}

export default Logout;