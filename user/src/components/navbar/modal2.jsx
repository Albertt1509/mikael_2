import React from 'react';

export default function Modal({ onClose }) {
    const phoneNumber = '088112820828';

    const handleWhatsAppClick = () => {
        window.open(`https://api.whatsapp.com/send?phone=${phoneNumber.replace(/\D/g, '')}`, '_blank');
    };

    const handleCopyPhoneNumber = () => {
        navigator.clipboard.writeText(phoneNumber);
        alert('Nomor telepon telah disalin!');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
                <div>
                    <div className="mb-4">
                        <p className="text-gray-700 font-semibold text-center mb-3">Informasi Kontak Lebih Lanjut</p>
                        <p className="text-gray-700 text-left mt-3">Sekertariat Gereja</p>
                        {/* Tambahkan tombol "Copy" */}
                        <div className="flex items-center mt-2">
                            <p className="text-gray-700 mr-2">{phoneNumber}</p>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                onClick={handleCopyPhoneNumber}
                            >
                                &#10004;
                            </button>
                        </div>
                    </div>
                    {/* Tambahkan onClick untuk mengarahkan ke WhatsApp */}
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-2"
                        onClick={handleWhatsAppClick}
                    >
                        WhatsApp
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
