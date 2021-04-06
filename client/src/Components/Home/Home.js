import React from 'react';
import './Home.scss';
import logo from '../../assets/icons/home_black.svg';

const Home = () =>{
    return(
        <section className='home'>
            <h1 className='home__heading'>Who we are?</h1>
            
            <p className='home__text'>
                <img src={logo} alt={logo} className='logo' />
                We are a platform for homer sellers, potential home buyers and other professionals.  
            </p>
            <p className='home__text'>
                <img src={logo} alt={logo} className='logo' /> 
                We want to save commission fee for an agent (3% to 7%), which can be $50,000(average) 
                for a $M house. 
            </p>
            <p className='home__text'>
                <img src={logo} alt={logo} className='logo' />
                We help you by providing expert consulations from our associates.
            </p>
            <p className='home__text'>
                <img src={logo} alt={logo} className='logo' />
                We give you the opportunity, to connect people when you want to buy or sell a house. 
            </p>   
            <p className='home__text'>
                <img src={logo} alt={logo} className='logo' />
                Our goal is to give you an unique experience of buying and selling a house without hiring an agent. 
            </p>        
        </section>
    )
}
export default Home;