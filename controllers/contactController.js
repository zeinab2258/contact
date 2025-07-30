const Contact = require('../models/Contact');

// @desc    گرفتن تمام مخاطبین
// @route   GET /api/contacts
exports.getContacts = async (req, res, next) => {
  try {
    // ایجاد یک کوئری اولیه
    let query = {};

    // اگر کوئری name وجود داشت، به فیلتر اضافه کن
    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: 'i' }; // جستجوی غیرحساس به حروف
    }

    const contacts = await Contact.find(query);
    res.status(200).json({ success: true, count: contacts.length, data: contacts });
  } catch (err) {
    next(err);
  }
};

// @desc    ایجاد یک مخاطب جدید
// @route   POST /api/contacts
exports.createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ success: true, data: contact });
  } catch (err) {
    next(err); // ارسال خطا به errorHandler
  }
};

// @desc    گرفتن یک مخاطب با شناسه
// @route   GET /api/contacts/:id
exports.getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, error: 'مخاطب یافت نشد' });
    }
    res.status(200).json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

// @desc    به‌روزرسانی یک مخاطب
// @route   PUT /api/contacts/:id
exports.updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!contact) {
      return res.status(404).json({ success: false, error: 'مخاطب یافت نشد' });
    }
    res.status(200).json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

// @desc    حذف یک مخاطب
// @route   DELETE /api/contacts/:id
exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, error: 'مخاطب یافت نشد' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
