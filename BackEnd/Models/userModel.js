const { client } = require('../Models/db');

const collection = client.db().collection("Users")

const addUserModel = async (user) => {
    return await collection.insertOne(user)
}

const getUserModel = async (email) => {
    return await collection.findOne({email})
}

module.exports = {
    addUserModel,
    getUserModel
}