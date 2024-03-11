import React, { useState } from 'react';
import axios from 'axios';

const PengumumanAdd = () => {
    const [jumlahPoin, setJumlahPoin] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const tambahPoin = () => {
        if (jumlahPoin < 10) {
            setJumlahPoin(jumlahPoin + 1);
        }
    };

    const kurangiPoin = () => {
        if (jumlahPoin > 1) {
            setJumlahPoin(jumlahPoin - 1);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('judul', event.target.elements.judul.value);
            formData.append('tanggal', event.target.elements.tanggal.value);
            formData.append('keterangan', event.target.elements.keterangan.value);

            // Handle file input
            const thumbnailFile = event.target.elements.thumbnail.files[0];
            formData.append('thumbnail', thumbnailFile);

            // Handle multiple poin
            for (let i = 1; i <= jumlahPoin; i++) {
                formData.append(`poin${i}`, event.target.elements[`poin${i}`].value);
            }

            const response = await axios.post('/api/add-pengumuman', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                setSuccessMessage('Pengumuman berhasil ditambahkan');
            } else {
                throw new Error('Failed to add pengumuman');
            }
        } catch (error) {
            setErrorMessage('Error saat menambahkan pengumuman');
            console.error('Error saat menambahkan pengumuman:', error.message);
        }
    };

    return (
        <div className='bg-gray-200 min-h-screen overflow-auto'>
            <h1 className="text-2xl font-semibold ml-8 mt-5">Tambahkan Pengumuman</h1>
            <div className="p-8 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full ">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-wrap mb-4">
                            <div className="w-full md:w-1/2 md:pr-2">
                                <label htmlFor="judul" className="block text-gray-700 font-bold mb-2">Judul:</label>
                                <input type="text" id="judul" name="judul" placeholder="Masukkan judul" className="w-full p-2 border rounded" required />
                            </div>
                            <div className="w-full md:w-1/2 md:pl-2">
                                <label htmlFor="tanggal" className="block text-gray-700 font-bold mb-2">Tanggal:</label>
                                <input type="date" id="tanggal" name="tanggal" className="w-full p-2 border rounded" required />
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-4">
                            <div className="w-full md:w-1/2 md:pr-2">
                                <label htmlFor="thumbnail" className="block text-gray-700 font-bold mb-2">Cover Gambar:</label>
                                <input type="file" id="thumbnail" name="thumbnail" className="w-full p-2 border rounded" required />
                            </div>
                            <div className="w-full md:w-1/2 md:pl-2">
                                <label htmlFor="keterangan" className="block text-gray-700 font-bold mb-2">Keterangan:</label>
                                <input type="text" id="keterangan" name="keterangan" className="w-full p-2 border rounded" placeholder='Masukkan Keterangan' required />
                            </div>
                        </div>
                        <div className="mb-4">
                            {[...Array(jumlahPoin)].map((_, index) => (
                                <div className="mb-4" key={index}>
                                    <label htmlFor={`poin${index + 1}`} className="block text-gray-700 font-bold mb-2">{`Poin ${index + 1}:`}</label>
                                    <input type='text' id={`poin${index + 1}`} name={`poin${index + 1}`} placeholder={`Masukkan Inti Pengumuman ${index + 1}`} className="w-full p-2 border rounded" required />
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <button type="button" onClick={kurangiPoin} className="bg-red-500 text-white py-2 px-4 rounded">Kurangi Poin</button>
                            {jumlahPoin < 10 && (
                                <button type="button" onClick={tambahPoin} className="bg-blue-500 text-white py-2 px-4 rounded">Tambah Poin</button>
                            )}
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Simpan</button>
                    </form>
                    {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
                    {successMessage && <div className="text-green-500 mt-2">{successMessage}</div>}
                </div>
            </div>
        </div>
    );
};

export default PengumumanAdd;
