import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditMedia() {
    const { id } = useParams();
    const [narasi, setNarasi] = useState('');
    const [link, setLink] = useState('');
    const [gambar, setGambar] = useState('');

    useEffect(() => {
        axios.get(`api/get-media/${id}`)
            .then(response => {
                const data = response.data;
                setNarasi(data.narasi);
                setLink(data.link);
                setGambar(data.gambar);
            })
            .catch(error => {
                console.error('error get data jadwal', error);
            });
    }, [id]);

    const handleNarasiChange = (e) => {
        setNarasi(e.target.value);
    };

    const handleLinkChange = (e) => {
        setLink(e.target.value);
    };

    const handleGambarChange = (e) => {
        setGambar(e.target.files[0]); // For file input, grab the file object
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform your submission logic here, e.g., using axios.post to send data to your server
    };

    return (
        <div className="">
            <div className="bg-gray-200 min-h-screen overflow-auto">
                <h1 className="text-2xl font-semibold ml-8 mt-5">Edit Jadwal Misa</h1>
                <div className="p-8 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-full">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-wrap mb-4">
                                <div className="w-full md:w-1/2 md:pr-2">
                                    <label className="block text-gray-700 font-bold mb-2">Narasi:</label>
                                    <input type="text" name="narasi" placeholder="Masukkan narasi" value={narasi} onChange={handleNarasiChange} className="w-full p-2 border rounded" />
                                </div>
                                <div className="w-full md:w-1/2 md:pr-2">
                                    <label className="block text-gray-700 font-bold mb-2">Link:</label>
                                    <input type="text" name="link" placeholder="Masukkan Hari Misa" value={link} onChange={handleLinkChange} className="w-full p-2 border rounded" required />
                                </div>
                                <div className="w-full md:w-1/2 md:pl-2">
                                    <label className="block text-gray-700 font-bold mb-2">Gambar:</label>
                                    <input type="file" name="gambar" onChange={handleGambarChange} className="w-full p-2 border rounded" required />
                                </div>
                            </div>
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Simpan</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
