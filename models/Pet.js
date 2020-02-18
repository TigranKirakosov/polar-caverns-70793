const mongoose = require('mongoose');

const Types = mongoose.Schema.Types;

const PetSchema = new mongoose.Schema({
  animalKind: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  character: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  sponsor: {
    name: {
      type: String
    },
    id: {
      type: Types.ObjectId
    }
  },
  curator: {
    name: {
      type: String
    },
    id: {
      type: Types.ObjectId
    }
  },
  reviews: [
    {
      user: {
        type: Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  photoGallery: [
    {
      url: { type: String }
    }
  ],
  birthDate: {
    type: Date,
    required: true
  },
  shelterDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Pet = mongoose.model('pet', PetSchema);
