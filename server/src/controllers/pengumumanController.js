const path = require('path');
const Pengumuman = require('../models/pengumuman');
const route = require('express').Router();
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './pengumuman');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
});

const upload = multer({ storage: storage });

route.post('/add-pengumuman', upload.single('thumbnail'), async (req, res) => {
    try {
        const { judul, tanggal, keterangan } = req.body;
        const poin = [];

        for (const key in req.body) {
            if (key.startsWith('poin')) {
                poin.push(req.body[key]);
            }
        }

        if (req.file) {
            const newPengumuman = new Pengumuman({
                judul,
                tanggal,
                keterangan,
                poin,
                thumbnail: req.file.filename
            });

            const savedPengumuman = await newPengumuman.save();
            res.status(200).json({ blog: savedPengumuman, message: 'Pengumuman telah ditambahkan.' });
        } else {
            res.status(400).json({ message: 'Gambar tidak ditemukan.' });
        }
    } catch (error) {
        console.error("Error prorses pengiriman data:", error);
        res.status(500).json({ error: error.message });
    }
});

route.get('/get-pengumuman', async (req, res) => {
    try {
        const allPengumuman = await Pengumuman.find();
        res.status(200).json(allPengumuman);
    } catch (error) {
        console.error('Error saat mengambil data pengumuman:', error);
        res.status(500).json({ error: 'Failed to get pengumuman' });
    }
});

route.get('/get-pengumuman/:id', async (req, res) => {
    try {
        const pengumumanId = req.params.id
        if (!mongoose.Types.ObjectId.isValid(pengumumanId)) {
            return res.status(400).json({ error: 'ID Pengumuman tidak valid.' });
        }
        const pengumuman = await Pengumuman.findById(pengumumanId);
        if (!pengumuman) {
            return res.status(404).json({ error: 'Pengumuman tidak ditemukan.' });
        }
        res.status(200).json(pengumuman);
    } catch (error) {
        console.error('Error fetching pengumuman by ID:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data pengumuman.' });
    }
})

route.post('/edit-pengumuman/:id', upload.single('thumbnail'), async (req, res) => {
    try {
        const { id } = req.params;
        const { judul, tanggal, keterangan } = req.body;
        const poin = [];

        for (const key in req.body) {
            if (key.startsWith('poin')) {
                poin.push(req.body[key]);
            }
        }

        const pengumuman = await Pengumuman.findById(id);
        if (!pengumuman) {
            return res.status(404).json({ error: 'Pengumuman not found' });
        }

        let oldThumbnail = pengumuman.thumbnail;
        if (req.file) {
            // Jika ada foto baru, hapus foto lama
            if (oldThumbnail) {
                fs.unlinkSync(path.join('./pengumuman', oldThumbnail));
            }
            pengumuman.thumbnail = req.file.filename;
        }

        pengumuman.judul = judul;
        pengumuman.tanggal = tanggal;
        pengumuman.keterangan = keterangan;
        pengumuman.poin = poin;

        const updatedPengumuman = await pengumuman.save();
        res.status(200).json({ pengumuman: updatedPengumuman, message: 'Pengumuman updated successfully' });
    } catch (error) {
        console.error('Error updating pengumuman:', error);
        res.status(500).json({ error: 'Failed to update pengumuman' });
    }
});



route.delete('/delete-pengumuman/:id', async (req, res) => {
    try {
        const pengumumanId = req.params.id
        if (!mongoose.Types.ObjectId.isValid(pengumumanId)) {
            return res.status(400).json({ error: "ID tidak ditemukan" })
        }

        const pengumuman = await Pengumuman.findById(pengumumanId)
        if (!pengumuman) {
            return res.status(404).json({ error: 'Pengumuman tidak ditemukan' })
        }
        if (pengumuman.thumbnail) {
            fs.unlinkSync(path.join('./pengumuman', pengumuman.thumbnail))
        }

        await pengumuman.deleteOne({ _id: pengumumanId })
        res.status(200).json({ message: 'pengumuman berhasil dihapuss' })
    } catch (error) {
        console.eror('Error Deleteing Pengumuman:', error)
        res.status(500).json({ error: 'terjadi kesalahan saat menghapus data' })
    }
})


module.exports = route;
