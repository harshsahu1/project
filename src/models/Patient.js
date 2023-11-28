import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    contact_number: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    prevRecords: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
