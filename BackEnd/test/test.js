const { expect } = require("chai");
request = require("request");
const { ObjectId } = require('mongodb');
const fs = require("fs");
const path = require("path");


//Test for addItemController
describe("addItemController", () => {
  it("should add an item and return 201 status code", (done) => {
    const item = {
      title: "Test Item",
      description: "Test Description",
      date: new Date().toISOString(),
      location: "Test Location",
      userId: "someUserId",
    };

    const formData = {
      item: JSON.stringify(item),
      itemImage: {
        value: fs.createReadStream(path.join(__dirname, "../../FrontEnd/images/img1.png")),
        options: {
          filename: "img1.png",
          contentType: "image/png",
        },
      },
    };

    request.post(
      {
        url: "http://localhost:3000/add-item",
        formData: formData,
        body: JSON.stringify(item), 
      },
      function (error, response, body) {
        console.log({ error, response, body });

        const responseBody = JSON.parse(body);
        expect(response.statusCode).to.equal(201);
        expect(responseBody.message).to.equal("Item added successfully");
        done();
      }
    );
  });
});


//Test for getAllItemsController
describe("getAllItemsController", () => {
  it("should return all items and return 200 status code", (done) => {
    try {
      request('http://localhost:3000/items', function (error, response, dataString) {
        const resObj = JSON.parse(dataString);
        expect(resObj.statusCode).equal(201);
        expect(resObj.data).to.be.a('array');
        expect(resObj.message).to.equal("fetched all items successfully");
        done();
      })
    } catch (error) {
      console.error("Error while requesting data: ", error);
    }
  });
});

//Test for getItemByIdController
describe("getItemByIdController", () => {
  it("should return an item and return 200 status code", (done) => {
    request('http://localhost:3000/items/651be928f8aa8e9473b6cd5d', function (error, response, dataString) {
      const resObj = JSON.parse(dataString);
      expect(resObj.statusCode).equal(200);
      expect(resObj.data).to.be.a('object');
      expect(resObj.message).to.equal('fetched item successfully');
      done();
    })
  });
});

//Test for signUpController
describe("signUpController", () => {
  it("should sign up a user and return 200 status code", (done) => {
    const user = {
      firstname: "John",
      lastname: "Doe",
      phone: "1234567890",
      email: "john.doe@example.com",
      password: "password@123",
    }
    request.post({ url: 'http://localhost:3000/signup', json: true, body: user, }, function (error, response, data) {
      expect(data.statusCode).equal(200);
      expect(data.success).to.equal(true);
      expect(data.message).to.equal('User sign up successfully');
      done();
    });
  });
});

//Test for signInController
describe("signInController", () => {
  it("should sign in a user and return 200 status code", (done) => {
    const credential = {
      email: "john.doe@example.com",
      password: "password@123"
    }

    request.post({ url: 'http://localhost:3000/signin', json: true, body: credential }, function (error, response, data) {
      expect(data.statusCode).equal(200);
      expect(data.message).to.equal('User sign in successfully');
      expect(data.success).to.equal(true);
      expect(data.data).to.be.a('object');
      done();
    });
  });

  it("should not sign in a user and return 400 status code", (done) => {
    const credential = {
      email: "john.doe@example.com",
      password: "password123"
    }

    request.post({ url: 'http://localhost:3000/signin', json: true, body: credential }, function (error, response, data) {
      expect(data.statusCode).equal(400);
      expect(data.error).to.equal('Email or password incorrect');
      done();
    });
  });
});
