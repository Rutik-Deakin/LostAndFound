const { ObjectId } = require("mongodb");
const { createNotificationModel, getNotificationsByIdModel } = require("../Models/notificationModel");

const createNotificationController = async (req, res) => {
    try {
        let notificationObj = req.body.notificationObj || {};
        console.log("Called: ", notificationObj);
        if (Object.keys(notificationObj).length && notificationObj.toUser && notificationObj.fromUser) {
            notificationObj = { ...notificationObj, toUser: new ObjectId(notificationObj.toUser), fromUser: new ObjectId(notificationObj.fromUser), item: new ObjectId(notificationObj.item) };
            const response = await createNotificationModel(notificationObj);
            return res.status(201).json({
                statusCode: 201,
                message: "Notification added successfully",
                data: response.insertedId,
            });
        } else {
            throw 'Data error';
        }
    } catch (error) {
        return res
            .status(400)
            .json({ statusCode: 400, error: "Inappropriate data provided" });
    }
}

const getNotificationsByIdController = async (req, res) => {
    const id = req.params.id || "";
    const notifications = await getNotificationsByIdModel(id);
    return res.status(201).json({
        statusCode: 201,
        message: "Notification fetched successfully",
        data: notifications,
    });

}

module.exports = {
    createNotificationController,
    getNotificationsByIdController
};
