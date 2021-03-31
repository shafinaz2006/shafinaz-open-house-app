import React from 'react';
import './AssociateList.scss';
import profilePic from '../../assets/icons/profileIcon.svg'

const Associate = ({associate}) =>{
    // let profilePicName=associate.name.split(' ').map(el => el[0].toUpperCase()).join('');
    // console.log(profilePicName);
    return(
        <section className='associate'>
            <div className='associate__profilePicDiv'>
                <img src={profilePic} alt='profilePic' className='associate__profilePic'/>
            </div>
            <div className='associate__info'>
                <h3 className='associate__name'>{associate.name}</h3>
                <p className='associate__profession'>Profession: {associate.profession}</p> 
                <a href = {`/associates/${associate.associateId}`} className='link button button--associate associate__detailsLink'>
                    Details
                </a>
            </div>
        </section>
    )
};
export default Associate