import React from 'react';
import './Message.scss';

class Message extends React.Component{
    closeMessageBox = (event) =>{
        // event.preventDefault();
        console.log('in message box close button event');
        this.props.handleCloseMessageBox();
    }
    render(){
        let receiver;
        if(this.props.seller){
            receiver = {...this.props.seller};
        } else if(this.props.associate){
            receiver = {...this.props.associate};
        }
        console.log(receiver.name, receiver.phone)
        return(
            <section className={ `message ${this.props.seller? 'message--seller': 'message--associate'}`}>
                <div className='message__closeButtonDiv'>
                    <button className='button button--msgCancel message__cancelBtn' onClick={this.closeMessageBox}/>
                </div>
                <h1 className='message__heading'> Message Box </h1>
                {receiver? <div className='message__receiverInfo'>
                            <p className='message__text'>Send to: <span className='message__receiverName'>{receiver.name}</span></p>
                            <p className='message__phone'>Phone: {receiver.phone}</p>
                        </div>: ''}
                <form className='message__senderInfo'>
                    <h3 className='message__subHeading'>Your information: </h3>
                    <label htmlFor='senderName' className='input-label'>Name: 
                        <input className='input input--message'name='senderName' id='senderName' placeholder='name'/>
                    </label>
                    <label htmlFor='senderPhone' className='input-label'>Phone: 
                        <input className='input input--message'name='senderName' id='senderName' placeholder='phone'/>
                    </label>
                    <label htmlFor='message' className='input-label'>Message: 
                        <input className='input input--message'name='message' id='message' placeholder='message'/>
                    </label>
                    <input className='button button--message-send' type='submit' value='Send'/>
                </form>
                
            </section>
        )
    }
}

export default Message;