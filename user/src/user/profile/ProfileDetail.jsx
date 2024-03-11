import React from "react";
import { useParams } from "react-router-dom";

const ProfileDetail = () => {
    let { id } = useParams();

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white w-full md:max-w-2xl rounded-lg shadow">
                {/* Tampilkan detail pengumuman */}
                <div className="p-4">
                    <img src="https://via.placeholder.com/500x350" alt="Pengumuman" className="mb-4 mx-auto w-full rounded-lg" />
                    <div className="border p-5">
                        <h1 className="font-bold text-xl mb-2">Ini Judul</h1>
                        <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum, neque ut interdum ultricies, metus nunc hendrerit sapien, id volutpat justo risus sit amet nulla.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetail;
