import React from 'react';
import './PropertiesList.scss';
import UserProperty from './UserProperty';


const UserPropertiesList = (props) =>{
    
    console.log(props.properties);
   
    let userProperties = [...props.properties];
    
    return(
        <section className='properties'>
            <h1 className='properties__heading'> List of your properties </h1>
            {userProperties.length>0?
            <div className='properties__container'>
                {userProperties.map(property =>{
                    return <UserProperty key = {property.propertyId} 
                                property = {property}/>
                }) }
            </div>: <h3 className= 'properties__subHeading'> You don't have any listed property </h3>}
        </section>
    )
}
export default UserPropertiesList;