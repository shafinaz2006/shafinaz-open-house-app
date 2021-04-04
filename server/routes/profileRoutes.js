const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const utils = require('./util-functions');

router.use(express.json());

// Profile Get Request:

router.get('/', (req, res) =>{
    const allUserProfiles = utils.getAllUserProfiles();
    if(allUserProfiles)  res.status(200).send({userProfiles: allUserProfiles} );
    else res.status(400).send('in Error');
})

// create Profile Post Request:

router.post('/', (req, res) =>{
    
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
    fs.writeFileSync("./data/userProfiles.json", JSON.stringify(allUserProfiles));

    let allSellers = utils.getAllSellers();
    let allAssociates = utils.getAllAssociates();
    if(allUserProfiles)  res.status(200).send({userProfiles: allUserProfiles, sellers: allSellers, associates: allAssociates} );
    else res.status(400).send('in Error');
})

module.exports = router;