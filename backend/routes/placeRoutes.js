// src/routes/placeRoutes.js
const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');
const Place = require('../models/Place');

// GET /api/places - Get all places
router.get('/', placeController.getAllPlaces);

// GET /api/places/search - Search places
// IMPORTANT: This route replaces the controller-based search with a direct implementation
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    // Improved search with word boundaries and case insensitivity
    const places = await Place.find({
      $or: [
        // Exact category match (case-insensitive)
        { category: { $regex: new RegExp(`^${query}$`, 'i') }},
        // Name contains query (case-insensitive) 
        { name: { $regex: new RegExp(query, 'i') }},
        // Only match description if it has the complete word
        { description: { $regex: new RegExp(`\\b${query}\\b`, 'i') }}
      ]
    });

    res.json({
      status: 'success',
      results: places.length,
      data: places
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'An error occurred during search' 
    });
  }
});

// GET /api/places/category/:category - Get places by category
router.get('/category/:category', placeController.getPlacesByCategory);

// GET /api/places/nearby - Get nearby places
router.get('/nearby', placeController.getNearbyPlaces);

// GET /api/places/:id - Get a specific place
router.get('/:id', placeController.getPlace);

// POST /api/places - Create a new place
router.post('/', placeController.createPlace);

module.exports = router;