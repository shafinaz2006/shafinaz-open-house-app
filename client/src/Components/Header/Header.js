import Cookies from 'js-cookie';
import React from 'react';
import logo from '../../assets/icons/home.svg';
import axios from 'axios'

import './Header.scss';

function Header({ sessionUser }) {

    let name = '';
    if (sessionUser) name = sessionUser[0].toUpperCase() + sessionUser.slice(1);
    else if (Cookies.get('username')) name = Cookies.get('username')
    else if (!sessionUser) name = '';

    // Handle logout:

    const logout = () => {
        axios
            .get('http://localhost:8080/logout')
            .then(response => {
                Cookies.remove('username');
                Cookies.remove('userId');
                // window.location = "/logout"
            })
            .catch(error => console.log('Error in logout', error))
    }
    return (
        <header className='header'>
            <nav className='nav'>
                <a href='/' className='nav__logoLink'>
                    <img src={logo} alt={logo} className='nav__logo' />OPEN HOUSE
                </a>
                {!Cookies.get('username') ?
                    <div className='nav__loggedInDiv'>
                        <a href='/authenticate' className='nav__link'>Login/Register</a>
                    </div> :
                    <div className='nav__loggedInDiv'>
                        <a href={`/users/${Cookies.get('userId')}/profile`} className='nav__link'>Hello, {name}!!</a>
                        <a href='/logout' className='nav__link' onClick={logout}>Logout</a>
                    </div>
                }
            </nav>
        </header>
    )
}
export default Header;