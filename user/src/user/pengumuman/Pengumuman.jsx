import { Link, } from "react-router-dom";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect } from "react";
import axios from "axios";

const Pengumuman = () => {
    const [pengumuman, setPengumuman] = useState([])
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const getData = async () => {
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
        }
        getData()
    }, [])

    // Filter pengumuman berdasarkan pencarian
    const filteredPengumuman = pengumuman.filter(item =>
        item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.keterangan.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="flex items-center p-4 bg-slate-200 justify-between md:justify-start">
                <div className="search relative mx-auto md:mr-0">
                    <input
                        type="text"
                        placeholder="Cari pengumuman..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <AiOutlineSearch />
                    </span>
                </div>
            </div>
            {/* Konten pengumuman */}
            <h1 className="text-center font-semibold mt-5">Pengumuman Geraja Santo Mikael Semarang Indah</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 mt-8">
                {filteredPengumuman.map((item, index) => (
                    <Link key={index} to={`/pengumuman/${item._id}`}>
                        <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
                            <img className="w-full h-48 object-cover" src={`http://localhost:4000/pengumuman/${item.thumbnail}`} />
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-2">{item.judul}</h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Pengumuman;
