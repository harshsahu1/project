import MedicalRecord from '../../models/Medical_record.js';

const viewRecords = async (req, res) => {
  const doctorId = req.query.id;
  try {
    const records = await MedicalRecord.findOne({ doctorId });
    if (!records) {
      return res.json({ message: 'No records' });
    }
    res.json(records);
  } catch (err) {
    console.error('Error creating record:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const viewAllRecords = async (req, res) => {
  try {
    const patientId = req.user.id;
    const records = await MedicalRecord.findOne({ patientId });
    if (!records) {
      return res.json({ message: 'No records' });
    }
    res.json(records);
  } catch (err) {
    console.error('Error creating record:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { viewAllRecords, viewRecords };
