import BgCover from '../../assets/slide2.jpg';
import BgImage from '../../assets/slide1.jpg';
import { useState, useEffect } from 'react';
import { PiChurchLight } from 'react-icons/pi';
import { CiClock2 } from 'react-icons/ci';
import { MdOutlineCalendarToday } from 'react-icons/md';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Homepage = () => {
    const [pengumuman, setPengumuman] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/get-pengumuman');
                setPengumuman(response.data.slice(0, 3));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching pengumuman:', error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="relative">
                <img src={BgCover} alt="" className="w-full" />
                <div className="intro lg:absolute lg:top-1/2 lg:left-0 p-4 font-bold text-xl lg:bg-white rounded-lg lg:text-left lg:bg-opacity-70 sm:static">
                    <h1 className="font-semibold lg:text-4xl sm:text-lg text-center">Gereja Katolik Santo Mikael Semarang Indah</h1>
                    <p className="font-normal text-center hidden lg:block lg:text-left">Selamat Datang di Website Gereja Santo Mikael </p>
                </div>
            </div>

            {/* kontent tengah */}
            <div className="bg-gray-200 lg:flex lg:justify-center">
                <div className="kiri lg:w-[50%] lg:px-6 lg:py-8">
                    <img src={BgImage} className="p-3 w-full rounded-xl" alt="" />
                </div>
                <div className="kanan lg:w-[50%] lg:px-6 lg:py-8">
                    <h1 className="font-semibold text-xl lg:text-2xl mb-4 text-center">Jadwal Misa Santo Mikael</h1>
                    <div className="justify-center align-center items-centertext-center">
                        <div className="text-center mt-10">
                            <div className="justify-center align-center text-center">
                                <div className="flex items-center justify-center gap-4 mb-2">
                                    <MdOutlineCalendarToday />
                                    <span className="font-semibold">Hari</span>
                                </div>
                                <span>Sabtu & Minggu</span>
                            </div>
                            <div className="mt-4">
                                <div className="justify-center align-center text-center">
                                    <div className="flex items-center justify-center gap-4 mb-2">
                                        <CiClock2 />
                                        <span className="font-semibold">Jam</span>
                                    </div>
                                    <span>Minggu : 06.00 Wib, 08.45 Wib & 17.00 Wib</span><br />
                                    <span>Sabtu: 17.00 Wib</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="justify-center align-center text-center">
                                    <div className="flex items-center justify-center gap-4">
                                        <PiChurchLight />
                                        <span className="font-semibold">Alamat</span>
                                    </div>
                                    <span>Perumahan Semarang Indah C2 No.19, Tawangmas, Kec. Semarang Barat, Kota Semarang, Jawa Tengah</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* kontent bawah */}
            <div className="mt-4">
                <h1 className='flex justify-center text-2xl font-semibold'>Informasi Gereja</h1>
                <h1 className='flex justify-center'>Santo Mikael Semarang Indah</h1>
                <div className="p-3 flex justify-center gap-3 shadow-xl bg-gray-200">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        pengumuman.map((item, index) => (
                            <Link key={index} to={`/pengumuman/${item._id}`} className="max-w-sm rounded overflow-hidden shadow-lg">
                                <img src={`http://localhost:4000/pengumuman/${item.thumbnail}`} className="w-full object-cover h-48" />
                                <div className="px-6 py-4 bg-white">
                                    <div className="font-bold text-xl mb-2">{item.judul}</div>

                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Homepage;
