import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditEvent = () => {
    const [event, setEvent] = useState(null);
    const [judul, setJudul] = useState('');
    const [contact, setContact] = useState('');
    const [descript, setDescript] = useState('');
    const [gambar, setGambar] = useState(null);
    const { id } = useParams();
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);
    const [showErrorNotification, setShowErrorNotification] = useState(false);

    useEffect(() => {
        axios.get(`/api/get-event/${id}`)
            .then(response => {
                const data = response.data;
                setEvent(data);
                setJudul(data.judul);
                setContact(data.contact);
                setDescript(data.descript);
                setGambar(data.gambar);
            })
            .catch(error => {
                console.error('error get data event', error);
            });
    }, [id]);

    const handleEventChange = (e) => {
        setJudul(e.target.value);
    };

    const handleContactChange = (e) => {
        setContact(e.target.value);
    };

    const handleDescriptChange = (e) => {
        setDescript(e.target.value);
    };

    const handleImageChange = (e) => {
        setGambar(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('judul', judul);
            formData.append('contact', contact);
            formData.append('descript', descript);
            if (gambar) {
                formData.append('gambar', gambar);
            }
            await axios.post(`/api/update-event/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setShowSuccessNotification(true);
            setTimeout(() => {
                setShowSuccessNotification(false);
            }, 3000);
            console.log('Event berhasil diubah!');
        } catch (error) {
            console.error('Error saat mengedit event:', error);
            setShowErrorNotification(true);
            setTimeout(() => {
                setShowErrorNotification(false);
            }, 3000);
        }
    };

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div className='bg-gray-200 min-h-screen overflow-auto'>
            <h1 className="text-2xl font-semibold ml-8 mt-5">Event</h1>
            <div className="p-8 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full">
                    {event && (
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-wrap mb-4">
                                <div className="w-full md:w-1/2 md:pr-2">
                                    <label htmlFor="judul" className="block text-gray-700 font-bold mb-2">Judul:</label>
                                    <input type="text" id="judul" className="w-full p-2 border rounded" value={judul} onChange={handleEventChange} />
                                </div>
                                <div className="w-full md:w-1/2 md:pl-2">
                                    <label htmlFor="gambar" className="block text-gray-700 font-bold mb-2">Gambar Event:</label>
                                    <input type="file" id="gambar" className="w-full p-2 border rounded" onChange={handleImageChange} />
                                </div>
                            </div>
                            <div className="flex flex-wrap mb-4 mt-7">
                                <div className="w-full md:w-1/2 md:pr-2">
                                    <label htmlFor="descript" className="block text-gray-700 font-bold mb-2">Deskripsi Event:</label>
                                    <textarea id="descript" className="w-full p-2 border rounded" value={descript} onChange={handleDescriptChange}></textarea>
                                </div>
                                <div className="w-full md:w-1/2 md:pl-2">
                                    <label htmlFor="contact" className="block text-gray-700 font-bold mb-2">Informasi Kontak:</label>
                                    <input type="text" id="contact" className="w-full p-2 border rounded" value={contact} onChange={handleContactChange} />
                                </div>
                            </div>
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Simpan</button>
                        </form>
                    )}
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
        </div>
    );
};

export default EditEvent;
