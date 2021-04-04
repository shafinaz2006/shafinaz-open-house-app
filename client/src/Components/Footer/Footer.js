import React from 'react';
import logo from '../../assets/icons/home.svg';

import './Footer.scss';

function Footer(){
    return(
        <footer className='footer'>
            <p>Copyright &copy; <img className='footer__logo' src={logo} alt='logo'/>OPENHOUSE, Inc. 
                <span className='footer__info'>All Rights Reserved.</span>
            </p>
        </footer>
    )
}
export default Footer;