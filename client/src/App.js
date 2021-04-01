import React from 'react';
import './App.scss';

import Header from './Components/Header/Header';
import Hero from './Components/Hero/Hero';
import Main from './Components/Main/Main';
import Footer from './Components/Footer/Footer';
import Cookies from 'js-cookie';


function App(){
    const handleCookie = (user, id) =>{
        console.log('in cookies set', user, id);
        Cookies.set('username', user, {expires: 1})
        Cookies.set('userId', id, {expires: 1})
    }
    return (
        <div className="App">
            <Header />
            <Hero />
            <Main handleCookie={(user, id) =>handleCookie(user, id)}/>
            <Footer />
        </div>
    );   
}

export default App;
