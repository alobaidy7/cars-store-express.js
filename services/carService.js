const slugify = require('slugify');
const asyncHandler = require('express-async-handler');

const Cars = require('../models/CarModel');

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCars = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const cars = await Cars.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: cars.length, page, data: cars });
});

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCar = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const car = await Cars.findById(id);
  if (!car) {
    res.status(404).json({ msg: `No car for this id ${id}` });
  }
  res.status(200).json({ data: car });
});

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.createCar = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const model = req.body.model;
  const description = req.body.description;
  const available = req.body.available;
  const image = req.body.image;

  const car = await Cars.create({ name,model,description,available,image, slug: slugify(name) });
  res.status(201).json({ data: car });
});

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCar = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name,description,model,available } = req.body;

  const car = await Cars.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name),description,available,model },
    { new: true },
   
  );

  if (!car) {
    res.status(404).json({ msg: `No Car for this id ${id}` });
  }
  res.status(200).json({ data: car });
});

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCar = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const car = await Cars.findByIdAndDelete(id);

  if (!car) {
    res.status(404).json({ msg: `No car for this id ${id}` });
  }
  res.status(204).send();
});
