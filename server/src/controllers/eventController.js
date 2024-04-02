const mongoose = require('mongoose');
const Event = require('../models/event');
const path = require('path');
const route = require('express').Router();
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './event');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
});

const upload = multer({ storage: storage });

route.post('/add-event', upload.single('gambar'), async (req, res) => {
    try {
        const { judul, descript, contact } = req.body;
        if (req.file) {
            const newEvent = new Event({
                judul,
                descript,
                contact,
                gambar: req.file.filename,
            });
            const saveEvent = await newEvent.save();
            res.status(200).json({ event: saveEvent, message: 'Event berhasil disimpan' });
        } else {
            res.status(400).json({ message: 'Gambar tidak ditemukan' });
        }
    } catch (error) {
        console.error("Error proses pengiriman data:", error);
        res.status(500).json({ error: error.message });
    }
});

route.get('/get-event', async (req, res) => {
    try {
        const allEvent = await Event.find()
        res.status(200).json(allEvent)
    } catch (error) {
        console.error('Error saat mengambil data event:', error);
        res.status(500).json({ error: 'Failed to get event' });
    }
})
route.get('/get-event/:id', async (req, res) => {
    try {
        const eventId = req.params.id
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ error: 'Id tidak valid' })
        }
        const event = await Event.findById(eventId)
        if (!event) {
            return res.status(404).json({ error: 'event tidak ditemukan' })
        }
        res.status(200).json(event)
    } catch (error) {
        console.error('Error fetching event by ID:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data event.' });
    }
})

route.post('/update-event/:id', upload.single('gambar'), async (req, res) => {
    try {
        const eventId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ error: 'ID event tidak valid.' });
        }

        const { judul, contact, descript } = req.body;
        const eventData = { judul, contact, descript };

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event tidak ditemukan.' });
        }

        let oldEventPhoto = event.gambar;
        if (req.file) {
            // Jika ada foto baru, hapus foto event lama
            if (oldEventPhoto) {
                fs.unlinkSync(path.join('./event', oldEventPhoto));
            }
            eventData.gambar = req.file.filename;
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, eventData, { new: true });

        res.status(200).json({ message: 'Event berhasil diperbarui.', data: updatedEvent });
    } catch (error) {
        console.error('Error updating event by ID:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui event.' });
    }
});
route.delete('/delete-event/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ error: 'ID event tidak valid.' });
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event tidak ditemukan.' });
        }

        // Hapus foto event dari direktori
        if (event.gambar) {
            fs.unlinkSync(path.join('./event', event.gambar));
        }

        // Hapus event dari database
        await Event.findByIdAndDelete(eventId);

        res.status(200).json({ message: 'Event berhasil dihapus.' });
    } catch (error) {
        console.error('Error deleting event by ID:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat menghapus event.' });
    }
});

module.exports = route;
