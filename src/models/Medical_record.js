import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model for the patient
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor', // Reference to the Doctor model
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    symptoms: {
      type: [String], // Array of symptoms
    },
    diagnosis: {
      type: String,
    },
    medications: {
      type: [String], // Array of prescribed medications
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);

export default MedicalRecord;
