import React from 'react';
import './DeleteProperty.scss';

function DeleteProperty(){
    return(
        <section className='deleteProperty'>
            <h3 className="deleteProperty__heading deleteProperty__heading--status"> The property is deleted</h3>
            <a href='/home' className="link button button--auth">Home</a>
        </section>
    )
}
export default DeleteProperty;