import { useEffect, useState } from "react";
import CardBlog from './CardBlog'
import axios from "axios";

const Blog = () => {
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get('/api/get-blog');
                if (response.data.length > 0) {
                    const formattedBlog = {
                        ...response.data[0],
                        tanggal: new Date(response.data[0].tanggal).toLocaleDateString('en-GB') // Format tanggal dengan urutan tanggal-bulan-tahun
                    };
                    setBlog(formattedBlog);
                } else {
                    setBlog(null); // Jika tidak ada data, atur state blog menjadi null
                }
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };

        fetchBlog();
    }, []);

    return (
        <div className="flex flex-col lg:flex-row">
            {/* Konten kiri */}
            <div className="lg:w-3/4 p-4 lg:pr-2">
                {blog && (
                    <>

                        <h1 className="text-2xl font-bold mb-4">{blog.judul}</h1>
                        <div className="border p-2 rounded-lg">
                            <img className="w-[900px] h-[500px] mx-auto rounded-lg object-cover items-center" src={`http://localhost:4000/blog/${blog.gambar}`} alt="Placeholder" />
                            <div className="flex gap-2 mt-2">
                                <p className="font-semibold">Penulis : {blog.penulis}</p>
                                <p>{blog.tanggal}</p>
                            </div>
                            <p className="text-gray-700 pt-3 text-justify">{blog.narasi}</p>
                            <p className="text-gray-700 pt-3 text-justify">{blog.narasi_2}</p>
                        </div>
                    </>
                )}
            </div>
            {/* Konten kanan (menu card) */}
            <div className="lg:w-1/3 p-4 lg:pl-2">
                <CardBlog />
            </div>
        </div>
    );
};

export default Blog;
