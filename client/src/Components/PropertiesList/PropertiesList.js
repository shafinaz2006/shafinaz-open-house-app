import React from 'react';
import './PropertiesList.scss';
import Property from './Property';

const PropertiesList = (props) =>{
    if(props.properties) {
        return(
            <section className='properties'>
                <h1 className='properties__heading'> List of available properties </h1>
                <div className='properties__container'>
                    {props.properties.map(property => <Property key={property.propertyId} property={property}/>)}
                </div>
            </section> 
        )
    }else {
        return(
            <section style={{textAlign: 'center'}}><h1>Page loading</h1></section>
        )
    }
}
export default PropertiesList;