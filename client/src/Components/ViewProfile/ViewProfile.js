import React from 'react';
import './ViewProfile.scss';
import Cookies from 'js-cookie';

function ViewProfile(props){
    const checkProfileCreated = () =>{
        let userId = props.match.params.userId;
        let user;
        let seller = props.sellers.find(seller => seller.userId === userId);
        if(seller){ user = {...seller}; }
        let associate = props.associates.find(associate => associate.userId === userId);
        if(associate) user = {...associate};
        return user;
    }
    return(
        <section className='viewProfile'>
            {!checkProfileCreated()? <h1 className='viewProfile__heading viewProfile__heading--status'> Your profile is not created</h1>: 
            <>
                <h2 className='viewProfile__heading'>Your profile Information</h2>
                <h3 className='viewProfile__subheading'>Name: </h3>
                <p className='viewProfile__text'>{checkProfileCreated().name}</p>
                <h3 className='viewProfile__subheading'>Phone: </h3>
                <p className='viewProfile__text'>{checkProfileCreated().phone}</p>
                <h3 className='viewProfile__subheading'>Email: </h3>
                <p className='viewProfile__text'>{checkProfileCreated().email}</p>
                <h3 className='viewProfile__subheading'>Profession: </h3>
                <p className='viewProfile__text'>{checkProfileCreated().profession}</p>
                <h3 className='viewProfile__subheading'>Referee Name: </h3>
                <p className='viewProfile__text'>{checkProfileCreated().refereeName}</p>
                <h3 className='viewProfile__subheading'>Referee Phone: </h3>
                <p className='viewProfile__text'>{checkProfileCreated().refereePhone}</p>
            </>}
        </section>
    )
}
export default ViewProfile