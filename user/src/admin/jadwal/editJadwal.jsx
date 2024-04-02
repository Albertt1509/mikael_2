import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditJadwal = () => {
    const { id } = useParams();
    const [misa, setMisa] = useState('');
    const [hari, setHari] = useState('');
    const [jam, setJam] = useState('');
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);
    const [showErrorNotification, setShowErrorNotification] = useState(false);

    useEffect(() => {
        axios.get(`api/get-jadwal/${id}`)
            .then(response => {
                const data = response.data;
                setMisa(data.misa); // Set value misa from response data
                setHari(data.hari); // Set value hari from response data
                setJam(data.jam); // Set value jam from response data
            })
            .catch(error => {
                console.error('error get data jadwal', error);
            });
    }, [id]);

    const handleMisaChange = (e) => {
        setMisa(e.target.value);
    };
    const handleHariChange = (e) => {
        setHari(e.target.value);
    };
    const handleJamChange = (e) => {
        setJam(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!misa || !hari || !jam) {
            setShowErrorNotification(true);
            setTimeout(() => {
                setShowErrorNotification(false);
            }, 3000);
            return;
        }

        try {
            const response = await axios.post(`api/update-jadwal/${id}`, { misa, hari, jam });
            console.log(response.data);
            setShowSuccessNotification(true);
            setTimeout(() => {
                setShowSuccessNotification(false);
            }, 3000);
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
            <h1 className="text-2xl font-semibold ml-8 mt-5">Edit Jadwal Misa</h1>
            <div className="p-8 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-wrap mb-4">
                            <div className="w-full md:w-1/2 md:pr-2">
                                <label className="block text-gray-700 font-bold mb-2">Misa:</label>
                                <input type="text" placeholder="Masukkan Nama Misa Perayaan" value={misa} onChange={handleMisaChange} className="w-full p-2 border rounded" />
                            </div>
                            <div className="w-full md:w-1/2 md:pr-2">
                                <label className="block text-gray-700 font-bold mb-2">Hari:</label>
                                <input type="text" placeholder="Masukkan Hari Misa" value={hari} onChange={handleHariChange} className="w-full p-2 border rounded" required />
                            </div>
                            <div className="w-full md:w-1/2 md:pl-2">
                                <label className="block text-gray-700 font-bold mb-2">Jam:</label>
                                <input type="time" value={jam} onChange={handleJamChange} className="w-full p-2 border rounded" required />
                            </div>
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Simpan</button>
                    </form>
                    {showSuccessNotification && (
                        <div className="absolute top-0 right-0 m-4 p-4 bg-green-500 text-white rounded">
                            Notifikasi berhasil disimpan!
                        </div>
                    )}
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

export default EditJadwal;
