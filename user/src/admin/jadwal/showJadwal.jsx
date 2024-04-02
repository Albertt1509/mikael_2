import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Mengimpor useNavigate

const ShowJadwal = () => {
    const [jadwalList, setJadwalList] = useState([]);
    const navigate = useNavigate()

    const handleEdit = (id) => {
        navigate(`/dashboard/jadwal-edit/${id}`); // Menggunakan navigate untuk navigasi ke halaman edit
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/delete-jadwal/${id}`)
            setJadwalList(prevJadwal => prevJadwal.filter(jadwal => jadwal._id !== id))
        } catch (error) {
            console.error('error delete jadwal', error)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/get-jadwal');
                setJadwalList(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='bg-gray-200 min-h-screen'>
            <div className="min-h-screen p-8">
                <h1 className="text-3xl font-semibold mb-8">Misa Gereja</h1>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                            <tr className="bg-black text-white border-b">
                                <th className="px-4 py-2 text-left">No</th>
                                <th className="px-4 py-2 text-left">Misa</th>
                                <th className="px-4 py-2 text-left">Hari</th>
                                <th className="px-4 py-2 text-left">Jam </th>
                                <th className="px-4 py-2 text-left">Aksi </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y">
                            {jadwalList.map((jadwal, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{jadwal.misa}</td>

                                    <td className="px-4 py-2">{jadwal.hari}</td>
                                    <td className="px-4 py-2">{jadwal.jam}</td>
                                    <td className='flex px-2 py-12'>
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEdit([jadwal._id])} >
                                            Edit
                                        </button>
                                        <button className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(jadwal._id)}
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
};

export default ShowJadwal;
