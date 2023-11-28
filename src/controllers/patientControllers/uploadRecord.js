import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import Patient from '../../models/Patient.js';

const awsConnect = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

const uploadRecord = async (req, res) => {
  try {
    const patient = await Patient.findOne({ patientId: req.user.id });
    let set_len = 0;
    if (patient) {
      set_len = patient.prevRecords.length;
    }

    const uploadfile = (bucketName) =>
      multer({
        storage: multerS3({
          s3: awsConnect,
          bucket: bucketName,
          metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
          },
          key: function (req, file, cb) {
            const timestamp = Date.now();
            cb(null, `${req.user.id}_${set_len}.pdf`);
          },
        }),
      });

    const uploadSingle = uploadfile(process.env.AWS_BUCKET_NAME_FILE).single(
      'record'
    );

    uploadSingle(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ fileUpload: false, message: err.message });
      }
      // Update other profile fields
      let profile = await Patient.findOneAndUpdate(
        { patientId: req.user.id },
        { $push: { prevRecords: req.file.location } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      res.status(200).json({ data: profile });
    });
  } catch (err) {
    return res.status(400).json({ fileUpload: false, message: err.message });
  }
};

export default uploadRecord;
