require("dotenv").config();
console.log(process.env.MONGODB_URI);

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index.js");
const fs = require("fs");
const path = require("path");
const { expect } = chai;
chai.use(chaiHttp);

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

    chai
      .request(app)
      .post("/addItem")
      .field("item", JSON.stringify(item))
      .attach(
        "itemImage",
        fs.readFileSync(path.join(__dirname, "../../FrontEnd/images/img1.png")),
        "img1.png"
      )

      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal("Item added successfully");
        done();
      });
  });
});

//Test for getAllItemsController
describe("getAllItemsController", () => {
  it("should return all items and return 200 status code", (done) => {
    chai
      .request(app)
      .get("/items")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("fetched all items successfully");
        done();
      });
  });
});

//Test for getItemByIdController
describe("getItemByIdController", () => {
  it("should return an item and return 200 status code", (done) => {
    chai
      .request(app)
      .get("/items/:id")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("fetched item successfully");
        done();
      });
  });
});

//Test for updateItemController
describe("updateItemController", () => {
  it("should update an item and return 200 status code", (done) => {
    chai
      .request(app)
      .put("/items/:id")
      .send({
        item: {
          title: "Test Item",
          description: "Test Description",
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Item updated successfully");
        done();
      });
  });
});

//Test for deleteItemController
describe("deleteItemController", () => {
  it("should delete an item and return 200 status code", (done) => {
    chai
      .request(app)
      .delete("/items/:id")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Item deleted successfully");
        done();
      });
  });
});

//Test for signUpController
describe("signUpController", () => {
  it("should sign up a user and return 200 status code", (done) => {
    chai
      .request(app)
      .post("/signUp")
      .send({
        firstname: "John",
        lastname: "Doe",
        phone: "1234567890",
        email: "john.doe@example.com",
        password: "password",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("User sign up successfully");
        done();
      });
  });
});

//Test for signInController
describe("signInController", () => {
  it("should sign in a user and return 200 status code", (done) => {
    chai
      .request(app)
      .post("/signIn")
      .send({
        email: "john.doe@example.com",
        password: "password",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("User sign in successfully");
        done();
      });
  });
});
