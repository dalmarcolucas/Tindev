const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async index(req, res){
        const loggedDev = await Dev.findById(req.headers.user);

        const devs = await Dev.find({
            $and: [
               { _id: { $ne: loggedDev._id }},
               { _id: { $nin: loggedDev.likes }},
               { _id: { $nin: loggedDev.dislikes }},
            ]
        });

        return res.json(devs);
    },

    async store(req, res){
        const { username } = req.body;

        const userExists = await Dev.findOne({user: username});

        if(userExists) {
            return res.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);

        const {name, bio, avatar_url: avatar} = response.data;

        const dev = await Dev.create({
            name: name,
            user: username,
            bio: bio,
            avatar: avatar
        });

        return res.json(dev);

    }
};  