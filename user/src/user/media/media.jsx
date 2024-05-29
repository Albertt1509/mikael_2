import axios from 'axios';
import Gallery from './galery';
import { useEffect, useState } from 'react';

export default function Media() {
    const [media, setMedia] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/get-media');
                setMedia(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="flex justify-between items-end mb-4">
                <h1 className='ml-4 font-bold text-4xl md:text-8xl'>Kami Katolik</h1>
                <h1 className='mr-8 hidden md:block border-b-4 border-red-500 pb-2'>Santo Mikael Semarang Indah</h1>
            </div>
            <div className="flex flex-col md:flex-row justify-center">
                <div className="w-full md:w-1/4 p-4">
                    {media.map((item, index) => (
                        <p key={index} className='text-justify'>
                            {item.narasi}
                        </p>
                    ))}
                </div>
                <div className="w-full md:w-1/2 p-4 relative">
                    {media.map((item, index) => (
                        <iframe
                            key={index}
                            className='p-3 relative z-10'
                            width="100%"
                            height="400"
                            src={item.link}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ))}
                    <div className="bg-red-500 h-1/2 md:w-1/2 absolute top-0 left-0 z-0"></div>
                </div>
            </div>
            <div className="text-center font-bold text-2xl">
                <h1>Gallery</h1>
                <Gallery />
            </div>
        </>
    );
}
