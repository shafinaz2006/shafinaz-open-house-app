
const express = require('express');
const router = express.Router();
// const { v4: uuidv4 } = require('uuid');
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

// Post method:

router.post('/', (req, res) =>{
    if(req.files.image){
        let pic = req.files.image;
        let reqPath = path.join(__dirname, '../', 'public/myImages/');
        let imageCollection = [];
        for(let i = 0; i < pic.length; i++){
            pic[i].mv(reqPath + pic[i].name);
            imageCollection.push(`http://localhost:8080/public/myImages/${pic[i].name}`);  
        }
        console.log(imageCollection);
    }
    
    let newProperty={
        propertyId: uuidv4(),
        address:{
            street: req.body.street,
            city: req.body.city,
        },
        rooms: req.body.rooms,
        washrooms: req.body.washrooms,
        description: req.body.description,
        recentUpgrade: req.body.recentUpgreade,
        image: imageCollection
    }
    let allSellers = utils.getAllSellers();

    let sellerInfo = allSellers.find(seller => seller.userId === req.body.sellerId);

    newProperty.seller = {...sellerInfo};
    console.log('newData before adding to file', newProperty) 
    // fs.writeFileSync("./data/testData.json", JSON.stringify(newProperty));
    
    // if(newProperty) 
    res.send('new property');
    // else res.status(400).send('Error in new Property data');
})





module.exports = router;