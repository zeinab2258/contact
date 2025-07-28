const express = require('express');
const {
  getContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');

const router = express.Router();

router.route('/')
  .get(getContacts)
  .post(createContact);

router.route('/:id')
  .get(getContactById)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;