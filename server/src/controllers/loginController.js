const Admin = require('../models/login');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bcryptSalt = bcrypt.genSaltSync(10);
const secretKey = 'rah4s1a'; // Sesuaikan dengan kunci rahasia Anda

// gunakan hanya saat membuat akun
// const createRegisterAdmin = async (req, res) => {
//     const { username, password } = req.body;

//     // Validasi password
//     if (password.length < 8 || !/\d/.test(password)) {
//         return res.status(422).json({
//             message: "Password harus memiliki minimal 8 karakter dan mengandung angka.",
//         });
//     }

//     try {
//         const userData = await Admin.create({
//             username,
//             password: bcrypt.hashSync(password, bcryptSalt),
//         });
//         res.json(userData);
//     } catch (e) {
//         res.status(422).json(e);
//     }
// };

const postLoginAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const userData = await Admin.findOne({ username });
        if (!userData) {
            return res.status(422).json("Username tidak ditemukan");
        }

        // Verifikasi password
        const passCorrect = bcrypt.compareSync(password, userData.password);

        if (passCorrect) {
            jwt.sign(
                { username: userData.username, id: userData._id },
                secretKey, // Gunakan secretKey yang benar
                {},
                (error, token) => {
                    if (error) {
                        console.error("Error signing JWT:", error);
                        return res.status(500).json("Terjadi kesalahan server");
                    }
                    res.cookie("token", token).json(userData);
                }
            );
        } else {
            res.status(422).json("Password yang Anda masukkan salah");
        }
    } catch (e) {
        console.error("Error in postLoginAdmin:", e);
        res.status(500).json("Terjadi kesalahan server");
    }
};
const getAllUsers = async (req, res) => {
    try {
        const users = await Admin.find({}, "username");
        res.json(users);
    } catch (error) {
        res.status(500).json("Terjadi kesalahan server");
    }
};

const getProfile = async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        try {
            jwt.verify(token, secretKey, {}, async (err, userCookie) => {
                if (err) {
                    console.error("Error verifying JWT:", err);
                    return res.status(401).json("Token tidak valid");
                }
                const { username, _id } = await Admin.findById(userCookie.id);
                res.json({ username, _id });
            });
        } catch (error) {
            console.error("Error in getProfile:", error);
            res.status(500).json("Terjadi kesalahan server");
        }
    } else {
        res.status(401).json("Tidak ada token");
    }
};

const getLogout = (req, res) => {
    res.clearCookie('token').json(true);
};
module.exports = {
    // createRegisterAdmin,
    postLoginAdmin,
    getAllUsers,
    getProfile,
    getLogout
};
