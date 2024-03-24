import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fungsi untuk memeriksa apakah pengguna telah masuk atau tidak
        const checkLoginStatus = async () => {
            try {
                // Lakukan panggilan ke endpoint yang memeriksa status login
                const response = await axios.get('/api/profile');
                // Jika berhasil, lanjutkan ke dashboard
                setIsLoading(false);
            } catch (error) {
                // Jika terjadi kesalahan atau pengguna belum masuk, arahkan kembali ke halaman login
                navigate('/login');
            }
        };

        checkLoginStatus();
    }, [navigate]);

    // Tampilkan pesan loading jika proses verifikasi masih berlangsung
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Jika verifikasi berhasil, tampilkan konten dashboard
    return (
        <div className="bg-gray-200 min-h-screen p-8">
            <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

        </div>
    );
};

export default Dashboard;
