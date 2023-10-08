
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const {
  addItemController,
  getAllItemsController,
  updateItemController,
  deleteItemController,
  signInController,
  signUpController,
  getItemByIdController
} = require("../Controllers/controller");

const router = express.Router();

// Create the directory if not exists
const dir = path.join(__dirname, "../FrontEnd/images/uploadedImage");
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Create storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../FrontEnd/images/uploadedImage/");
  },
  filename: function (req, file, cb) {
    const fileaName = Date.now() + "-" + file.originalname;
    cb(null, fileaName);
  },
});

const upload = multer({ storage: storage });
// POST call for adding item to collection with file upload
router.post("/add-item", upload.single("itemImage"), addItemController);

router.post("/signup", signUpController);
router.post("/signin", signInController);

//GET call to fetch all items
router.get("/items", getAllItemsController);

//GET call to fetch single item by id
router.get("/items/:id", getItemByIdController);

//DELETE call to delete item by id
router.delete("/delete-item/:id", deleteItemController);

module.exports = router;

