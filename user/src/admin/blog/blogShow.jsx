import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Mengimpor useNavigate

const ProfileContent = () => {
    const [blogs, setBlogs] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [modalContent, setModalContent] = useState(""); // Untuk menentukan jenis konten modal
    const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi

    const handleEdit = (id) => {
        navigate(`/dashboard/blog-edit/${id}`); // Menggunakan navigate untuk navigasi ke halaman edit
    };

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('/api/get-blog');
                const formattedBlogs = response.data.map(blog => ({
                    ...blog,
                    tanggal: new Date(blog.tanggal).toLocaleDateString('en-GB') // Format tanggal dengan urutan tanggal-bulan-tahun
                }));
                setBlogs(formattedBlogs);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    const openModal = (blog, content) => {
        setSelectedBlog(blog);
        setModalContent(content);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedBlog(null);
        setModalOpen(false);
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/delete-blog/${id}`);
            // Setelah berhasil menghapus blog, perbarui daftar blog dengan menghapus blog yang dihapus dari state
            setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    return (
        <div className='bg-gray-200 min-h-screen'>
            <div className="min-h-screen p-8">
                <h1 className="text-3xl font-semibold mb-8">Daftar Blog</h1>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                            <tr className="bg-black text-white border-b">
                                <th className="px-4 py-2">No</th>
                                <th className="px-4 py-2">Judul</th>
                                <th className="px-4 py-2">Tanggal</th>
                                <th className="px-4 py-2">Penulis</th>
                                <th className="px-4 py-2">Narasi 1</th>
                                <th className="px-4 py-2">Narasi 2</th>
                                <th className="px-4 py-2">Gambar</th>
                                <th className="px-4 py-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y">
                            {blogs.map((blog, index) => (
                                <tr key={blog._id}>
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{blog.judul}</td>
                                    <td className="px-4 py-2">{blog.tanggal}</td>
                                    <td className="px-4 py-2">{blog.penulis}</td>
                                    <td className="px-4 py-2">
                                        <button className="text-blue-500 hover:underline" onClick={() => openModal(blog, "narasi_1")}>
                                            Lihat
                                        </button>
                                    </td>
                                    <td className="px-4 py-2">
                                        <button className="text-blue-500 hover:underline" onClick={() => openModal(blog, "narasi_2")}>
                                            Lihat
                                        </button>
                                    </td>
                                    <td className="px-4 py-2">
                                        {blog.gambar && (
                                            <button className="text-blue-500 hover:underline" onClick={() => openModal(blog, "gambar")}>
                                                Lihat
                                            </button>
                                        )}
                                    </td>
                                    <td className="flex px-4 py-2">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEdit(blog._id)}>
                                            Edit
                                        </button>
                                        <button className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(blog._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {modalOpen && selectedBlog && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-4 rounded-lg">
                            {modalContent === "narasi_1" && <p>{selectedBlog.narasi}</p>}
                            {modalContent === "narasi_2" && <p>{selectedBlog.narasi_2}</p>}
                            {modalContent === "gambar" && (
                                <img src={`http://localhost:4000/blog/${selectedBlog.gambar}`} alt="Gambar Blog" className="w-full h-auto" />
                            )}
                            <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={closeModal}>Tutup</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileContent;
