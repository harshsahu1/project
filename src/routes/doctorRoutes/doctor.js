import { Router } from 'express';
import auth from '../../middlewares/auth.js';
import { check, body } from 'express-validator';
import updateProfile from '../../controllers/doctorControllers/updateProfile.js';
import Doctor from '../../models/Doctor.js';
import {
  allAppointments,
  scheduledAppointments,
  pastAppointments,
} from '../../controllers/doctorControllers/viewAppointments.js';
import createRecord from '../../controllers/doctorControllers/createMedicalRecord.js';
import viewRecord from '../../controllers/doctorControllers/viewMedicalRecords.js';
import {
  scheduleAppointment,
  modifyAppointment,
} from '../../controllers/doctorControllers/scheduleAppointment.js';
import uploadProfileImage from '../../controllers/doctorControllers/uploadProfileImage.js';

const router = Router();

// Update or Create doctor Profile
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

// create Medical Record
router.post('/createrecord', auth, createRecord);

// view Medical Records
router.get('/viewrecord', auth, viewRecord);

// schedule Appointments
router.post('/scheduleappointments', auth, scheduleAppointment);

// modify Appointments
router.post('/modifyappointments', auth, modifyAppointment);

// upload profile image
router.post('/uploadimg', auth, uploadProfileImage);

export default router;
