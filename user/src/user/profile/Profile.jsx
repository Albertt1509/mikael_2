import { Link } from 'react-router-dom';
import React from "react";
import imgPorto from '../../assets/yesus.jpeg';

const ProfileDetail = ({ id }) => {
    return (
        <div className="p-3">
            <div className="flex justify-center items-center ">
                <Link to={`/profile/${id}`} className="flex flex-col md:flex-row mt-2 p-4 rounded-lg text-left border hover:shadow-xl transition duration-300 ease-in-out">
                    <div className="pr-4">
                        <img className="w-[350px] rounded-lg" src={imgPorto} alt="Sunset in the mountains" />
                    </div>
                    <div className="w-1/2">
                        <h1 className="font-semibold text-center md:text-left text-xl mb-2">Judul</h1>
                        <p className="font-light text-sm text-center md:text-left mb-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam adipisci facilis et, qui ipsa nihil quos repellat.</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ProfileDetail;
