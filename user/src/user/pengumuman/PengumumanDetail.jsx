import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PengumumanDetail = () => {
    const { id } = useParams();
    const [pengumuman, setPengumuman] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/get-pengumuman/${id}`);
                setPengumuman(response.data);
            } catch (error) {
                console.error('Error fetching pengumuman by ID:', error.message);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 p-2">
            <div className="bg-white w-full md:max-w-2xl rounded-lg shadow ">
                {/* Tampilkan detail pengumuman */}
                {pengumuman && (
                    <div className="p-4">
                        <img src={`http://localhost:4000/pengumuman/${pengumuman.thumbnail}`} alt="Pengumuman" className="mb-4 mx-auto w-full rounded-lg" />
                        <div className="border p-5">
                            <h1 className="font-bold text-xl mb-2">{pengumuman.judul}</h1>
                            <p className="text-lg">{pengumuman.keterangan}</p>
                            <ul>
                                {pengumuman.poin.map((p, index) => (
                                    <li key={index} className="text-lg">- {p}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PengumumanDetail;
