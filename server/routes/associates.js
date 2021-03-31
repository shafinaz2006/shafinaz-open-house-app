const express = require('express');
const router = express.Router();
// const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

router.use(express.json());

// get all associates:

const getAllAssociates = () => {
    const allAssociates = fs.readFileSync('./data/associates.json');
    const parsedData = JSON.parse(allAssociates);
    return parsedData;
};

router.get('/', (req, res) =>{
    let associatesData = getAllAssociates();
    if(associatesData) res.status(200).send(associatesData);
    else res.status(400).send('error in associates data');
})

module.exports = router;