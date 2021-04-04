import React from 'react';
import './ViewProfile.scss';


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
                <div className='viewProfile__content'>
                    <h3 className='viewProfile__subHeading'>Name: </h3>
                    <p className='viewProfile__text'>{checkProfileCreated().name}</p>
                </div>
                <div className='viewProfile__content'>
                    <h3 className='viewProfile__subHeading'>Phone: </h3>
                    <p className='viewProfile__text'>{checkProfileCreated().phone}</p>
                </div>
                <div className='viewProfile__content'>
                    <h3 className='viewProfile__subHeading'>Email: </h3>
                    <p className='viewProfile__text'>{checkProfileCreated().email}</p>
                </div>
                
                {checkProfileCreated().profession? 
                <>  <div className='viewProfile__content'>
                        <h3 className='viewProfile__subHeading'>Profession: </h3>
                        <p className='viewProfile__text'>{checkProfileCreated().profession}</p>
                    </div>
                    <div className='viewProfile__content'>
                        <h3 className='viewProfile__subHeading'>Referee Name: </h3>
                        <p className='viewProfile__text'>{checkProfileCreated().refereeName}</p>
                    </div>
                    <div className='viewProfile__content'>
                        <h3 className='viewProfile__subHeading'>Referee Phone: </h3>
                        <p className='viewProfile__text'>{checkProfileCreated().refereePhone}</p>
                    </div>
                </>: ''}
            </>}
        </section>
    )
}
export default ViewProfile