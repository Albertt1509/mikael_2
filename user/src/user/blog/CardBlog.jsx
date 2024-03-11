import { useState, useEffect } from "react";
import axios from "axios";

const CardBlog = () => {
    const [blogs, setBlogs] = useState([]);

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

    return (
        <div className="mt-6">
            <div className="">
                <p>Lihat Postingan Lainnya</p>
                <hr className="text-bold" />
            </div>
            {blogs.map(blog => (
                <div key={blog._id} onClick={() => redirectToBlog(blog._id)} className="flex flex-col lg:flex-row mt-2 bg-slate-200 p-4 w-full rounded-lg text-left cursor-pointer">
                    <div className="h-300 lg:w-1/3 lg:pr-4 lg:mb-0 mb-4">
                        <img className="w-[200px] h-[100px] mx-auto rounded-lg object-cover items-center" src={`http://localhost:4000/blog/${blog.gambar}`} alt="Placeholder" />
                    </div>
                    <div className="lg:w-2/3 ">
                        <div className="font-bold mb-2">{blog.judul}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardBlog;
