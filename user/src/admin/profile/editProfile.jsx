import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditProfile = () => {
    const [profile, setProfile] = useState(null);
    const { id } = useParams();
    const [nama, setNama] = useState('');
    const [jabatan, setJabatan] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [gambar, setGambar] = useState('');
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);
    const [showErrorNotification, setShowErrorNotification] = useState(false);

    useEffect(() => {
        axios.get(`/api/get-profile/${id}`)
            .then(response => {
                const data = response.data;
                setProfile(data);
                setNama(data.nama);
                setJabatan(data.jabatan);
                setKeterangan(data.keterangan);
                setGambar(data.profile);
            })
            .catch(error => {
                console.error('error to get data profile:', error);
            });
    }, [id]);

    const handleChangeNama = (e) => {
        setNama(e.target.value);
    };

    const handleChangeJabatan = (e) => {
        setJabatan(e.target.value);
    };

    const handleChangeKeterangan = (e) => {
        setKeterangan(e.target.value);
    };

    const handleChangeProfile = (e) => {
        setGambar(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nama || !jabatan || !keterangan) {
            setShowErrorNotification(true);
            setTimeout(() => {
                setShowErrorNotification(false);
            }, 3000);
            return;
        }
        try {
            const formData = new FormData();
            formData.append('nama', nama);
            formData.append('jabatan', jabatan);
            formData.append('keterangan', keterangan);
            if (gambar) {
                formData.append('profile', gambar);
            }
            const response = await axios.post(`/api/update-profile/${id}`, formData);
            console.log('Response:', response.data);
            setShowSuccessNotification(true);
            setTimeout(() => {
                setShowSuccessNotification(false);
            }, 3000);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="bg-gray-200 min-h-screen overflow-auto">
            <h1 className="text-2xl font-semibold ml-8 mt-5">Profile Edit</h1>
            <div className="p-8 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full ">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-wrap mb-4">
                            <div className="w-full md:w-1/2 md:pr-2">
                                <label htmlFor="nama" className="block text-gray-700 font-bold mb-2">Nama:</label>
                                <input type="text" id="nama" name="nama" placeholder="Masukkan Nama" value={nama} className="w-full p-2 border rounded" onChange={handleChangeNama} required />
                            </div>
                            <div className="w-full md:w-1/2 md:pl-2">
                                <label htmlFor="jabatan" className="block text-gray-700 font-bold mb-2">Jabatan:</label>
                                <input type="text" id="jabatan" name="jabatan" placeholder="Masukkan Jabatan" value={jabatan} className="w-full p-2 border rounded" onChange={handleChangeJabatan} required />
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-4">
                            <div className="w-full">
                                <label htmlFor="keterangan" className="block text-gray-700 font-bold mb-2">Keterangan:</label>
                                <textarea id="keterangan" name="keterangan" placeholder="Masukkan keterangan" value={keterangan} className="w-full p-2 border rounded" onChange={handleChangeKeterangan} required />
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-4">
                            <div className="w-full">
                                <label htmlFor="profile" className="block text-gray-700 font-bold mb-2">Profile:</label>
                                <input type="file" id="profile" name="profile" className="w-full p-2 border rounded" onChange={handleChangeProfile} />
                            </div>
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Submit</button>
                    </form>
                </div>
            </div>
            {showSuccessNotification && (
                <div className="bg-green-200 text-green-700 px-4 py-2 mt-4 mx-8 rounded">
                    Profile berhasil diupdate!
                </div>
            )}
            {showErrorNotification && (
                <div className="bg-red-200 text-red-700 px-4 py-2 mt-4 mx-8 rounded">
                    Mohon isi semua kolom.
                </div>
            )}
        </div>
    );
};

export default EditProfile;
