import React from 'react';
import './LeftBar.scss';
function LeftBar(){
    return(
        <section className= 'leftBar'>
            <ul className='list'>
                <li className='leftBar__item'><a href='/' className='link leftBar__link'>Home</a></li>
                <li className='leftBar__item'><a href='/create-profile' className='link leftBar__link'>Create Your Profile</a></li>
                <li className='leftBar__item'><a href='/properties' className='link leftBar__link'>Available Properties </a></li>
                <li className='leftBar__item'><a href='/properties/add-property' className='link leftBar__link'> Add new property </a></li>
                <li className='leftBar__item'><a href='/associates' className='link leftBar__link'> Associates </a></li>
                <li className='leftBar__item'><a href='/buyer-checklist' className='link leftBar__link'> Buyer Checklist </a></li>
                <li className='leftBar__item'><a href='/seller-checklist' className='link leftBar__link'> Seller Checklist </a></li>
            </ul>
        </section>
    )
}
export default LeftBar;