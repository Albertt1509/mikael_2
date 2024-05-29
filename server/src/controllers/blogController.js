const Blog = require('../models/blog');
const multer = require('multer');
const path = require('path');
const route = require('express').Router(); // Pastikan Anda mengimpor express Router
const fs = require('fs')
const mongoose = require('mongoose');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './blog'); // Folder tempat gambar akan disimpan jika ingin disimpan di lokal
    },
    filename: (req, file, cb) => {
        // Menghasilkan timestamp saat ini dalam milidetik sebagai bagian dari nama file
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        // Menggabungkan semua elemen untuk membentuk nama file yang unik
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
});

const upload = multer({ storage: storage });

route.post('/add-blog', upload.fields([{ name: 'gambar', maxCount: 1 }]), async (req, res) => {
    try {
        const { judul, tanggal, penulis, jenis, narasi, narasi_2 } = req.body;
        if (req.files['gambar'] && req.files['gambar'][0]) {
            const newBlog = new Blog({
                judul,
                tanggal,
                penulis,
                jenis,
                narasi,
                narasi_2,
                gambar: req.files['gambar'][0].filename
            });

            const savedBlog = await newBlog.save();
            res.status(200).json({ blog: savedBlog, message: 'Blog telah ditambahkan.' });
        } else {
            res.status(400).json({ message: 'Gambar tidak ditemukan.' });
        }

    } catch (error) {
        console.error("Error prorses pengiriman data:", error);
        res.status(500).json({ error: error.message });
    }
});

route.get('/get-blog', async (req, res) => {
    try {
        // Ambil semua data blog dari database
        const blogs = await Blog.find();
        // Kirim respon dengan data blog yang berhasil diambil
        res.status(200).json(blogs);
    } catch (error) {
        // Tangani kesalahan jika terjadi
        console.error('Error fetching blogs:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data blog.' });
    }
});


route.get('/get-blog/:id', async (req, res) => {
    try {
        // Ambil ID blog dari parameter URL
        const blogId = req.params.id;

        // Periksa apakah ID blog valid
        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({ error: 'ID blog tidak valid.' });
        }

        // Cari blog berdasarkan ID di database
        const blog = await Blog.findById(blogId);

        // Periksa apakah blog ditemukan
        if (!blog) {
            return res.status(404).json({ error: 'Blog tidak ditemukan.' });
        }

        // Kirim respon dengan data blog yang berhasil diambil
        res.status(200).json(blog);
    } catch (error) {
        // Tangani kesalahan jika terjadi
        console.error('Error fetching blog by ID:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data blog.' });
    }
});
route.post('/edit-blog/:id', upload.fields([{ name: 'gambar', maxCount: 1 }]), async (req, res) => {
    try {
        const blogId = req.params.id;

        // Periksa apakah ID blog valid
        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({ error: 'ID blog tidak valid.' });
        }

        // Cari blog berdasarkan ID di database
        var blog = await Blog.findById(blogId);

        // Periksa apakah blog ditemukan
        if (!blog) {
            return res.status(404).json({ error: 'Blog tidak ditemukan.' });
        }

        // Ambil data yang ingin diubah dari body request
        const { judul, tanggal, jenis, penulis, narasi, narasi_2 } = req.body;

        // Jika ada gambar yang diunggah, update nama gambar dan hapus gambar lama
        if (req.files['gambar'] && req.files['gambar'][0]) {
            // Hapus gambar lama dari folder
            if (blog.gambar) {
                fs.unlinkSync(path.join('./blog', blog.gambar));
            }
            // Update nama gambar baru
            blog.gambar = req.files['gambar'][0].filename;
        }

        // Update data blog
        blog.judul = judul;
        blog.jenis = jenis;
        blog.tanggal = tanggal;
        blog.penulis = penulis;
        blog.narasi = narasi;
        blog.narasi_2 = narasi_2;

        // Simpan perubahan
        const updatedBlog = await blog.save();

        // Kirim respon dengan data blog yang telah diubah
        res.status(200).json({ blog: updatedBlog, message: 'Blog telah diubah.' });

    } catch (error) {
        // Tangani kesalahan jika terjadi
        console.error('Error updating blog:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengupdate data blog.' });
    }
});
route.delete('/delete-blog/:id', async (req, res) => {
    try {
        // Ambil ID blog dari parameter URL
        const blogId = req.params.id;
        // Periksa apakah ID blog valid
        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({ error: 'ID blog tidak valid.' });
        }
        // Cari blog berdasarkan ID di database
        const blog = await Blog.findById(blogId);
        // Periksa apakah blog ditemukan
        if (!blog) {
            return res.status(404).json({ error: 'Blog tidak ditemukan.' });
        }
        // Hapus gambar dari folder jika ada
        if (blog.gambar) {
            fs.unlinkSync(path.join('./blog', blog.gambar));
        }
        // Hapus blog dari database
        await Blog.deleteOne({ _id: blogId });
        res.status(200).json({ message: 'Blog berhasil dihapus.' });

    } catch (error) {
        // Tangani kesalahan jika terjadi
        console.error('Error deleting blog:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat menghapus data blog.' });
    }
});


module.exports = route;
