const express = require('express');
const productsController = require('../controllers/products.controller')
const router = express.Router();
const multer = require('multer');
const path = require("path");
const productController = require('../controllers/products.controller');

let storage = multer.diskStorage({
	destination: (req, file, cb) => { 
        cb(null, path.join(__dirname,'../../public/images' ))
	},

	filename: (req, file, cb) => { 
        const newFilename = file.fieldname + Date.now() + "-" + path.extname(file.originalname);
		cb(null, newFilename);
    }
})  

let upload = multer({storage: storage});


//Crud
router.get("/", productsController.menu);
router.get("/detail/:id", productsController.detail);
router.get("/create", productsController.create);
router.post("/create", upload.single("image"), productsController.store);
router.get("/edit/:id", productController.edit);
router.put("/edit/:id", productController.update);


// Get carrito page

router.get('/carrito', productsController.carrito);

// Get Reservar page

router.get('/reservar', productsController.reservar);

// Get pedir page

router.get('/pedir', productsController.pedir);

module.exports = router;
