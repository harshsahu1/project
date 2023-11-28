import Appointment from '../../models/Appointments.js';

// @route    GET patient/allappointments
// @desc     View all appointments
// @access   Protected

const allAppointments = async (req, res) => {
  try {
    const patientId = req.user.id;

    const Appointments = await Appointment.find({ patientId });

    res.json(Appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @route    GET patient/scheduledappointments
// @desc     View all scheduled Appointments
// @access   Protected

const scheduledAppointments = async (req, res) => {
  try {
    const patientId = req.user.id;

    const Appointments = await Appointment.find({
      patientId,
      status: 'scheduled',
    });

    res.json(Appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @route    GET patient/pastappointments
// @desc     View all past Appointments
// @access   Protected

const pastAppointments = async (req, res) => {
  try {
    const patientId = req.user.id;

    const Appointments = await Appointment.find({
      patientId,
      status: { $in: ['completed', 'cancelled'] }, // Use $in to match any of the specified values
    });

    res.json(Appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { allAppointments, scheduledAppointments, pastAppointments };
