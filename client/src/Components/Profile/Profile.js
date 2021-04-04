import React from 'react';
import './Profile.scss';
import Cookies from 'js-cookie';


function Profile(props){
    const checkProfileCreated = () =>{
        let userId = props.match.params.userId;
        let user;
        let userProfile =  props.allUserProfiles.find(user => user.userId === userId)
        if(userProfile) user = {...userProfile};
        return user;
    }
    return(
        <section className='profile'>
            {!checkProfileCreated()? 
            <div className='profile__status'>
                <h1 className='profile__heading'> Your profile is not created</h1>
                <a href={`/users/${Cookies.get('userId')}/create-profile`} className= 'link button button--associateConnect'>Create Profile</a>
            </div>: 
            <><h2 className='profile__heading profile__heading--center'>Your profile Information</h2>
            <div className='profile__infoSection'>
                
                <div className='profile__content'>
                    <p className='profile__subHeading'>Name: </p>
                    <p className='profile__text'>{checkProfileCreated().name}</p>
                </div>
                <div className='profile__content'>
                    <p className='profile__subHeading'>Phone: </p>
                    <p className='profile__text'>{checkProfileCreated().phone}</p>
                </div>
                <div className='profile__content'>
                    <p className='profile__subHeading'>Email: </p>
                    <p className='profile__text'>{checkProfileCreated().email}</p>
                </div>
                
                {checkProfileCreated().profession? 
                <div className='profile__referenceInfo'>  
                    <div className='profile__content'>
                        <p className='profile__subHeading'>Profession: </p>
                        <p className='profile__text'>{checkProfileCreated().profession}</p>
                    </div>
                    <h3 className='profile__heading--ref'>Reference: </h3>
                    <div className='profile__content'>
                        <p className='profile__subHeading'>Name: </p>
                        <p className='profile__text'>{checkProfileCreated().refereeName}</p>
                    </div>
                    <div className='profile__content'>
                        <p className='profile__subHeading'>Phone: </p>
                        <p className='profile__text'>{checkProfileCreated().refereePhone}</p>
                    </div>
                </div>: ''}
                <a href={`/users/${Cookies.get('userId')}/profile/edit`} className='link button button--editProfile'> Edit Profile </a>
            </div></>}
        </section>
    )
}
export default Profile