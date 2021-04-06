import React from 'react';
import './LeftBar.scss';
import Cookies from 'js-cookie';
function LeftBar() {
    return (
        <section className='leftBar'>
            <ul className='list'>
                <li className='leftBar__item'><a href='/' className='link leftBar__link'>Home</a></li>
                <li className='leftBar__item'><a href='/properties' className='link leftBar__link'>Available Properties </a></li>
                <li className='leftBar__item'><a href='/associates' className='link leftBar__link'> Associates </a></li>
                <li className='leftBar__item'><a href='/buyer-checklist' className='link leftBar__link'> Buyer Checklist </a></li>
                <li className='leftBar__item'><a href='/seller-checklist' className='link leftBar__link'> Seller Checklist </a></li>
            </ul>
            {Cookies.get('username') ?
                <>
                    <h3 className='leftBar__userHeading'>User Menu</h3>
                    <ul className='list'>
                        <li className='leftBar__item'><a href={`/users/${Cookies.get('userId')}/profile`} className='link leftBar__link'>Profile</a></li>
                        <li className='leftBar__item'><a href={`/users/${Cookies.get('userId')}/properties`} className='link leftBar__link'>View your properties</a></li>
                        <li className='leftBar__item'><a href={`/users/${Cookies.get('userId')}/properties/add-property`} className='link leftBar__link'> Add new property </a></li>
                        <li className='leftBar__item'><a href='/message-box' className='link leftBar__link'> Message Box </a></li>
                    </ul>
                </> : ''
            }
        </section>
    )
}
export default LeftBar;