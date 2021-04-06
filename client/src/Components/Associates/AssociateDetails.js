import React from 'react';
import './AssociateList.scss';
import profilePic from '../../assets/icons/profileIcon.svg'
import Message from '../Message/Message';

class AssociateDetails extends React.Component{
    state ={
        displayMessgeBox: false,
    }
    openMessageBox = (event) =>{
        event.preventDefault();
        this.setState({displayMessgeBox: true});
    }
    handleCloseMessageBox = (event) =>{
        
        this.setState({displayMessageBox: false});
        window.location.reload();
    }
    render(){
        
        let associate = {...this.props.associate};
        
        let firstName= associate.name.split(' ')[0];
        let associateInfo = {name: associate.name, phone: associate.phone}
        console.log(associateInfo)
    return(
        <section className='associateDetails'>
            <div className='associateDetails__profilePicDiv'>
                <img src={profilePic} alt='profilePic' className='associateDetails__profilePic'/>
            </div>
            <div className='associateDetails__info'>
                <h3 className='associateDetails__name'> {associate.name}</h3>
                <p className='associateDetails__prof'>{associate.profession}</p>
                <p className='associateDetails__phone'>{associate.phone}</p>
                <p className='associateDetails__email'>{associate.email}</p>
                <h4 className='associateDetails__referee'>Referee information:</h4>
                <h4 className='associateDetails__refName'>Name: {associate.refereeName}</h4>
                <p className='associateDetails__refPhone'>{associate.refereePhone}</p>
                <div className='associateDetails__userButtons'>
                    <button className='button button--associateConnect' onClick={this.openMessageBox}>Message {firstName} </button>
                </div>
            </div>
            {this.state.displayMessgeBox?<Message 
                associate={associateInfo} handleCloseMessageBox={this.handleCloseMessageBox}/>: ''}

        </section>
    )
    }
}
export default AssociateDetails