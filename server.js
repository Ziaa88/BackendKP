const express = require('express');
const dotenv = require('dotenv');
const Cookies = require('cookie-parser');
const sequelize = require('./config/database');
const path = require('path');
const cors = require('cors');

// Routes import
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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware CORS dengan dynamic origin check
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = process.env.CORS_URL?.split(' ') || [];
    if (!origin || process.env.CORS_URL === '*' || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: Origin ${origin} is not allowed.`));
    }
  },
  methods: process.env.CORS_METHODS?.split(' ') || ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.use(Cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder untuk upload file
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
app.use('/api/riwayat', riwayatRoutes);
app.use('/api/reservasi', reservasiRoutes);
app.use('/api/public', publicRoutes);


// Tambahkan route root '/' untuk pengecekan di browser
app.get('/', (req, res) => {
  res.send('Backend API is running');
});

// Export app untuk Vercel Serverless
if (process.env.VERCEL) {
  module.exports = app;
} else {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    sequelize.authenticate()
      .then(() => console.log('Database connected'))
      .catch(err => console.error('Database connection error:', err));
  });
}
