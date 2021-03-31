import React from 'react';
import logo from '../../assets/icons/home.svg';

import './Header.scss';

function Header(){
    return(
        <header className='header'>
            <nav className='nav'>
               
                <a href='/' className='nav__logoLink'>
                    <img src={logo} alt={logo} className='nav__logo'/>OPEN HOUSE
                </a>
                <a href='/authenticate' className='nav__link'>Login/Register</a>
            </nav>
        </header>
    )
}
export default Header;