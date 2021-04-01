const fs = require('fs');
module.exports = {

    getAllUser: () => {
        const allUser = fs.readFileSync('./data/users.json');
        const parsedData = JSON.parse(allUser);
        return parsedData;
    },

    getAllSellers: () =>{
        const allSeller = fs.readFileSync('./data/seller.json');
        const parsedData = JSON.parse(allSeller);
        return parsedData;
    },

    getAllAssociates: () =>{
        const allAssociates = fs.readFileSync('./data/associates.json');
        const parsedData = JSON.parse(allAssociates);
        return parsedData;
    },

    getAllProperties: () => {
        const allProperties = fs.readFileSync('./data/properties.json');
        const parsedData = JSON.parse(allProperties);
        return parsedData;
    },

    isloggedIn: (req, res, next) =>{
        console.log('inside isLoggedin func', req.user);
        if(!req.isAuthenticated()){
            return res.redirect('/authentication');
        }
        next();
    
    }
}

