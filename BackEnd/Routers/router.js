const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const {
  testController,
  getAllSums,
  addItemController,
  getAllItemsController,
  updateItemController,
  deleteItemController,
  signInController,
  signUpController,
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

router.get("/", getAllSums);
router.get("/add", testController);

// POST call for adding item to collection with file upload
router.post("/add-item", upload.single("itemImage"), addItemController);

router.post("/signup", signUpController);
router.post("/signin", signInController);
router.get("/items", getAllItemsController);
router.delete("/delete-item/:id", deleteItemController);

module.exports = router;
