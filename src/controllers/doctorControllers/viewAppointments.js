import Appointment from '../../models/Appointments.js';

// @route    GET doctor/allappointments
// @desc     View all appointments
// @access   Protected

const allAppointments = async (req, res) => {
  try {
    const doctorId = req.user.id;

    const Appointments = await Appointment.find({ doctorId });

    res.json(Appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @route    GET doctor/scheduledappointments
// @desc     View all scheduled Appointments
// @access   Protected

const scheduledAppointments = async (req, res) => {
  try {
    const doctorId = req.user.id;

    const Appointments = await Appointment.find({
      doctorId,
      status: 'scheduled',
    });

    res.json(Appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @route    GET doctor/pastappointments
// @desc     View all past Appointments
// @access   Protected

const pastAppointments = async (req, res) => {
  try {
    const doctorId = req.user.id;

    const Appointments = await Appointment.find({
      doctorId,
      status: { $in: ['completed', 'cancelled'] }, // Use $in to match any of the specified values
    });

    res.json(Appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { allAppointments, scheduledAppointments, pastAppointments };
