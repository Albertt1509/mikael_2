import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
    const [profiles, setProfiles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/get-profile");
                setProfiles(response.data);
            } catch (error) {
                console.error("Error fetching profiles:", error);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (id) => {
        navigate(`/dashboard/profile-edit/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/delete-profile/${id}`);
            setProfiles(prevProfiles => prevProfiles.filter(profile => profile._id !== id));
        } catch (error) {
            console.error('Error deleting profile:', error);
        }
    };

    return (
        <div className="bg-gray-200 min-h-screen overflow-auto">
            <h1 className="text-2xl font-semibold ml-8 mt-5">Edit Profile</h1>
            <div className="p-8 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-l w-full">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr className='bg-black text-white border-b w-full'>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Judul</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Jabatan</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Keterangan</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Profile</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {profiles.map((item) => (
                                <tr key={item._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.nama}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.jabatan}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.keterangan}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img src={`http://localhost:4000/profile/${item.profile}`} alt="Profile" className="h-30 w-40 rounded" />
                                    </td>
                                    <td className='flex px-2 py-12'>
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEdit(item._id)}>
                                            Edit
                                        </button>
                                        <button className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(item._id)}>
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
