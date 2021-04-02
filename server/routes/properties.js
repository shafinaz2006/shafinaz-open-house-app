
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

// Post method:

router.post('/', (req, res) =>{
    let imageCollection = [];
    if(req.files){
        let pic = req.files.image;
        let reqPath = path.join(__dirname, '../', 'public/myImages/');
        
        for(let i = 0; i < pic.length; i++){
            pic[i].mv(reqPath + pic[i].name);
            imageCollection.push(`http://localhost:8080/myImages/${pic[i].name}`);  
        }
        console.log(imageCollection);
    }else {
        imageCollection.push('http://localhost:8080/myImages/house-icon.svg');
    }
    
    let newProperty={
        propertyId: uuidv4(),
        address:{
            street: req.body.street,
            city: req.body.city,
        },
        rooms: parseInt(req.body.rooms),
        washrooms: parseInt(req.body.washrooms),
        description: req.body.description,
        recentUpgrade: req.body.recentUpgrade,
        askingPrice: req.body.askingPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
        images: imageCollection
    }
    let allSellers = utils.getAllSellers();
    let sellerInfo = allSellers.find(seller => seller.userId === req.body.sellerId);
    if(!sellerInfo){   newProperty.seller ={userId: req.body.sellerId}}
    else { newProperty.seller = {...sellerInfo}; }
    console.log('newData before adding to file', newProperty) 
    let propertiesData = utils.getAllProperties();
    propertiesData.unshift(newProperty);
    fs.writeFileSync("./data/properties.json", JSON.stringify(propertiesData));
    if(newProperty) res.send('new property');
    else res.status(400).send('Error in new Property data');
})





module.exports = router;