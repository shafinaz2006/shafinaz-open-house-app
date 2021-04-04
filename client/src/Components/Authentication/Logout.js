import React from 'react'
import './Authentication.scss';

function Logout() {
    return (
        <section className='authentication'>
            <h3 className='authentication__heading authentication__heading--status '> You have successfully logged out!!</h3>
            <a href='/' className='link button button--auth' > Home </a>
        </section>
    );
};
export default Logout;