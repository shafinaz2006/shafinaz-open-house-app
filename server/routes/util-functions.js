const fs = require('fs');

module.exports = {

    getAllUser: () => {
        const allUser = fs.readFileSync('./data/users.json');
        const parsedData = JSON.parse(allUser);
        return parsedData;
    },

    getAllUserProfiles: () =>{
        const allUser = fs.readFileSync('./data/userProfiles.json');
        const parsedData = JSON.parse(allUser);
        return parsedData;
    },

    getAllSellers: () =>{
        const allUser = fs.readFileSync('./data/userProfiles.json');
        let parsedData = JSON.parse(allUser);
        parsedData = parsedData.filter(data => data.type === 'seller')
        return parsedData;
    },

    getAllAssociates: () =>{
        const allUser = fs.readFileSync('./data/userProfiles.json');
        let parsedData = JSON.parse(allUser);
        parsedData = parsedData.filter(data => data.type === 'associate')
        return parsedData;
    },

    getAllProperties: () => {
        const allProperties = fs.readFileSync('./data/properties.json');
        const parsedData = JSON.parse(allProperties);
        return parsedData;
    },
}

