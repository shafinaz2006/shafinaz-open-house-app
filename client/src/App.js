import React from 'react';
import './App.scss';

import Header from './Components/Header/Header';
import Hero from './Components/Hero/Hero';
import Main from './Components/Main/Main';
import Footer from './Components/Footer/Footer';


function App(){
    return (
        <div className="App">
            <Header />
            <Hero />
            <Main />
            <Footer />
        </div>
    );   
}

export default App;
