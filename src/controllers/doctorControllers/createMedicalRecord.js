import MedicalRecord from '../../models/Medical_record.js';

const createRecord = async (req, res) => {
  const patientId = req.query.id;
  const doctorId = req.user.id;

  const { symptoms, diagnosis, medications, notes } = req.body;

  const newRecord = new MedicalRecord({
    patientId: req.query.id,
    doctorId: req.user.id,
    symptoms,
    diagnosis,
    medications,
    notes,
  });
  try {
    await newRecord.save();
    return res.json(rec);
  } catch (err) {
    console.error('Error creating record:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default createRecord;
