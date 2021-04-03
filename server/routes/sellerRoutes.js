const express = require('express');
const router = express.Router();
// const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const utils = require('./util-functions')
router.use(express.json());

// get all sellers:

router.get('/', (req, res) =>{
    
    let sellersData = utils.getAllSellers();
    if(sellersData) res.status(200).send(sellersData);
    else res.status(400).send('sellers data not found');
})

module.exports = router;