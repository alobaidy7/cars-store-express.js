const express = require('express');

const {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
} = require('../services/carService');
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');

const router = express.Router();

router.route('/').get(getCars).post(verifyTokenAndAdmin,createCar);

router
  .route('/:id')
  .get(getCar)
  .put(verifyTokenAndAdmin,updateCar)
  .delete(deleteCar);

module.exports = router;
