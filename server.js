const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const Cookies = require('cookie-parser');
const multer = require('multer');
const sequelize = require('./config/database');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const spesialisasiRoutes = require('./routes/spesialisasiRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const jadwalDokterSpesialisasiRoutes = require('./routes/jadwalDokterSpesialisasiRoutes');
const jadwalDokterUmumRoutes = require('./routes/jadwalDokterUmumRoutes');
const publicRoutes = require('./routes/publicRoutes');
const riwayatRoutes = require('./routes/riwayatRoutes');
const reservasiRoutes = require('./routes/reservasiRoutes');
const footerRoutes = require('./routes/footerRoutes');
const cors = require('cors');
const path = require('path');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(
  cors({
    origin:
      process.env.CORS_URL === '*'
        ? '*'
        : process.env.CORS_URL?.split(' '),
    methods:
      process.env.CORS_METHODS === '*'
        ? '*'
        : process.env.CORS_METHODS?.split(' '),
  })
);
app.use(Cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/spesialisasi', spesialisasiRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/jadwal-dokter-spesialisasi', jadwalDokterSpesialisasiRoutes);
app.use('/api/jadwal-dokter-umum', jadwalDokterUmumRoutes);
app.use('/api/footer', footerRoutes);

// user
app.use('/api/riwayat', riwayatRoutes);
app.use('/api/reservasi', reservasiRoutes);

// public
app.use('/api/public', publicRoutes);

// Tambahkan route root '/' untuk pengecekan di browser
app.get('/', (req, res) => {
  res.send('Backend API is running');
});

if (process.env.VERCEL) {
  // Di Vercel, export app sehingga fungsi serverless dapat memproses request
  module.exports = app;
} else {
  // Untuk development lokal
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    sequelize.authenticate().then(() => console.log('Database connected'));
  });
}