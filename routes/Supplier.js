const express = require('express');
const router = express.Router();
const SupplierController = require('../controllers/SupplierController');

const upload = require('../Helpers/image-upload')


router.post('/new', upload.single('images'), SupplierController.create);
router.put("/new/:id", SupplierController.updateById)
router.delete("/new/:id" , SupplierController.removeById)
router.get("/consultas" , SupplierController.getAll)
router.get("/new/:id", SupplierController.getById);



module.exports = router;
