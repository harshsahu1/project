import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';
import User from '../../models/User.js';

dotenv.config();

// @route    POST user/signup
// @desc     Register user
// @access   Public

const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, email, password, role } = req.body;

  try {
    let user = await User.findOne({ username: username });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Username not available' }] });
    }

    user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Email already registerd' }] });
    }
    user = new User({
      username,
      email,
      password,
      role,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export default signUp;
