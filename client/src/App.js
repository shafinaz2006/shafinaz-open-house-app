import React from 'react';
import './App.scss';
import Cookies from 'js-cookie';

// Components:

import Header from './Components/Header/Header';
import Hero from './Components/Hero/Hero';
import Main from './Components/Main/Main';
import Footer from './Components/Footer/Footer';


class App extends React.Component {
    state = {
        sessionUser:Cookies.get('username'),
        sessionUserId: Cookies.get('userId'),
    }

// setting Cookie username and userId after Login/Register:

    setCookie = (user, id) => {
        let name = user[0].toUpperCase() + user.slice(1);
        Cookies.set('username', name, { expires: 1 })
        Cookies.set('userId', id, { expires: 1 })
        this.setState({sessionUser: Cookies.get('username'), sessionUserId: Cookies.get('userId')});
    }

// setting Cookie username and userId after Logout:

    // removeCookie = () =>{
    //     Cookies.remove('username');
    //     Cookies.remove('userId');
    //     this.setState({sessionUser: '', sessionUserId: ''});
    // }
    render() {
        return (
            <div className="App">
                <Header sessionUser={this.state.sessionUser} />
                <Hero />
                <Main handleCookie={(user, id) => this.setCookie(user, id)} sessionUser={this.state.sessionUser} 
                      handleRemoveCookie={this.removeCookie}/>
                <Footer />
            </div>
        );
    }
}

export default App;
