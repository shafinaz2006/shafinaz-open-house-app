import React from 'react';
import UserProperty from './UserProperty';
import './PropertiesList.scss';

const UserPropertiesList = (props) =>{
    // console.log(props.properties);
    let userProperties = [...props.properties];
    return(
        <section className='properties'>
            <h1 className='properties__heading'>List of your properties</h1>
            {userProperties.length>0?
            <div className='properties__container'>
                
                {userProperties.map(property => 
                    <UserProperty key={property.propertyId} property={property}/>
                )}
            </div>: 
            <h3 className= 'properties__heading properties__heading--status'> 
                You don't have any listed property 
            </h3>}
        </section>
    )
}
export default UserPropertiesList;