import React from 'react'

import './Authentication.scss';
import Cookies from 'js-cookie';

function Logout() {
    return (
        <section className='authentication'>
            <div className='authentication__section'>
                <h3 className='authentication__heading authentication__heading--status '> You have successfully logged out!!</h3>
                <a href='/' className='link button button--auth' > Home </a>
            </div>
        </section>
    );

};
export default Logout;