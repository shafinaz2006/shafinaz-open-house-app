import React from 'react'
import './MessageBox.scss';

function MessageBox(props) {
    
    if (props.userMessages && props.userMessages.messages.length !==0) {
        return (
            <section className='messagebox'>
                <h1 className='messagebox__heading'>Your messages: </h1>
                <div>
                    {props.userMessages.messages.map(message =>
                        <div className='messagebox__messageDiv' key={message.messageId}>
                            <h3 className='messagebox__subHeading'>
                                From: {message.senderName}
                            </h3>
                            <p className='messagebox__text'>{message.message}</p>
                        </div>
                    )}
                </div>
            </section>
        )
    } else if(props.userMessages.messages.length===0){
        return (
            <section style={{ textAlign: 'center' }}><h1>Your message box is empty</h1></section>
        )
    }
    else {
        return (
            <section style={{ textAlign: 'center' }}><h1>Page loading</h1></section>
        )
    }
}
export default MessageBox;