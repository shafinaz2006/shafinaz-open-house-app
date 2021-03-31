const express = require('express');
const router = express.Router();
// const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

router.use(express.json());

// get all user:

const getAllUser = () => {
    const allUser = fs.readFileSync('./data/users.json');
    const parsedData = JSON.parse(allAssociates);
    return parsedData;
};

module.exports = router;