import React from 'react';
import check from '../../assets/icons/check.svg';

function SellerChecklist(){
    let sellerChecklist = [
        {id: 1, item: 'Check all the plumbings.'},
        {id: 2, item: 'Paint the house.'},
        {id: 3, item: 'Clean the rooms.'},
        {id: 4, item: 'Clean the garage.'},
        {id: 5, item: 'Mow the lawn.'},
        {id: 6, item: 'Check the basement for any leak.'},
        {id: 7, item: 'Remove unnecessay stuff from closets.'},
        {id: 8, item: 'Deep clean the kitchen.'},
    ]
    let sellerList = sellerChecklist.map(item =>{
        return(
            <div key={item.id} className='checklist__item'>
                <img className='checklist__icon' src={check} alt='checkmark'/>
                <p className='checklist__text' >{item.item}</p>
            </div>
        )
    })
    return(
        <section className='sellerChecklist'>
            <h2 className='checklist__heading'>Seller Checklist</h2>
            <p className='checklist__subHeading'>This checklist will help you to organize your tasks</p>
            {sellerList}       
        </section>
    )
}

export default SellerChecklist;