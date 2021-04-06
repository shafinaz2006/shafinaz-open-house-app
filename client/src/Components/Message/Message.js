import React from 'react';
import './Message.scss';
import Cookies from 'js-cookie';

class Message extends React.Component{
    state={
        message: '',
        receiverId: this.props.seller.userId,
        receiverName: this.props.seller.name,
        senderId: Cookies.get('userId'),
        senderName: Cookies.get('username'),
    }
    closeMessageBox = (event) =>{
        // event.preventDefault();
        // console.log('in message box close button event');
        this.props.handleCloseMessageBox();
    }

    handleChange = (event) => {
        this.setState({ message: event.target.value })
    }
    submitMessage = (event) =>{
        event.preventDefault();
        let newMessage ={
            senderId: this.state.senderId,
            senderName: Cookies.get('username'),
            receiverId: this.state.receiverId,
            receiverName: this.state.receiverName,
            message: this.state.message
        }
        this.setState({message: ''});
        this.props.handleMessageForm(newMessage);
        this.closeMessageBox();
    }
    render(){
        let receiver;
        if(this.props.seller){
            receiver = {...this.props.seller};
        } else if(this.props.associate){
            receiver = {...this.props.associate};
        }
        // console.log(receiver.name, receiver.phone)
        return(
            <section className={ `message ${this.props.seller? 'message--seller': 'message--associate'}`}>
                <div className='message__closeButtonDiv'>
                    <button className='button button--msgCancel message__cancelBtn' onClick={this.closeMessageBox}/>
                </div>
                <h1 className='message__heading'> Message Box </h1>
                {receiver? <div className='message__receiverInfo'>
                            <p className='message__text'>To: <span className='message__receiverName'>{receiver.name}</span></p>
                            <p className='message__phone'>Phone: {receiver.phone}</p>
                        </div>: ''}
                                
                <form className='message__senderInfo' onSubmit={this.submitMessage}>
                    <h3 className='message__subHeading'>Your information: </h3>
                    <label htmlFor='senderName' className='input-label'>Name: 
                        <input className='input input--message'name='senderName' id='senderName' defaultValue={this.state.senderName}/>
                    </label>
                    <label htmlFor='message' className='input-label'>Message: 
                        <input className='input input--message'name='message' id='message' placeholder='message' onChange={this.handleChange} />
                    </label>
                    <input className='button button--message-send' type='submit' value='Send' />
                </form>
                
            </section>
        )
    }
}

export default Message;