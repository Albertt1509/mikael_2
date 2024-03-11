import React from "react";

const Card = () => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src="https://via.placeholder.com/350x150" alt="Sunset in the mountains" />
            <div className="px-6 py-4 bg-white">
                <div className="font-bold text-xl mb-2">Card Title</div>
                <p className="text-gray-700 text-base ">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec consectetur elit. Sed ac ultricies turpis.
                </p>
            </div>
        </div>
    );
};

export default Card;
