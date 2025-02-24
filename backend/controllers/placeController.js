// controllers/placeController.js
const Place = require('../models/Place');

// Get all places
exports.getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json({
      status: 'success',
      results: places.length,
      data: places
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get a single place
exports.getPlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({
        status: 'error',
        message: 'Place not found'
      });
    }
    res.status(200).json({
      status: 'success',
      data: place
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Create a new place
exports.createPlace = async (req, res) => {
  try {
    const newPlace = await Place.create(req.body);
    res.status(201).json({
      status: 'success',
      data: newPlace
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Search places
exports.searchPlaces = async (req, res) => {
  try {
    const { query, category } = req.query;
    let searchQuery = {};

    if (query) {
      searchQuery.name = { $regex: query, $options: 'i' };
    }

    if (category) {
      searchQuery.category = category;
    }

    const places = await Place.find(searchQuery);
    
    res.status(200).json({
      status: 'success',
      results: places.length,
      data: places
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};