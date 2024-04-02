import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Modal({ onClose }) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/get-event');
                setEvents(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching events:', error);
                setError('Failed to fetch events');
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">

                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : events.length === 0 ? (
                    <p>Tidak ada event khusus untuk hari ini</p>
                ) : (
                    <div>
                        {events.map((event) => (
                            <div key={event._id} className="mb-4">
                                <p className="text-gray-700 font-semibold text-center mb-3">{event.judul}</p>
                                <img src={`http://localhost:4000/event/${event.gambar}`} alt={event.judul} className="w-[500px] h-auto" />
                                <p className="text-gray-700  text-left mt-3">{event.descript}</p>
                                <p className="text-gray-700  text-right mb-3">Hubungi:{event.contact}</p>
                            </div>
                        ))}
                    </div>
                )}
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}

