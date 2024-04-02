const Jadwal = require('../models/jadwal');
const route = require('express').Router();
const mongoose = require('mongoose')
route.post('/add-jadwal', async (req, res) => {
    try {
        const { misa, hari, jam, } = req.body
        const newJadwal = new Jadwal({
            misa, hari, jam,
        })
        const saveJadwal = await newJadwal.save()
        res.status(200).json(saveJadwal)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

route.get('/get-jadwal', async (req, res) => {
    try {
        const allJadwal = await Jadwal.find()
        res.status(200).json(allJadwal)
    } catch (error) {
        console.error("error saat mengambil data jadwal")
        res.status(500).json({ error: 'gagal mengambil data jadwal' })
    }
})
route.get('/get-jadwal/:id', async (req, res) => {
    try {
        const jadwalId = req.params.id
        if (!mongoose.Types.ObjectId.isValid(jadwalId)) {
            return res.status(400).json({ error: "id jadwal tidak ditemukan" })
        }
        const jadwal = await Jadwal.findById(jadwalId)
        if (!jadwal) {
            return res.status(404).json({ error: "jadwal tidak ditemukan" })
        }
        res.status(200).json(jadwal)
    } catch (error) {
        console.error('error fetch data jadwal')
        res.status(500).json({ error: 'terjadi kesalahan saat mengambil data' })
    }
})


route.post('/update-jadwal/:id', async (req, res) => {
    try {
        const jadwalId = req.params.id
        if (!mongoose.Types.ObjectId.isValid(jadwalId)) {
            return res.status(400).json({ error: "id jadwal tidak ditemukan" })
        }
        const { misa, hari, jam, } = req.body
        const updatedJadwal = await Jadwal.findByIdAndUpdate(jadwalId, { misa, hari, jam, }, { new: true })
        if (!updatedJadwal) {
            return res.status(404).json({ error: "jadwal tidak ditemukan" })
        }
        res.status(200).json(updatedJadwal)
    } catch (error) {
        console.error('error update data jadwal')
        res.status(500).json({ error: 'terjadi kesalahan saat mengupdate data' })
    }
})

route.delete('/delete-jadwal/:id', async (req, res) => {
    try {
        const jadwalId = req.params.id
        if (!mongoose.Types.ObjectId.isValid(jadwalId)) {
            return res.status(400).json({ error: "id jadwal tidak ditemukan" })
        }
        const deletedJadwal = await Jadwal.findByIdAndDelete(jadwalId)
        if (!deletedJadwal) {
            return res.status(404).json({ error: "jadwal tidak ditemukan" })
        }
        res.status(200).json({ message: 'jadwal berhasil dihapus' })
    } catch (error) {
        console.error('error delete data jadwal')
        res.status(500).json({ error: 'terjadi kesalahan saat menghapus data' })
    }
})

module.exports = route;
