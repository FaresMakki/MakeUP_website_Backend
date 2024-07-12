const express = require('express');
const picture = require('../Controller/Picture');
const router = express.Router();

router.post('/add', picture.createPicture);
router.get('/getall', picture.getAllPictures);
router.get('/get/:id', picture.getPictureById);
router.get('/getbyprod/:id', picture.getPictureByproductid);
router.get('/getmainpicture', picture.getmainpictures);
router.post('/update/:id', picture.updatePicture);
router.post('/delete/:id', picture.deletePicture);

module.exports = router;
