
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const fileUpload = require('express-fileupload');
const utils = require('./util-functions');

router.use(express.json());
router.use(fileUpload());
router.use(express.static("public"));

// Get method:

router.get('/', (req, res) =>{
    let propertiesData = utils.getAllProperties();
    if(propertiesData) res.status(200).send(propertiesData);
    else res.status(400).send('error in properties data');

})



module.exports = router;