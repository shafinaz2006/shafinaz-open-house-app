import React from 'react';
import './PropertiesList.scss';
import Property from './Property';

const PropertiesList = ({properties}) =>{

    return(
        <section className='properties'>
            <h1 className='properties__heading'> List of available properties </h1>
            <div className='properties__container'>
            {
                properties.map(property =>{
                    return <Property key = {property.propertyId} 
                                property = {property}/>
                })
            }
            </div>
        </section>
    )
}
export default PropertiesList;