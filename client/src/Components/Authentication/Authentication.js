import React from 'react'
import './Authentication.scss';

function Authentication(){
    return(
        <section className='authentication authentication__registerAndLogin'>
            <h3 className='authentication__heading'> Please register, if you are not a member. </h3>
            <a className='link button button--auth' href='/register'>Register </a>
            <h3 className='authentication__heading'> Please login, if you are a member. </h3>
            <a className='link button button--auth' href='/login'>Login </a>
        </section>
    )
}

export default Authentication;