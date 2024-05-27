/* const express = require("express");
const user = express.Router();  // Change to express.Router()

const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

user.use(bodyParser.urlencoded({ extended: true }));
user.use(bodyParser.json());  // Added to parse JSON body
user.use(express.static(path.resolve(__dirname, 'public')));

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
});

var upload = multer({ storage: storage });

const userController = require('../controllers/userController');

user.post('/importUser', upload.single('file'), userController.importUser);
user.post('/getBalance', userController.getBalance);  // New route for balance

module.exports = user;
*/

const express = require("express");
const user = express.Router();

const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

user.use(bodyParser.urlencoded({ extended: true }));
user.use(express.static(path.resolve(__dirname, 'public')));

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

const userController = require('../controllers/userController');

user.post('/importUser', upload.single('file'), userController.importUser);
user.post('/getBalance', userController.getBalance);

module.exports = user;
