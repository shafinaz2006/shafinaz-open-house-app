import React from 'react'
// import './Authentication.scss';

function Authentication(){
    return(
        <section className='authentication'>
            <h3 className='authentication__heading'> If you are not a member, then please register. </h3>
            <a className='link button authentication__link' href='/register'>Register </a>
            <h3 className='authentication__heading'> If you are a member, then please login. </h3>
            <a className='link button authentication__link' href='/login'>Login </a>
        </section>
    )
}

export default Authentication;