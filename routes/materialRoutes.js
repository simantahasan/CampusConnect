const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Material = require('../models/Material');

// Configure Multer for file storage (saves files to the 'uploads/materials' directory)
const storage = multer.diskStorage({
  destination: './uploads/materials',
  filename: (req, file, cb) => {
    // Creates a unique filename: timestamp-originalfilename
    cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`);
  }
});
const upload = multer({ storage: storage });

// --- API Endpoints ---

// 1. UPLOAD Study Material (POST /api/materials/upload)
router.post('/upload', upload.single('materialFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }
        
        // Placeholder User ID (Replace with ID from Authentication/Token)
        const userId = req.body.userId || '60c728b7f1981e0015b6d5f1'; 

        const newMaterial = new Material({
            userId: userId,
            title: req.body.title,
            description: req.body.description,
            filePath: req.file.path,
            mimeType: req.file.mimetype,
            fileSize: req.file.size
        });

        const material = await newMaterial.save();
        res.status(201).json({ msg: 'Material uploaded successfully', material });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. GET All Study Materials (GET /api/materials)
router.get('/', async (req, res) => {
    try {
        const materials = await Material.find().sort({ uploadedAt: -1 });
        res.status(200).json(materials);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. DOWNLOAD Study Material (GET /api/materials/download/:id)
router.get('/download/:id', async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);

        if (!material) {
            return res.status(404).json({ msg: 'Material not found' });
        }

        // Use Express's res.download to initiate file download
        const absolutePath = path.resolve(material.filePath);
        res.download(absolutePath, material.title, (err) => {
            if (err) {
                // If the file is not found on disk, or other download error
                console.error("Download Error:", err);
                res.status(500).send({ msg: "Could not download the file, or file not found on server." });
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;