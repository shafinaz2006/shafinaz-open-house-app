
const express = require('express');
const router = express.Router();
// const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const fileUpload = require('express-fileupload');

router.use(express.json());
router.use(fileUpload());
router.use(express.static("public"));

// get all properties:

const getAllProperties = () => {
    const allProperties = fs.readFileSync('./data/properties.json');
    const parsedData = JSON.parse(allProperties);
    return parsedData;
};

// Get method:

router.get('/', (req, res) =>{
    let propertiesData = getAllProperties();
    if(propertiesData) res.status(200).send(propertiesData);
    else res.status(400).send('error in properties data');

})

// Post method:

router.post('/', (req, res) =>{
    
    let pic = req.files.image;
    let reqPath = path.join(__dirname, '../', 'public/myImages/');
    let imageCollection = [];
    for(let i = 0; i < pic.length; i++){
        pic[i].mv(reqPath + pic[i].name);
        imageCollection.push(`http://localhost:8080/public/myImages/${pic[i].name}`);
           
    }
    console.log(imageCollection);
    let newData ={
        street: req.body.street,
        image: imageCollection
    }
    
    fs.writeFileSync("./data/testData.json", JSON.stringify(newData));
    
    // if(newProperty) 
    res.send('new property');
    // else res.status(400).send('Error in new Property data');
})





module.exports = router;