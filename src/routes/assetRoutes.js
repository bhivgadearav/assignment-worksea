const express = require('express');
const multer = require('multer');
const assetController = require('../controllers/assetControllers');

const router = express.Router();
const upload = multer({ dest: 'src/uploads/' });

router.post('/upload', upload.single('file'), assetController.uploadAsset);
router.get('/assets', assetController.getAssets);
router.delete('/asset/:id', assetController.deleteAsset);

module.exports = router;
