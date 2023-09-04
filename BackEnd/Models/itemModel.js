const { client } = require('../Models/db');

const collection  = client.db().collection('test');

const testModel = (data) => {
    return collection.insertOne(data);
}

const getAllSumModel = () => {
    return collection.find().toArray();
}
module.exports = {testModel, getAllSumModel}