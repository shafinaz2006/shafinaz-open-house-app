import React from 'react';
import logo from '../../assets/icons/home.svg';
import axios from 'axios';

import './Header.scss';

function Header(){
    const handleLogout = () =>{
        axios
        .get('http://localhost:8080/logout')
        .then(response => {
            console.log(response.data);
            
        })
        .catch(error => console.log('Error in logout', error))
    }
    return(
        <header className='header'>
            <nav className='nav'>
               
                <a href='/' className='nav__logoLink'>
                    <img src={logo} alt={logo} className='nav__logo'/>OPEN HOUSE
                </a>
                <a href='/authenticate' className='nav__link'>Login/Register</a>
                <a href='/' className='nav__link' onClick={handleLogout}>Logout</a>
            </nav>
        </header>
    )
}
export default Header;