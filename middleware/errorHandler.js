const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // لاگ کردن خطا در کنسول برای توسعه‌دهنده
  console.error(err.stack);

  // خطای Mongoose برای کلید تکراری (Duplicate Key)
  if (err.code === 11000) {
    const message = 'این ایمیل قبلا ثبت شده است';
    error = { statusCode: 400, message };
  }

  // خطای Mongoose برای اعتبارسنجی (Validation Error)
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = { statusCode: 400, message };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'خطای سرور',
  });
};

module.exports = errorHandler;