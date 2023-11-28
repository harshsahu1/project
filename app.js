import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './src/configs/connectDB.js';
import userRoutes from './src/routes/userRoutes/users.js';
import patientRoutes from './src/routes/patientRoutes/patients.js';
import doctorRoutes from './src/routes/doctorRoutes/doctor.js';

dotenv.config();

const app = express();
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('Healthy');
});

app.use('/user', userRoutes);
app.use('/patient', patientRoutes);
app.use('/doctor', doctorRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
