import React from 'react';
import logo from '../../assets/icons/home.svg';

import './Footer.scss';

function Footer(){
    return(
        <footer className='footer'>
            <p>Copyright &copy; <img className='footer__logo' src={logo} alt='logo'/><span className='logo-text'>OPEN HOUSE</span>, 
                <span className='footer__info'>All Rights Reserved.</span>
            </p>
        </footer>
    )
}
export default Footer;