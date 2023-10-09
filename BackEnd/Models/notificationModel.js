const { ObjectId } = require("mongodb");
const { client } = require("../Models/db");
const collection = client.db().collection("notifications");

const createNotificationModel = (notificationObj) => {
    return collection.insertOne(notificationObj);
};

const getNotificationsByIdModel = (userId) => {
    return collection.aggregate([
        {
          '$match': {
            'toUser': new ObjectId(userId),
            'isRead': false
          }
        }, {
          '$lookup': {
            'from': 'Users', 
            'localField': 'fromUser', 
            'foreignField': '_id', 
            'as': 'fromUser'
          }
        }, {
          '$unwind': {
            'path': '$fromUser', 
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$lookup': {
            'from': 'items', 
            'localField': 'item', 
            'foreignField': '_id', 
            'as': 'item'
          }
        }, {
          '$unwind': {
            'path': '$item', 
            'preserveNullAndEmptyArrays': true
          }
        }
      ]).toArray();

}

module.exports = { createNotificationModel, getNotificationsByIdModel };
