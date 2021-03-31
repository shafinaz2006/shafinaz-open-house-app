import React from 'react';
import './Hero.scss';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();

const items = [
    <div className='hero__image hero__image-1' onDragStart={handleDragStart}>
        <p className='hero__text'> Recent renovation increases house value!! </p>
    </div>,
    <div className='hero__image hero__image-2' onDragStart={handleDragStart}>
        <p className='hero__text'> Brighten your space with fresh paints!! </p>
    </div>,
    <div className='hero__image hero__image-3' onDragStart={handleDragStart}>
        <p className='hero__text'> Contact our associates for free consultation!! </p>
    </div>,
    <div className='hero__image hero__image-4' onDragStart={handleDragStart}>
        <p className='hero__text'> Buying/Selling is just one click away!! </p>
    </div>
];


const Hero =() =>{
    return(
        <header className='header__carousel'>
            <AliceCarousel 
                autoPlay
                autoPlayStrategy="none" autoPlayControls
                autoPlayInterval={3000}
                animationDuration={1000}
                animationType="fadeout"
                infinite disableButtonsControls mouseTracking items={items} 
            />
        </header>
    )
}
export default Hero;