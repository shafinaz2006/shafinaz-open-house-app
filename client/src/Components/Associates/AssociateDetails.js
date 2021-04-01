import React from 'react';
import './AssociateList.scss';
import profilePic from '../../assets/icons/profileIcon.svg'
const AssociateDetails = ({associate}) =>{
    let firstName= associate.name.split(' ')[0];
    console.log(associate.name);
    return(
        <section className='associateDetails'>
            <div className='associateDetails__profilePicDiv'>
                <img src={profilePic} alt='profilePic' className='associateDetails__profilePic'/>
            </div>
            <div className='associateDetails__info'>
                <h3 className='associateDetails__name'> {associate.name}</h3>
                <p className='associateDetails__prof'>{associate.profession}</p>
                <p className='associateDetails__phone'>{associate.phone}</p>
                <p className='associateDetails__email'>Email:{associate.email}</p>
                <h4 className='associateDetails__referee'>Referee information:</h4>
                <h4 className='associateDetails__refName'>Name: {associate.refereeName}</h4>
                <p className='associateDetails__refPhone'>Phone number: {associate.refereePhone}</p>
                <a href = {`/associates/${associate.associateId}`} className='link button button--associateConnect associateDetails__link'>
                    Message {firstName}
                </a>
            </div>
        </section>
    )
}
export default AssociateDetails