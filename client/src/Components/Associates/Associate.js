import React from 'react';
import './AssociateList.scss';
import profilePic from '../../assets/icons/profileIcon.svg'

const Associate = ({associate}) =>{
    return(
        <section className='associate'>
            <div className='associate__profilePicDiv'>
                <img src={profilePic} alt='profilePic' className='associate__profilePic'/>
            </div>
            <div className='associate__info'>
                <h3 className='associate__name'>{associate.name}</h3>
                <p className='associate__profession'>{associate.profession}</p>
                <a href = {`/associates/${associate.userId}`} className='link button button--associate'> Details </a>
            </div>
        </section>
    )
};
export default Associate