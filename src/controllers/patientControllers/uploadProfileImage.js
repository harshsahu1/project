import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import Patient from '../../models/Patient.js';

const awsConnect = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

const uploadImage = (bucketName) =>
  multer({
    storage: multerS3({
      s3: awsConnect,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `${req.user.id}.png`);
      },
    }),
  });

const uploadProfileImage = (req, res) => {
  try {
    const uploadSingle = uploadImage(process.env.AWS_BUCKET_NAME_IMAGE).single(
      'profileImage'
    );

    uploadSingle(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ imgUpload: false, message: err.message });
      }
      // Update other profile fields
      let profile = await Patient.findOneAndUpdate(
        { patientId: req.user.id },
        {
          $set: {
            profileImage: req.file.location,
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      res.status(200).json({ data: profile });
    });
  } catch (err) {
    return res.status(400).json({ imgUpload: false, message: err.message });
  }
};

export default uploadProfileImage;
