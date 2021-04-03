
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

router.get('/:userId/properties', (req, res) =>{
    let propertiesData = utils.getAllProperties();
    console.log(req.params.userId);
    let userPropertyData = propertiesData.filter(property => property.seller.userId === req.params.userId)
    if(userPropertyData) res.status(200).send(userPropertyData);
    else res.status(400).send('error in properties data');

})

// Post method:

router.post('/:userId/properties/:propertyId', (req, res) =>{
    let imageCollection = [];
    console.log(req.files)
    if(req.files){
        let pic = req.files.image;
        let reqPath = path.join(__dirname, '../', 'public/myImages/');
        console.log('pic', pic.length);
        if(pic.length){
            for(let i = 0; i < pic.length; i++){
                console.log('inside image for loop')
                pic[i].mv(reqPath + pic[i].name);
                imageCollection.push(`http://localhost:8080/myImages/${pic[i].name}`);  
            }
        } else {
            pic.mv(reqPath + pic.name);
            imageCollection.push(`http://localhost:8080/myImages/${pic.name}`);  
        }
        
        
    }else {
        imageCollection.push('http://localhost:8080/myImages/house-icon.svg');
    }
    console.log(imageCollection);
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
    console.log('userid in post property, ', req.body.sellerId);
    let allSellers = utils.getAllSellers();
    let sellerInfo = allSellers.find(user => user.userId === req.body.sellerId);
    if(sellerInfo){   newProperty.seller = {name: sellerInfo.name, phone: sellerInfo.phone, email: sellerInfo.email}}
    else {
        let allUsers = utils.getAllUser();
        let userInfo = allUsers.find(user => user.userId === req.body.sellerId);
        console.log(userInfo.username);
        if(!userInfo){   newProperty.user ={userId: req.body.sellerId}}
        else { newProperty.seller = {userId: req.body.sellerId, name: userInfo.username}}
    }
    console.log('newData before adding to file', newProperty) 
    let propertiesData = utils.getAllProperties();
    // propertiesData.unshift(newProperty);
    console.log(propertiesData)
    // fs.writeFileSync("./data/properties.json", JSON.stringify(propertiesData));
    if(newProperty) res.send('new property');
    else res.status(400).send('Error in new Property data');
})





module.exports = router;