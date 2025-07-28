const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'نام مخاطب الزامی است'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'ایمیل الزامی است'],
    unique: true, // هر ایمیل باید یکتا باشد
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'لطفا یک ایمیل معتبر وارد کنید',
    ],
  },
  phone: {
    type: String,
    required: [true, 'شماره تلفن الزامی است'],
  },
  relationship: {
    type: String,
    enum: ['خانواده', 'دوست', 'همکار', 'سایر'], // مقادیر مجاز
    default: 'سایر',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Contact', ContactSchema);