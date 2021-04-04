const express = require('express');
const router = express.Router();
// const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const utils = require('./util-functions');

router.use(express.json());


router.get('/', (req, res) =>{
    let associatesData = utils.getAllAssociates();
    if(associatesData) res.status(200).send(associatesData);
    else res.status(400).send('associates data not found');
})

module.exports = router;