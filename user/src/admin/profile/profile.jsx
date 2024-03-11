import React, { useState } from 'react';

const ProfileContent = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataObject = new FormData();
        Object.keys(formData).forEach(key => {
            formDataObject.append(key, formData[key]);
        });
        // Lakukan sesuatu dengan formDataObject, seperti mengirim ke server
        console.log(formDataObject);
    };

    return (
        <div className="bg-gray-200 min-h-screen p-8">
            <h1 className="text-2xl font-semibold mb-4">Profile Content</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="fullName" className="block text-gray-700 font-semibold mb-2">Full Name</label>
                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400" />
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                    <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400" />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">Address</label>
                    <textarea id="address" name="address" value={formData.address} onChange={handleChange} className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"></textarea>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Submit</button>
            </form>
        </div>
    );
};

export default ProfileContent;
