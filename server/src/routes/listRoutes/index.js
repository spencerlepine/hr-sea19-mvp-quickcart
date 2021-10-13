const express = require('express');
const {
  generateList,
  removeListItem,
  saveEntireList,
  updateExistingList,
  fetchUserLists,
} = require('../../controllers/list');

const router = express.Router();

router.get('/generate', generateList);
router.delete('/remove', removeListItem);
router.post('/save', saveEntireList);
router.put('/update', updateExistingList);
router.get('/user', fetchUserLists);

module.exports = router;
