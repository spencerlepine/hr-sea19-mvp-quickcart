const express = require('express');
const {
  generateList,
  removeListItem,
  saveEntireList,
  updateExistingList,
} = require('../../controllers/list');

const router = express.Router();

router.get('/generate', generateList);
router.delete('/remove', removeListItem);
router.post('/save', saveEntireList);
router.put('/update', updateExistingList);

module.exports = router;
