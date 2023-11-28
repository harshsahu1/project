import Patient from '../../models/Patient.js';
import { validationResult } from 'express-validator';

// @route    POST patient/update
// @desc     Update or Create user profile
// @access   Protected

const updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  const { name, date_of_birth, gender, contact_number, address } = req.body;

  if (req.user.role !== 'patient') {
    return res.status(400).json({ message: 'Invalid User Entry' });
  }

  try {
    let profile = await Patient.findOne({ patientId: req.user.id });

    // Update other profile fields
    profile = await Patient.findOneAndUpdate(
      { patientId: req.user.id },
      {
        $set: {
          name,
          date_of_birth,
          gender,
          contact_number,
          address,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
};

export default updateProfile;
