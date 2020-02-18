const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Pet = require('../../models/Pet');

/*  @route   POST api/pets
    @desc    Register pet
    @access  Public
*/
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('description', 'Please include a description')
      .not()
      .isEmpty(),
    check('birthDate', 'Please include a birth date')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, birthDate } = req.body;

    try {
      let pet = await Pet.findOne({ name });

      if (pet) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Pet already registered' }] });
      }

      pet = new Pet({
        name,
        description,
        birthDate
      });

      await pet.save();

      res.json({ petId: pet.id });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

/*  @route   GET api/pets/:pet_id
    @desc    Get pet by ID
    @access  Public
*/
router.get('/:pet_id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.pet_id);
    res.json(pet);
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId') {
      res.status(404).json({ errors: [{ msg: 'Pet not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

/*  @route   GET api/pets
    @desc    Get all pets
    @access  Public
*/
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find().populate('pet', [
      'name',
      'description',
      'birthDate',
      'date'
    ]);
    res.json(pets);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
