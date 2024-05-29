const Media = require('../models/media');
const route = require('express').Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose')
const fs = require('fs')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './media');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext); // Mengubah nama file agar sesuai dengan field yang diharapkan di frontend
    },
});

// https://www.youtube.com/embed/hwVo_JF7UgI

const upload = multer({ storage: storage });

route.post('/add-media', upload.single('gambar'), async (req, res) => {
    try {
        const { narasi, link } = req.body;
        if (!narasi || !link) {
            return res.status(400).json({ message: 'Narasi dan Link diperlukan' });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'Gambar tidak ditemukan' });
        }

        const newMedia = new Media({
            narasi,
            link,
            gallery: req.file.filename,
        });
        const saveMedia = await newMedia.save();
        res.status(200).json({ event: saveMedia, message: 'Event berhasil disimpan' });
    } catch (error) {
        console.error("Error proses pengiriman data:", error);
        res.status(500).json({ error: error.message });
    }
});

route.get('/get-media/:id', async (req, res) => {
    try {
        const mediaId = req.params.id
        if (!mongoose.Types.ObjectId.isValid(mediaId)) {
            return res.status(400).json({ error: 'ID media tidak valid.' });
        }
        const media = await Media.findById(mediaId);
        if (!media) {
            return res.status(404).json({ error: 'media tidak ditemukan.' });
        }
        res.status(200).json(media);
    } catch (error) {
        console.error('Error fetching media by ID:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data media.' });
    }
})

route.get('/get-media', async (req, res) => {
    try {
        const medias = await Media.find();
        res.status(200).json(medias);
    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data media.' });
    }
});

route.delete('/delete-media/:id', async (req, res) => {
    try {
        const mediaId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(mediaId)) {
            return res.status(400).json({ error: "ID tidak ditemukan" });
        }
        const media = await Media.findById(mediaId);
        if (!media) {
            return res.status(404).json({ error: 'media tidak ditemukan' });
        }
        if (media.gambar) {
            // Menghapus file gambar dari direktori media
            fs.unlinkSync(path.join(__dirname, './      media', media.gambar));
        }
        await media.deleteOne({ _id: mediaId });
        res.status(200).json({ message: 'media berhasil dihapus' });
    } catch (error) {
        console.error('Error Deleting media:', error);
        res.status(500).json({ error: 'terjadi kesalahan saat menghapus data' });
    }
});

module.exports = route;
