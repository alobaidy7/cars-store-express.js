const mongoose = require('mongoose');
// 1- Create Schema
const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Car Name required'],
      unique: [true, 'Car Name must be unique'],
      minlength: [3, 'Too short car name'],
      maxlength: [32, 'Too long car name'],
    },

    model: {
      type: String,
      required: [true, 'Model required'],
      minlength: [3, 'Too short'],
      maxlength: [5, 'Too long'],
    },

    available: {
      type: Boolean,
      required: [true, 'Available required'],
    
    },

    description: {
      type: String,
      minlength: [5, 'Too short'],
      maxlength: [255, 'Too long'],
    },
    
    // A and B => shoping.com/a-and-b
    slug: {
      type: String,
      lowercase: true,
    },
    
    image: String,
  },
  { timestamps: true }
);

// 2- Create model
const CarModel = mongoose.model('Cars', carSchema);

module.exports = CarModel;