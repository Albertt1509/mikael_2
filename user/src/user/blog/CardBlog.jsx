import { useState, useEffect } from "react";
import axios from "axios";

const CardBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/get-blog');
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };
        fetchData();
    }, []);

    const redirectToBlog = (blogId) => {
        window.location.href = `/blog/${blogId}`;
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const filteredBlogs = selectedCategory
        ? blogs.filter(blog => blog.jenis === selectedCategory)
        : blogs;

    return (
        <div className="mt-6">
            <div className="mb-4">
                <p className="flex items-center">Lihat Postingan
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="ml-2 p-2 border rounded">
                        <option value="" disabled>Blog</option>
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
                </p>
                <hr className="font-bold mt-3" />
            </div>
            {filteredBlogs.length > 0 ? (
                filteredBlogs.map(blog => (
                    <div key={blog._id} onClick={() => redirectToBlog(blog._id)} className="flex flex-col lg:flex-row mt-2 bg-slate-200 p-4 w-full rounded-lg text-left cursor-pointer">
                        <div className="h-300 lg:w-1/3 lg:pr-4 lg:mb-0 mb-4">
                            <img className="w-[200px] h-[100px] mx-auto rounded-lg object-cover items-center" src={`http://localhost:4000/blog/${blog.gambar}`} alt="Blog" onError={(e) => { e.target.onerror = null; e.target.src = 'path_to_fallback_image'; }} />
                        </div>
                        <div className="lg:w-2/3 flex">
                            <div className="font-bold mb-2">{blog.judul}</div>
                            <div className="text-gray-700 text-sm ml-auto">{blog.jenis}</div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center mt-6">
                    <p className="text-gray-700">Maaf, konten belum tersedia.</p>
                </div>
            )}
        </div>
    );
};

export default CardBlog;
