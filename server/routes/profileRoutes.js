const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const utils = require('./util-functions');

router.use(express.json());

// create Profile Post Request:

router.post('/', (req, res) =>{
    // console.log('in create-profile', req.body);
    let newData = {
        userId: req.body.userId,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
    }
    if(req.body.type === "Seller"){
        newData.type = 'seller';
    } else {
        newData.type = 'associate';
        newData.profession= req.body.profession;
        newData.refereeName= req.body.refereeName;
        newData.refereePhone= req.body.refereePhone;
    }
    const allUserProfiles = utils.getAllUserProfiles();
    allUserProfiles.push(newData);
    fs.writeFileSync("./data/userPrifiles.json", JSON.stringify(allUserProfiles));

    // const allSellers = utils.getAllSellers();
    // const allAssociates = utils.getAllAssociates();
    // if(req.body.type === 'Seller'){
    //     newData.type = 'seller';
    //     allSellers.push(newData);
    //     fs.writeFileSync("./Data/seller.json", JSON.stringify(allSellers));
    // }else {
    //     newData.profession= req.body.profession;
    //     newData.refereeName= req.body.refereeName;
    //     newData.refereePhone= req.body.refereePhone;
    //     allAssociates.push(newData);
    //     fs.writeFileSync("./Data/associates.json", JSON.stringify(allAssociates));
    // }
    if(allUserProfiles)  res.status(200).send({userProfiles: allUserProfiles, sellers: allSellers, associates: allAssociates} );
    else res.status(400).send('in Error');
})

module.exports = router;