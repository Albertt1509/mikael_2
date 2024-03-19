import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProfileDetail = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`/api/get-profile/${id}`);
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, [id]);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white w-full md:max-w-2xl rounded-lg shadow">
                {/* Tampilkan detail profil */}
                <div className="p-4">
                    <img src={`http://localhost:4000/profile/${profile.profile}`} alt="Profil" className="mb-4 mx-auto  w-full h-[450px] rounded-lg" />
                    <div className="border p-5">
                        <div className="flex gap-2 font-bold">
                            <h1 className="text-lg mb-2">{profile.nama}</h1>
                            <h2 className="text-lg mb-2">{profile.jabatan}</h2>
                        </div>
                        <p className="text-lg">{profile.keterangan}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetail;
