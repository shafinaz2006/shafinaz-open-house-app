import React from 'react';
import Associate from './Associate';
import './AssociateList.scss';

const AssociateList = ({associates}) => {
    // console.log(associates);
    return(
        <section className='associateList'>
            <h2 className='associateList__heading'>Meet Our Associates</h2>
            {
                associates.map(associate =>{
                    return <Associate key={associate.userId}
                                associate={associate}/>
                })
            }

        </section>
    )
};
export default AssociateList;