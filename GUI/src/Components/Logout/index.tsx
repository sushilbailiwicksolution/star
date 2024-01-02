import React, { useEffect } from 'react';

/**
 * This component handles the logout functionality by removing the logged-in user information from local storage and redirecting to the home page.
 * @component
 * @param {Object} props - The props passed to the component.
 * @param {Object} props.history - The history object provided by React Router.
 */

function Logout(props:any) {
    useEffect(() => {
        localStorage.removeItem('logedInUser');
        props.history.push('/');
    }, [])

    return(null)
}

export default Logout;