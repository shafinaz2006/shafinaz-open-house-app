
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

// Get property for a user:

router.get('/:userId/properties', (req, res) =>{
    let propertiesData = utils.getAllProperties();
    // console.log(req.params.userId);
    let userPropertyData = propertiesData.filter(property => property.seller.userId === req.params.userId)
    if(userPropertyData) res.status(200).send(userPropertyData);
    else res.status(400).send('error in properties data');

})

// create property for a user: 

router.post('/:userId/properties', (req, res) =>{
    let imageCollection = [];
    if(req.files){
        let pic = req.files.image;
        let reqPath = path.join(__dirname, '../', 'public/myImages/');
        if(pic.length){
            for(let i = 0; i < pic.length; i++){
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
    // console.log(imageCollection);
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
    let allUserProfiles = utils.getAllUserProfiles();
    let sellerInfo = allUserProfiles.find(user => user.userId === req.params.userId);
    if(sellerInfo){  
        newProperty.seller = {
            userId: sellerInfo.userId, 
            name: sellerInfo.name,                           
            phone: sellerInfo.phone, 
            email: sellerInfo.email
        }
    }
    else {
        let allUsers = utils.getAllUser();
        let userInfo = allUsers.find(user => user.userId === req.body.sellerId);
        if(!userInfo){   newProperty.user ={userId: req.params.userId}}
        else { 
            newProperty.seller = {
                userId: req.body.sellerId, 
                name: userInfo.username
            }
        }
    }
    // console.log('newData before adding to file', newProperty) 
    let propertiesData = utils.getAllProperties();
    propertiesData.unshift(newProperty);
    fs.writeFileSync("./data/properties.json", JSON.stringify(propertiesData));
    let updatedUserPropertyData = propertiesData.filter(property =>property.seller.userId === req.params.userId)

    if(propertiesData) res.send({properties: propertiesData, userProperties: updatedUserPropertyData});
    else res.status(400).send('Error in new Property data');
})


// PUT method:

router.put('/:userId/properties/:propertyId/edit', (req, res) =>{
    let propertiesData = utils.getAllProperties();
    let imageCollection = [];
    if(req.body.newImageCol){
        imageCollection = [...req.body.newImageCol];
    }
    if(req.files){
        let pic = req.files.image;
        let reqPath = path.join(__dirname, '../', 'public/myImages/');
        if(pic.length){
            for(let i = 0; i < pic.length; i++){
                pic[i].mv(reqPath + pic[i].name);
                imageCollection.push(`http://localhost:8080/myImages/${pic[i].name}`);  
            }
        } else {
            pic.mv(reqPath + pic.name);
            imageCollection.push(`http://localhost:8080/myImages/${pic.name}`);  
        }
    }
    if(!imageCollection.length){
        imageCollection.push('http://localhost:8080/myImages/house-icon.svg');
    }
    // console.log(imageCollection);
    let updatedProperty={
        propertyId: req.body.propertyId,
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
    let allUserProfiles = utils.getAllUserProfiles();
    let sellerInfo = allUserProfiles.find(user => user.userId === req.params.userId);
    if(sellerInfo){  
        updatedProperty.seller = {
            userId: sellerInfo.userId, 
            name: sellerInfo.name,                           
            phone: sellerInfo.phone, 
            email: sellerInfo.email
        }
    }
    else {
        let allUsers = utils.getAllUser();
        let userInfo = allUsers.find(user => user.userId === req.body.sellerId);
        if(!userInfo){   newProperty.user ={userId: req.params.userId}}
        else { 
            updatedProperty.seller = {
                userId: req.body.sellerId, 
                name: userInfo.username
            }
        }
    }    
    // console.log('property before adding in db', updatedProperty);
    let updatedPropertiesData = propertiesData.map(property => property.propertyId === updatedProperty.propertyId? updatedProperty : property );
    fs.writeFileSync("./data/properties.json", JSON.stringify(updatedPropertiesData));
    let updatedUserPropertyData = propertiesData.filter(property =>property.seller.userId === req.params.userId)

    if(propertiesData) res.send({properties: propertiesData, userProperties: updatedUserPropertyData});
    else res.status(400).send('Error in edit Property data');
})

// delete method:

router.delete('/:userId/properties/:propertyId', (req, res) =>{
    let propertiesData = utils.getAllProperties();
    let updatedPropertyData = propertiesData.filter(property =>property.propertyId !== req.params.propertyId)
    let updatedUserPropertyData = updatedPropertyData.filter(property =>property.seller.userId === req.params.userId)
    fs.writeFileSync("./data/properties.json", JSON.stringify(updatedPropertyData));

    if(updatedPropertyData) res.status(200).send({properties: updatedPropertyData, userProperties: updatedUserPropertyData});
    else res.status(400).send('Error in delete Property');
})

// Message get:

router.get('/:userId/messages', (req, res) =>{
    let allMessages =  utils.getAllMessages();
    let userMessages = allMessages.filter(message => message.receiverId === req.params.userId)
    if(userMessages) res.status(200).send({messages: userMessages});
    else res.status(400).send('error in message data');
})

// Message post:

router.post('/:userId/messages', (req, res) =>{
    let newMessage ={
        messageId: uuidv4(),
        senderId: req.params.userId || uuidv4(),
        senderName: req.body.senderName,
        receiverId: req.body.receiverId,
        receiverName: req.body.receiverName,
        message: req.body.message
    }
    console.log(newMessage)
    let allMessages =  utils.getAllMessages();
    allMessages.unshift(newMessage);
    fs.writeFileSync("./data/messages.json", JSON.stringify(allMessages));
    if(newMessage) res.send({messages: allMessages});
    else res.status(400).send('Error in edit Property data');

})

module.exports = router;