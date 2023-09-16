const { ObjectId } = require('mongodb');
const { client } = require('../Models/db');

const collection = client.db().collection('items');

const testModel = (data) => {
    return collection.insertOne(data);
}

const getAllSumModel = () => {
    return collection.find().toArray();
}

const addItemModel = (item) => {
    return collection.insertOne(item)
}

const getItemsModel = () => {
    //aggregation pipeline to add user's info in item document  
    return collection.aggregate([
        {
            '$lookup': {
                'from': 'users',
                'localField': 'user',
                'foreignField': '_id',
                'as': 'user'
            }
        }, {
            '$unwind': {
                'path': '$user',
                'preserveNullAndEmptyArrays': true
            }
        }
    ]).toArray();
}

const updateItemModel = (id, item) => {
    return collection.updateOne({ _id: new ObjectId(id) }, { $set: item });
}

const deleteItemModel = (id) => {
    return collection.deleteOne({ _id: new ObjectId(id) });
}
module.exports = { testModel, getAllSumModel, addItemModel, getItemsModel, updateItemModel, deleteItemModel }