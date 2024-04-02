import { useState } from "react";
import axios from "axios";

const AddJadwal = () => {
    const [misa, setMisa] = useState('');
    const [hari, setHari] = useState('');
    const [jam, setJam] = useState('');
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);
    const [showErrorNotification, setShowErrorNotification] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!hari || !misa || !jam) {
            setShowErrorNotification(true);
            setTimeout(() => {
                setShowErrorNotification(false);
            }, 3000);
            return;
        }
        try {
            const response = await axios.post('/api/add-jadwal', { misa, hari, jam });
            console.log(response.data);
            setShowSuccessNotification(true);
            setTimeout(() => {
                setShowSuccessNotification(false);
            }, 3000);
            setMisa('');
            setHari('');

            setJam('');
        } catch (error) {
            console.error(error);
            setShowErrorNotification(true);
            setTimeout(() => {
                setShowErrorNotification(false);
            }, 3000);
        }
    };

    return (
        <div className="bg-gray-200 min-h-screen overflow-auto">
            <h1 className="text-2xl font-semibold ml-8 mt-5">Tambahkan Jadwal Misa</h1>
            <div className="p-8 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-wrap mb-4">
                            <div className="w-full md:w-1/2 md:pr-2">
                                <label className="block text-gray-700 font-bold mb-2">Misa:</label>
                                <input type="text" placeholder="Masukkan Nama Misa Perayaan" className="w-full p-2 border rounded" value={misa} onChange={(e) => setMisa(e.target.value)} />
                            </div>

                            <div className="w-full md:w-1/2 md:pr-2">
                                <label className="block text-gray-700 font-bold mb-2">Hari:</label>
                                <input type="text" placeholder="Masukkan Hari Misa" className="w-full p-2 border rounded" value={hari} onChange={(e) => setHari(e.target.value)} required />
                            </div>
                            <div className="w-full md:w-1/2 md:pl-2">
                                <label className="block text-gray-700 font-bold mb-2">Jam:</label>
                                <input type="time" className="w-full p-2 border rounded" value={jam} onChange={(e) => setJam(e.target.value)} required />
                            </div>
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Simpan</button>
                    </form>
                    {showSuccessNotification && (
                        <div className="absolute top-0 right-0 m-4 p-4 bg-green-500 text-white rounded">
                            Notifikasi berhasil disimpan!
                        </div>
                    )}
                    {/* Notifikasi Gagal */}
                    {showErrorNotification && (
                        <div className="absolute top-0 right-0 m-4 p-4 bg-red-500 text-white rounded">
                            Mohon lengkapi semua data sebelum menyimpan.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddJadwal;
