import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ShowMedia() {
    const [media, setMedia] = useState([]);
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/dashboard/media-edit/${id}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/get-media');
                setMedia(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/delete-media/${id}`)
            setMedia(prevMedia => prevMedia.filter(media => media._id !== id))
        } catch (error) {
            console.error('error delete Media', error)
        }
    }

    return (
        <div className='bg-gray-200 min-h-screen'>
            <div className="min-h-screen p-8">
                <h1 className="text-3xl font-semibold mb-8">Misa Gereja</h1>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                            <tr className="bg-black text-white border-b">
                                <th className="px-4 py-2 text-left">No</th>
                                <th className="px-4 py-2 text-left">Narasi</th>
                                <th className="px-4 py-2 text-left">Link</th>
                                <th className="px-4 py-2 text-left">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y">
                            {media.map((mediaList, index) => (
                                <tr key={mediaList.id}>
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{mediaList.narasi}</td>
                                    <td className="px-4 py-2">{mediaList.link}</td>
                                    <td className="flex px-4 py-2">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => handleEdit(mediaList._id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => handleDelete(mediaList._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
