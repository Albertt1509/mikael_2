import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function BlogList() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [judul, setJudul] = useState('');
    const [tanggal, setTanggal] = useState('');
    const [jenis, setJenis] = useState('');
    const [penulis, setPenulis] = useState('');
    const [narasi, setNarasi] = useState('');
    const [narasi2, setNarasi2] = useState('');
    const [gambar, setGambar] = useState(null);
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);
    const [showErrorNotification, setShowErrorNotification] = useState(false);

    useEffect(() => {
        axios.get(`/api/get-blog/${id}`)
            .then(response => {
                const data = response.data;
                setBlog(data);
                setJudul(data.judul);
                setTanggal(data.tanggal);
                setTanggal(data.jenis);
                setPenulis(data.penulis);
                setNarasi(data.narasi);
                setNarasi2(data.narasi_2);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    const handleJudulChange = (e) => {
        setJudul(e.target.value);
    };

    const handleTanggalChange = (e) => {
        setTanggal(e.target.value);
    };
    const handleJenisChange = (e) => {
        setJenis(e.target.value);
    };

    const handlePenulisChange = (e) => {
        setPenulis(e.target.value);
    };

    const handleNarasiChange = (e) => {
        setNarasi(e.target.value);
    };

    const handleNarasi2Change = (e) => {
        setNarasi2(e.target.value);
    };

    const handleGambarChange = (e) => {
        setGambar(e.target.files[0]);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        // Validasi data
        if (!judul || !tanggal || !penulis || !narasi) {
            setShowErrorNotification(true);
            setTimeout(() => {
                setShowErrorNotification(false);
            }, 3000);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('judul', judul);
            formData.append('tanggal', tanggal);
            formData.append('jenis', jenis);
            formData.append('penulis', penulis);
            formData.append('narasi', narasi);
            formData.append('narasi_2', narasi2);
            if (gambar) {
                formData.append('gambar', gambar);
            }

            await axios.post(`/api/edit-blog/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Tampilkan notifikasi sukses
            setShowSuccessNotification(true);
            setTimeout(() => {
                setShowSuccessNotification(false);
            }, 3000);
            console.log('Blog berhasil diubah!');
            // Redirect ke halaman lain jika perlu
        } catch (error) {
            console.error('Error saat mengedit blog:', error);
        }
    };

    if (!blog) {
        return <div>Loading...</div>;
    }


    return (
        <div className='bg-gray-200 min-h-screen'>
            <h1 className="text-2xl font-semibold ml-8 mt-5">Edit Blog</h1>
            <div className="p-8 flex items-center justify-center">
                <div className='bg-white rounded-lg shadow-lg p-8 w-full '>
                    <form onSubmit={handleEditSubmit} encType='multipart/form-data'>
                        <div className="flex flex-wrap mb-4">
                            <div className="w-full md:w-1/2 md:pr-2">
                                <label htmlFor="judul" className="block text-gray-700 font-bold mb-2">Judul:</label>
                                <input type="text" id="judul" placeholder="Masukkan judul" value={judul} onChange={handleJudulChange} className="w-full p-2 border rounded" />
                            </div>
                            <div className="w-full md:w-1/2 md:pl-2">
                                <label htmlFor="tanggal" className="block text-gray-700 font-bold mb-2">Tanggal:</label>
                                <input type="date" id="tanggal" value={tanggal} onChange={handleTanggalChange} className="w-full p-2 border rounded" />
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-4">
                            <div className="w-full md:w-1/2 md:pr-2">
                                <label htmlFor="penulis" className="block text-gray-700 font-bold mb-2">Penulis:</label>
                                <input type="text" id="penulis" placeholder="Masukkan nama penulis" value={penulis} onChange={handlePenulisChange} className="w-full p-2 border rounded" />
                            </div>
                            <div className="w-full md:w-1/2 md:pl-2">
                                <label htmlFor="gambar" className="block text-gray-700 font-bold mb-2">Gambar:</label>
                                <input type="file" id="gambar" onChange={handleGambarChange} className="w-full p-2 border rounded" />
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-4">
                            <div className="w-full md:w-1/2 md:pr-2">
                                <label htmlFor="jenis" className="block text-gray-700 font-bold mb-2">Jenis Blog:</label>
                                <select id="jenis" value={jenis} onChange={handleJenisChange} className="p-3 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                    <option value="" disabled>Pilih Jenis Blog</option>
                                    <option value="dewanParoki">Dewan Paroki</option>
                                    <option value="liturgi">Liturgi</option>
                                    <option value="pewartaan">Pewartaan</option>
                                    <option value="pelayananKemasyarakatan">Pelayanan Kemasyarakatan</option>
                                    <option value="paguyuban">Paguyuban</option>
                                    <option value="kategorial">Kategorial</option>
                                    <option value="rumahTangga">Rumah Tangga</option>
                                    <option value="penelitianDanPengembangan">Penelitian dan Pengembangan</option>
                                    <option value="wilayah">Wilayah</option>
                                    <option value="lainnya">Lainnya</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="mb-4">
                                <label htmlFor="narasi" className="block text-gray-700 font-bold mb-2">Narasi:</label>
                                <textarea id="narasi" placeholder="Masukkan narasi" value={narasi} onChange={handleNarasiChange} className="w-full p-2 border rounded"></textarea>
                            </div>
                            <label htmlFor="narasi2" className="block text-gray-700 font-bold mb-2">Narasi 2:</label>
                            <textarea id="narasi2" placeholder="Masukkan narasi kedua" value={narasi2} onChange={handleNarasi2Change} className="w-full p-2 border rounded"></textarea>
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Simpan</button>
                    </form>
                </div>
            </div>
            {showSuccessNotification && (
                <div className="absolute top-0 right-0 m-4 p-4 bg-green-500 text-white rounded">
                    Notifikasi berhasil disimpan!
                </div>
            )}
            {/* Notifikasi Gagal */}
            {showErrorNotification && (
                <div className="absolute top-0 right-0 m-4 p-4 bg-red-500 text-white rounded">
                    Mohon lengkapi semua data sebelum menyimpan.
                </div>
            )}
        </div>
    );
}

export default BlogList;
