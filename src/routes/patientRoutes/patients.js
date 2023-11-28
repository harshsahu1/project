import { Router } from 'express';
import auth from '../../middlewares/auth.js';
import { check, body } from 'express-validator';
import updateProfile from '../../controllers/patientControllers/updateProfile.js';
import {
  allAppointments,
  scheduledAppointments,
  pastAppointments,
} from '../../controllers/patientControllers/viewAppointments.js';

import {
  modifyAppointment,
  scheduleAppointment,
} from '../../controllers/patientControllers/scheduleAppointment.js';

import {
  viewAllRecords,
  viewRecords,
} from '../../controllers/patientControllers/viewMedicalRecord.js';

import uploadProfileImage from '../../controllers/patientControllers/uploadProfileImage.js';
import uploadRecord from '../../controllers/patientControllers/uploadRecord.js';

const router = Router();

// Update or Create Patient Profile
router.post(
  '/update',
  auth,
  body('contact_number')
    .if(body('contact_number').exists())
    .matches(/^(\+91|0)?[6789]\d{9}$/)
    .withMessage('Invalid contact number'),
  updateProfile
);

// view all Appointments
router.get('/allappointments', auth, allAppointments);

// view scheduled Appointments
router.get('/scheduledappointments', auth, scheduledAppointments);

// view past Appointments
router.get('/pastappointments', auth, pastAppointments);

// schedule Appointments
router.post('/scheduleappointments', auth, scheduleAppointment);

// modify Appointments
router.post('/modifyappointments', auth, modifyAppointment);

// view all Records
router.get('/viewallrecords', auth, viewAllRecords);

// view doctor_id Records
router.get('/viewrecords', auth, viewRecords);

// upload Profile image
router.post('/uploadimg', auth, uploadProfileImage);

// upload Record
router.post('/uploadrecord', auth, uploadRecord);

export default router;
