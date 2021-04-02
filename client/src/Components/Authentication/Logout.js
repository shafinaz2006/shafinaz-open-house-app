import React from 'react'
import axios from 'axios';
import './Authentication.scss';
import Cookies from 'js-cookie';

class Logout extends React.Component{

    state = {
        username: Cookies.get('username'),
    }
    logout = (e) =>{
        
        this.props.handleLogout();
    }
    render(){
        return(
            <section className='authentication'>
                {Cookies.get('username')? 
                <div className='authentication__logoutSection'>
                    <h2 className='authentication__heading'> Click to logout</h2>
                    <button className='link button' onClick={this.logout}> Logout </button>
                </div>:
                <div className='authentication__logoutSection'>
                    <h2 className='authentication__heading'> You have successfully logged out!!</h2>
                    <a href='/' className='link button' > Home </a>
                </div>
                }
            </section>
        );
    }
};
export default Logout;