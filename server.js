const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');

// بارگذاری متغیرهای محیطی
dotenv.config();

// وارد کردن مسیرهای API
const contactRoutes = require('./routes/contactRoutes');

// اتصال به دیتابیس
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

const app = express();

// میدل‌ور برای خواندن JSON
app.use(express.json());

// مسیر اصلی API
app.use('/api/contacts', contactRoutes);

// استفاده از میدل‌ور مدیریت خطا
// این باید آخرین میدل‌ور در زنجیره باشد
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});