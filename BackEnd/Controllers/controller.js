const { testModel, getAllSumModel } = require("../Models/itemModel");

const getAllSums = async (req, res) => {
    try {
        const data = await getAllSumModel();
        console.log("data: ", data);
        res.status(200).json({data, message: 'fetched all data'})
    } catch (error) {
        console.log('Error is getAllSums: ', error);
    }
}

const testController = async (req, res) => {
    try {
        console.log('controller works!');
        const obj = {
            num1: parseInt(req.query.num1),
            num2: parseInt(req.query.num2),
            sum: parseInt(req.query.num1) + parseInt(req.query.num2)
        }
        const response = await testModel(obj);
        res.status(201).json({ statusCode: 201, message: 'Numbers and their sum saved successfully', data: response.insertedId });

    } catch (error) {
        console.log('Error in testController: ', error);
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });

    }
}

module.exports = { testController, getAllSums }