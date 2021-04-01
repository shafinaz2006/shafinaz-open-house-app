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
        userId: uuidv4(),
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
    }
    if(req.body.type === 'Seller'){
        newData.type = 'seller';
        const allSellers = utils.getAllSellers();
        allSellers.push(newData);
        fs.writeFileSync("./Data/seller.json", JSON.stringify(allSellers));
    }else {
        newData.profession= req.body.profession;
        newData.refereeName= req.body.refereeName;
        newData.refereePhone= req.body.refereePhone;
        const allAssociates = utils.getAllAssociates();
        allAssociates.push(newData);
        fs.writeFileSync("./Data/associates.json", JSON.stringify(allAssociates));
    }
    res.send('In create profile post route');
})

module.exports = router;