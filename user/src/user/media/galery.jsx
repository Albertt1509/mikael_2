import { useEffect, useState } from 'react';
import axios from 'axios';
import ModalImage from 'react-modal-image';

const GalleryItem = ({ src, alt }) => (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
        <ModalImage
            small={src}
            large={src}
            alt={alt}
            className="w-full h-auto cursor-pointer"
        />
    </div>
);

const Gallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/get-media');
                setImages(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap -mx-2">
                {images.map((image, index) => (
                    <GalleryItem key={index} src={`http://localhost:4000/media/${image.gallery}`} alt={image.alt} />
                ))}
            </div>
        </div>
    );
};

export default Gallery;
