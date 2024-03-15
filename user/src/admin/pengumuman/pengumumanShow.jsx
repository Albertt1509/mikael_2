import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Mengimpor useNavigate

const PengumumanShow = () => {
    const [pengumuman, setPengumuman] = useState([]);
    const [selectedPoin, setSelectedPoin] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPengumumanIndex, setSelectedPengumumanIndex] = useState(null);
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/dashboard/pengumuman-edit/${id}`); // Menggunakan navigate untuk navigasi ke halaman edit
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/delete-pengumuman/${id}`)
            setPengumuman(prevPengumuman => prevPengumuman.filter(pengumuman => pengumuman._id !== id))
        } catch (error) {
            console.error('error delete pengumuman', error)
        }
    }
    useEffect(() => {
        const fetchPengumuman = async () => {
            try {
                const response = await axios.get('/api/get-pengumuman');
                const formatPengumuman = response.data.map(pengumuman => ({
                    ...pengumuman,
                    tanggal: new Date(pengumuman.tanggal).toLocaleDateString('en-GB')
                }));
                setPengumuman(formatPengumuman);
            } catch (error) {
                console.error('Error fetching pengumuman:', error.message);
            }
        };

        fetchPengumuman();
    }, []);

    const openModal = (poin, index) => {
        setSelectedPoin(poin);
        setSelectedPengumumanIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bg-gray-200 min-h-screen p-8">
            <h1 className="text-2xl font-semibold mb-4">Pengumuman</h1>
            {pengumuman.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead >
                        <tr className='bg-black text-white border-b'>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Judul</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Keterangan</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Tanggal</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Thumbnail</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Poin</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {pengumuman.map((item, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.judul}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.keterangan}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.tanggal}</td>
                                <td className="px-6 py-4 whitespace-nowrap"><img src={`http://localhost:4000/pengumuman/${item.thumbnail}`} className="h-30 w-40 rounded" /></td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.poin.length > 0 && (
                                        <button className='text-blue-500 hover:underline' onClick={() => openModal(item.poin, index)} >
                                            lihat
                                        </button>
                                    )}
                                </td>
                                <td className='flex px-2 py-12'>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEdit([item._id])} >
                                        Edit
                                    </button>
                                    <button className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(item._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Tidak ada pengumuman yang tersedia.</p>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Poin</h3>
                                        <div className="text-left">
                                            {selectedPoin.map((poin, idx) => (
                                                <p key={idx}>{idx + 1}. {poin}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={closeModal} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PengumumanShow;
