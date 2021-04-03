import React from 'react';
import './PropertiesList.scss';
import UserProperty from './UserProperty';


const UserPropertiesList = (props) =>{
    console.log(props.match.params.userId);
    console.log(props.properties);
    console.log(props.properties[0].seller.userId);
    let propertyList = [];
    let allProperties = [...props.properties];
    propertyList = allProperties.filter(property => {
        return property.seller.userId === props.match.params.userId
    })
    
    if(propertyList){
        console.log(propertyList)
    }else {
        console.log('propertyList not found');
    }
    return(
        <section className='properties'>
            <h1 className='properties__heading'> List of your properties </h1>
            {propertyList.length>0?
            
            <div className='properties__container'>
            
                {propertyList.map(property =>{
                    return <UserProperty key = {property.propertyId} 
                                property = {property}/>
                }) }
            </div>: <h3 className= 'properties__subHeading'> You don't have any listed property </h3>}
        </section>
    )
}
export default UserPropertiesList;