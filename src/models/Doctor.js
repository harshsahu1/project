import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    contact_number: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
