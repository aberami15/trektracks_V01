// src/utils/seedData.js
const mongoose = require('mongoose');
require('dotenv').config();
const Place = require('../../models/Place');

const sriLankaPlaces = [
  {
    name: "Sigiriya",
    description: "Ancient rock fortress and palace ruin with frescoes located in central Sri Lanka. Built by King Kashyapa, it's one of Sri Lanka's most iconic UNESCO World Heritage sites.",
    category: "Cultural",
    location: {
      coordinates: {
        lat: 7.9570,
        lng: 80.7603
      }
    },
    images: ["https://example.com/images/sigiriya1.jpg", "https://example.com/images/sigiriya2.jpg"],
    openingHours: {
      open: "7:00",
      close: "17:30"
    },
    contactInfo: {
      phone: "+94 66 2286 601",
      email: "info@sigiriya.lk"
    }
  },
  {
    name: "Unawatuna Beach",
    description: "A beautiful beach near Galle, famous for its golden sand, coral reefs, and swimming-friendly waters. Popular for snorkeling, diving, and beach activities.",
    category: "Beach",
    location: {
      coordinates: {
        lat: 6.0100,
        lng: 80.2504
      }
    },
    images: ["https://example.com/images/unawatuna1.jpg", "https://example.com/images/unawatuna2.jpg"],
    openingHours: {
      open: "24/7",
      close: "24/7"
    },
    contactInfo: {
      phone: "+94 91 2224 324",
      email: "tourism@unawatuna.lk"
    }
  },
  {
    name: "Temple of the Sacred Tooth Relic",
    description: "Located in Kandy, this Buddhist temple houses the relic of the tooth of the Buddha and is a major pilgrimage site. The temple complex is part of the royal palace.",
    category: "Religious",
    location: {
      coordinates: {
        lat: 7.2936,
        lng: 80.6413
      }
    },
    images: ["https://example.com/images/tooth-temple1.jpg", "https://example.com/images/tooth-temple2.jpg"],
    openingHours: {
      open: "6:00",
      close: "20:00"
    },
    contactInfo: {
      phone: "+94 81 2234 226",
      email: "info@daladamaligawa.org"
    }
  },
  {
    name: "Ella Rock",
    description: "A famous hiking spot offering panoramic views of the surrounding hills and valleys. The hike takes about 4 hours round trip from Ella town.",
    category: "Adventure",
    location: {
      coordinates: {
        lat: 6.8667,
        lng: 81.0466
      }
    },
    images: ["https://example.com/images/ella-rock1.jpg", "https://example.com/images/ella-rock2.jpg"],
    openingHours: {
      open: "5:00",
      close: "18:00"
    },
    contactInfo: {
      phone: "+94 57 2228 739",
      email: "tourism@ella.lk"
    }
  },
  {
    name: "Yala National Park",
    description: "One of Sri Lanka's largest wildlife sanctuaries, famous for its high leopard density. The park features various ecosystems and abundant wildlife including elephants, crocodiles, and numerous bird species.",
    category: "Nature",
    location: {
      coordinates: {
        lat: 6.3735,
        lng: 81.5089
      }
    },
    images: ["https://example.com/images/yala1.jpg", "https://example.com/images/yala2.jpg"],
    openingHours: {
      open: "6:00",
      close: "18:00"
    },
    contactInfo: {
      phone: "+94 47 2220 076",
      email: "info@yalanationalpark.lk"
    }
  },
  {
    name: "Galle Fort",
    description: "A UNESCO World Heritage site built by the Portuguese and later fortified by the Dutch in the 16th century. Features colonial architecture, narrow streets, and ocean views.",
    category: "Cultural",
    location: {
      coordinates: {
        lat: 6.0257,
        lng: 80.2167
      }
    },
    images: ["https://example.com/images/galle-fort1.jpg", "https://example.com/images/galle-fort2.jpg"],
    openingHours: {
      open: "24/7",
      close: "24/7"
    },
    contactInfo: {
      phone: "+94 91 2223 065",
      email: "tourism@galle.lk"
    }
  },
  {
    name: "Adam's Peak",
    description: "A conical mountain with religious significance to multiple faiths. Known for its distinctive 'sacred footprint' and stunning sunrise views after climbing the 5,500 steps.",
    category: "Religious",
    location: {
      coordinates: {
        lat: 6.8096,
        lng: 80.4994
      }
    },
    images: ["https://example.com/images/adams-peak1.jpg", "https://example.com/images/adams-peak2.jpg"],
    openingHours: {
      open: "24/7",
      close: "24/7"
    },
    contactInfo: {
      phone: "+94 52 2222 797",
      email: "info@sripada.lk"
    }
  }
];

// Connect to MongoDB
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding');

    // Clear existing data
    await Place.deleteMany({});
    console.log('Cleared existing places data');

    // Insert new data
    const result = await Place.insertMany(sriLankaPlaces);
    console.log(`Successfully inserted ${result.length} places`);

    console.log('Seeding completed successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();