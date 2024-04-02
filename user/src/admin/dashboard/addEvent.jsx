import { useState } from "react";
import axios from "axios";

const AddEvent = () => {
    const [judul, setJudul] = useState('');
    const [gambar, setGambar] = useState('');
    const [contact, setContact] = useState('');
    const [descript, setDescript] = useState('');
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);
    const [showErrorNotification, setShowErrorNotification] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!judul || !gambar) {
            setShowErrorNotification(true);
            setTimeout(() => {
                setShowErrorNotification(false);
            }, 3000);
            return;
        }
        try {
            const formData = new FormData();
            formData.append('judul', judul);
            formData.append('gambar', gambar);
            formData.append('contact', contact);
            formData.append('descript', descript);

            const response = await axios.post('/api/add-event', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            setShowSuccessNotification(true);
            setTimeout(() => {
                setShowSuccessNotification(false);
            }, 3000);
            setJudul('');
            setGambar('');
        } catch (error) {
            console.log(error);
            setShowErrorNotification(true);
            setTimeout(() => {
                setShowErrorNotification(false);
            }, 3000);
        }
    };

    return (
        <>
            <div className='bg-gray-200 min-h-screen overflow-auto'>
                <h1 className="text-2xl font-semibold ml-8 mt-5">Event</h1>
                <div className="p-8 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-full">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="flex flex-wrap mb-4">
                                <div className="w-full md:w-1/2 md:pr-2">
                                    <label htmlFor="judul" className="block text-gray-700 font-bold mb-2">Judul:</label>
                                    <input type="text" id="judul" className="w-full p-2 border rounded" placeholder="Masukkan judul event" value={judul} onChange={(e) => setJudul(e.target.value)} />
                                </div>
                                <div className="w-full md:w-1/2 md:pl-2">
                                    <label htmlFor="gambar" className="block text-gray-700 font-bold mb-2">Gambar Event:</label>
                                    <input type="file" id="gambar" name="gambar" className="w-full p-2 border rounded" onChange={(e) => setGambar(e.target.files[0])} />
                                </div>
                            </div>
                            <div className="flex flex-wrap mb-4 mt-7">
                                <div className="w-full md:w-1/2 md:pr-2">
                                    <label htmlFor="judul" className="block text-gray-700 font-bold mb-2">Deskripsi Event:</label>
                                    <textarea type="text" id="judul" className="w-full p-2 border rounded" placeholder="Masukkan No Handphone" value={descript} onChange={(e) => setDescript(e.target.value)} />
                                </div>
                                <div className="w-full md:w-1/2 md:pr-2">
                                    <label htmlFor="judul" className="block text-gray-700 font-bold mb-2">Informasi Kontak:</label>
                                    <input type="text" id="judul" className="w-full p-2 border rounded" placeholder="Masukkan Deskripsi Event" value={contact} onChange={(e) => setContact(e.target.value)} />
                                </div>
                            </div>
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Simpan</button>
                        </form>
                    </div>
                </div>
            </div>

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
        </>
    );
}

export default AddEvent;
