import MedicalRecord from '../../models/Medical_record.js';

const viewRecord = async (req, res) => {
  const patientId = req.query.id;

  try {
    const records = await MedicalRecord.findOne({ patientId });
    res.json(records);
  } catch (err) {
    console.error('Error creating record:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default viewRecord;
