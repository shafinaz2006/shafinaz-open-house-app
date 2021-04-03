import React from 'react';
import './Checklist.scss';
import check from '../../assets/icons/check.svg';


function BuyerChecklist(){
    let buyerChecklist = [
        {id: 1, item: 'When the furnace was updated?How old is the furnace?'},
        {id: 2, item: 'How the water system works?'},
        {id: 3, item: 'What is the air condition system?'},
        {id: 4, item: 'Check all the kitchen appliances'},
        {id: 5, item: 'What is the condition of flooring? Carpet or hardwood?'},
        {id: 6, item: 'If carpet, when it was cleaned last time?'},
        {id: 7, item: 'Check kitchen tiles. Are they all okay or need to be replaced?'},
        {id: 8, item: 'Do they have garage?'},
        {id: 9, item: 'What is the condition of roof?'},
    ]
    let buyerList = buyerChecklist.map(item =>{
        return(
            <div key={item.id} className='checklist__item'>
                <img className='checklist__icon' src={check} alt='checkmark'/>
                <p className='checklist__text' >{item.item}</p>
            </div>
        )
    })
    return(
        <section className='checklist sellerChecklist'>
            <h2 className='checklist__heading'>Buyer Checklist</h2>
            <h3 className='checklist__subHeading'>This checklist will help you to organize your tasks</h3>
            {buyerList}       
        </section>
    )
}
export default BuyerChecklist;