const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    filePath: { type: String, required: true }, // Path to the file on disk/cloud
    mimeType: { type: String, required: true }, // e.g., 'application/pdf', 'image/jpeg'
    fileSize: { type: Number, required: true }, // Size in bytes
    uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Material', MaterialSchema);