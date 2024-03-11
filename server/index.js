const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Connect = require('./src/config/Connection');
const routes = require('./src/routes/route');
const coockieParser = require('cookie-parser')
const app = express();
const path = require('path')
const port = process.env.PORT;
app.use(coockieParser());
app.use(express.json());

// Konfigurasi CORS
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};

// Tambahkan middleware CORS dengan konfigurasi yang telah ditentukan
app.use(cors(corsOptions));

app.use("/blog", express.static(path.join(__dirname, "blog")))
app.use("/pengumuman", express.static(path.join(__dirname, "pengumuman")))
app.use("/", routes);

// Endpoints untuk tes koneksi
app.get("/", (req, res) => {
    res.json("🦄");
});

// Koneksi database
Connect();

app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}`);
});
