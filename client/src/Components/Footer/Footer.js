import React from 'react';
import logo from '../../assets/icons/home.svg';

import './Footer.scss';

function Footer(){
    return(
        <footer className='footer'>
            <p>Copyright &copy; <img src={logo} alt='logo'/>OPENHOUSE, Inc. All Rights Reserved.</p>
        </footer>
    )
}
export default Footer;