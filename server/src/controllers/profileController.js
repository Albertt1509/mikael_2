const mongoose = require('mongoose');
const Profile = require('../models/profile'); // Ubah import model Profil menjadi Profile
const multer = require('multer');
const route = require('express').Router();
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './profile');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
});

const upload = multer({ storage: storage });

route.post('/add-profile', upload.fields([{ name: 'profile', maxCount: 1 }]), async (req, res) => {
    try {
        const { nama, jabatan, keterangan } = req.body;
        if (req.files['profile'] && req.files['profile'][0]) {
            const newProfile = new Profile({
                nama, jabatan, keterangan, profile: req.files['profile'][0].filename
            });
            const saveProfile = await newProfile.save();
            res.status(200).json({ profile: saveProfile, message: 'Profile telah disimpan' });
        } else {
            res.status(400).json({ message: 'Gambar tidak ditemukan' });
        }
    } catch (error) {
        console.error("Error proses pengiriman data:", error);
        res.status(500).json({ error: error.message });
    }
});

route.get('/get-profile', async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.status(200).json(profiles);
    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data profile.' });
    }
});

route.get('/get-profile/:id', async (req, res) => {
    try {
        const profileId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(profileId)) {
            return res.status(400).json({ error: "ID profile tidak valid" });
        }
        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ error: 'Profile tidak ditemukan' });
        }
        res.status(200).json(profile);
    } catch (error) {
        console.error('Error fetching profile by ID:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data profile.' });
    }
});

route.post('/update-profile/:id', upload.single('profile'), async (req, res) => {
    try {
        const profileId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(profileId)) {
            return res.status(400).json({ error: 'ID profile tidak valid.' });
        }

        const { nama, jabatan, keterangan } = req.body;
        const profileData = {
            nama,
            jabatan,
            keterangan,
        };

        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ error: 'Profile tidak ditemukan.' });
        }

        let oldProfilePhoto = profile.profile;
        if (req.file) {
            // Jika ada foto baru, hapus foto profil lama
            if (oldProfilePhoto) {
                fs.unlinkSync(path.join('./profile', oldProfilePhoto));
            }
            profileData.profile = req.file.filename;
        }

        const updatedProfile = await Profile.findByIdAndUpdate(profileId, profileData, { new: true });

        res.status(200).json({ message: 'Profile berhasil diperbarui.', data: updatedProfile });
    } catch (error) {
        console.error('Error updating profile by ID:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui profile.' });
    }
});


route.delete('/delete-profile/:id', async (req, res) => {
    try {
        const profileId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(profileId)) {
            return res.status(200).json({ error: "ID profile tidak valid" });
        }
        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ error: 'Profile tidak ditemukan' });
        }
        if (profile.profile) {
            fs.unlinkSync(path.join('./profile', profile.profile));
        }
        await Profile.deleteOne({ _id: profileId });
        res.status(200).json({ message: "Profile dihapus" }); // Ubah .join menjadi .json
    } catch (error) {
        console.error('Error deleting profile:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat menghapus data profile.' });
    }
});

module.exports = route;
