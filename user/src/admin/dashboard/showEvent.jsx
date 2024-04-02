import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ShowEvent() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/dashboard/event-edit/${id}`);
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/delete-event/${id}`);
            // Jika penghapusan berhasil, perbarui daftar event
            const updatedEvents = events.filter(event => event._id !== id);
            setEvents(updatedEvents);
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    }

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`/api/get-event`);
                setEvents(response.data);
            } catch (error) {
                console.error('Error saat mengambil data event:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className='bg-gray-200 min-h-screen p-8'>
            <h1 className="text-2xl font-semibold mb-4">Event</h1>
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr className="bg-black text-white border-b">
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Judul</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Deskripsi</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Kontak Inforamsi</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Gambar</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Aksi</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {events.map(event => (
                        <tr key={event._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{event.judul}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{event.descript}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{event.contact}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <img src={`http://localhost:4000/event/${event.gambar}`} alt={event.judul} className="h-20 w-100 " />
                            </td>
                            <td className='flex px-2 py-4'>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEdit(event._id)}>
                                    Edit
                                </button>
                                <button className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(event._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
