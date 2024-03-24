import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';

const EditPengumuman = () => {
    const [pengumuman, setPengumuman] = useState(null);
    const { id } = useParams()
    const [judul, setJudul] = useState('')
    const [tanggal, setTanggal] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [keterangan, setKeterangan] = useState('')
    const [poin, setPoin] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        axios.get(`/api/get-pengumuman/${id}`)
            .then(response => {
                const data = response.data
                setPengumuman(data)
                setJudul(data.judul)
                setTanggal(data.tanggal)
                setThumbnail(data.thumbnail)
                setKeterangan(data.keterangan)
                setPoin(data.poin || []);
            })
            .catch(error => {
                console.error('error get data Pengumuman:', error)
            })
    }, [id]);

    const handleJudulChange = (e) => {
        setJudul(e.target.value);
    };

    const handleTanggalChange = (e) => {
        setTanggal(e.target.value);
    };

    const handlePoinChange = (index, value) => {
        const newPoin = [...poin];
        newPoin[index] = value;
        setPoin(newPoin);
    };
    const handleDeletePoin = (index) => {
        const newPoin = [...poin];
        newPoin.splice(index, 1);
        setPoin(newPoin);
    };
    const handleAddPoin = () => {
        setPoin([...poin, '']);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('judul', judul);
            formData.append('tanggal', tanggal);
            formData.append('keterangan', keterangan);
            poin.forEach((p, index) => formData.append(`poin${index + 1}`, p));
            if (thumbnail) {
                formData.append('thumbnail', thumbnail);
            }
            await axios.post(`/api/edit-pengumuman/${id}`, formData);
            setSuccessMessage('Pengumuman berhasil diperbarui.');
        } catch (error) {
            setErrorMessage('Terjadi kesalahan saat memperbarui pengumuman.');
            console.error('Error updating pengumuman:', error);
        }
    };

    return (
        <div className='bg-gray-200 min-h-screen overflow-auto'>
            <h1 className="text-2xl font-semibold ml-8 mt-5">Edit Pengumuman</h1>
            <div className="p-8 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full ">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-wrap mb-4">
                            <div className="w-full md:w-1/2 md:pr-2">
                                <label htmlFor="judul" className="block text-gray-700 font-bold mb-2">Judul:</label>
                                <input type="text" id="judul" name="judul" value={judul} onChange={handleJudulChange} className="w-full p-2 border rounded" required />
                            </div>
                            <div className="w-full md:w-1/2 md:pl-2">
                                <label htmlFor="tanggal" className="block text-gray-700 font-bold mb-2">Tanggal:</label>
                                <input type="date" id="tanggal" name="tanggal" value={tanggal} onChange={handleTanggalChange} className="w-full p-2 border rounded" required />
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-4">
                            <div className="w-full md:w-1/2 md:pr-2">
                                <label htmlFor="thumbnail" className="block text-gray-700 font-bold mb-2">Cover Gambar:</label>
                                <input type="file" id="thumbnail" name="thumbnail" onChange={(e) => setThumbnail(e.target.files[0])} className="w-full p-2 border rounded" />
                            </div>
                            <div className="w-full md:w-1/2 md:pl-2">
                                <label htmlFor="keterangan" className="block text-gray-700 font-bold mb-2">Keterangan:</label>
                                <input type="text" id="keterangan" name="keterangan" value={keterangan} onChange={(e) => setKeterangan(e.target.value)} className="w-full p-2 border rounded" placeholder='Masukkan Keterangan' required />
                            </div>
                        </div>
                        <div className="mb-4">
                            {poin.map((p, index) => (
                                <div className="mb-4 flex items-center" key={index}>
                                    <label htmlFor={`poin${index + 1}`} className="block text-gray-700 font-bold mr-2">{`Poin ${index + 1}:`}</label>
                                    <input type='text' id={`poin${index + 1}`} name={`poin${index + 1}`} value={p || ''} onChange={(e) => handlePoinChange(index, e.target.value)} className="w-auto p-2 border rounded" required />
                                    <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleDeletePoin(index)}>
                                        <RiDeleteBin6Line /> {/* Icon component */}
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-5 pt-5">
                            <button type="button" className="bg-blue-500 text-white py-2 px-4 rounded4" onClick={handleAddPoin}>
                                Tambah Poin
                            </button>
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Simpan</button>
                        </div>
                    </form>
                    {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
                    {successMessage && <div className="text-green-500 mt-2">{successMessage}</div>}
                </div>
            </div>
        </div>
    );
};

export default EditPengumuman;
