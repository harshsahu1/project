import Doctor from '../../models/Doctor.js';
import { validationResult } from 'express-validator';

// @route    POST doctor/update
// @desc     Update or Create user profile
// @access   Protected

const updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  const { name, specialization, contact_number } = req.body;

  if (req.user.role !== 'doctor') {
    return res.status(400).json({ message: 'Invalid User Entry' });
  }

  const newprofile = {
    doctorId: req.user.id,
    name,
    specialization,
    contact_number,
  };

  try {
    let profile = await Doctor.findOneAndUpdate(
      { doctorId: req.user.id },
      { $set: newprofile },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
};

export default updateProfile;
