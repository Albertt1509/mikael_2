import { useState } from 'react';
import axios from 'axios';

export default function EditMedia() {
    const [narasi, setNarasi] = useState('');
    const [link, setLink] = useState('https://www.youtube.com/embed/');
    const [gallery, setGallery] = useState(null);
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);
    const [showErrorNotification, setShowErrorNotification] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!narasi || !link || !gallery) {
            setShowErrorNotification(true);
            return;
        }

        const formData = new FormData();
        formData.append('narasi', narasi);
        formData.append('link', link);
        formData.append('gambar', gallery);

        try {
            const response = await axios.post('/api/add-media', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            setShowSuccessNotification(true);
            setNarasi('');
            setLink('https://www.youtube.com/embed/');
            setGallery(null);
        } catch (error) {
            console.error(error);
            setShowErrorNotification(true);
        }
    };

    return (
        <>
            <div className='bg-gray-200 min-h-screen overflow-auto'>
                <h1 className="text-2xl font-semibold ml-8 mt-5">Tambahkan Galery</h1>
                <div className=" p-8 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-full ">
                        <form onSubmit={handleSubmit} >
                            <div className="flex flex-wrap mb-4">
                                <div className="w-full md:w-1/2 md:pr-2">
                                    <label htmlFor="narasi" className="block text-gray-700 font-bold mb-2">Narasi:</label>
                                    <textarea type="text" name='narasi' id="narasi" value={narasi} onChange={(e) => setNarasi(e.target.value)} placeholder="Masukkan Narasi" className="w-full p-2 border rounded" />
                                </div>
                                <div className="w-full md:w-1/2 md:pl-2">
                                    <label htmlFor="link" className="block text-gray-700 font-bold mb-2">Link:</label>
                                    <input
                                        type="text"
                                        name='link'
                                        id="link"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap mb-4">
                                <div className="w-full md:w-1/2 md:pl-2">
                                    <label htmlFor="gallery" className="block text-gray-700 font-bold mb-2">Gambar:</label>
                                    <input type="file" name='gallery' id="gallery" onChange={(e) => setGallery(e.target.files[0])} className="w-full p-2 border rounded" />
                                </div>
                            </div>
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Simpan</button>
                        </form>
                    </div>
                </div>
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
        </>
    );
}
