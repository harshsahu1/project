import Appointment from '../../models/Appointments.js';
import User from '../../models/User.js';

// @route    POST patient/scheduleappointment
// @desc     schedule Appointments
// @access   Protected

const scheduleAppointment = async (req, res) => {
  try {
    const doctorId = req.query.id;
    const patientId = req.user.id;
    const { date } = req.body;

    let doc = await User.findById(doctorId);

    if (!doc) {
      return res.status(400).json({ errors: [{ msg: 'Doctor not Found' }] });
    }

    const appointment = new Appointment({
      patientId,
      doctorId,
      appointmentDate: date,
    });

    await appointment.save();
    res.json(appointment);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @route    POST patient/modifyappointment
// @desc     modify Appointments
// @access   Protected

const modifyAppointment = async (req, res) => {
  try {
    const appointmentId = req.query.id;
    const { newStatus } = req.body;
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        message: 'Appointment not found or does not belong to the patient',
      });
    }
    if (newStatus !== 'completed' && newStatus !== 'cancelled') {
      return res.status(400).json({
        message:
          'Invalid status. Allowed values are "completed" or "cancelled"',
      });
    }
    appointment.status = newStatus;
    await appointment.save();

    res.json({ message: 'Appointment status updated successfully' });
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { modifyAppointment, scheduleAppointment };
