import { Router } from 'express';
import signUp from '../../controllers/userControllers/SignUp.js';
import signIn from '../../controllers/userControllers/SignIn.js';
import auth from '../../middlewares/auth.js';
import { check } from 'express-validator';

const router = Router();

// SignUp route
router.post(
  '/signup',
  check('username', 'username is required').notEmpty(),
  check('email', 'Please include a valid email!').isEmail(),
  check('role', 'Role is required').notEmpty(),
  check(
    // TO-DO STRONG PASSWORD CHECK
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  signUp
);

// SignIn route
router.post(
  '/signin',
  check('usernameOrEmail', 'usernameOrEmail is required').notEmpty(),
  check('password', 'Password must not be empty'),
  signIn
);

export default router;
