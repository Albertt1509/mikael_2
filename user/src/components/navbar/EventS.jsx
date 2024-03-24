import React, { useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/Animation - 1711173652655.json';
import Modal from './Modal';

export default function Event() {
    const [showModal, setShowModal] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const toggleModal = (e) => {

        if (e.target.tagName !== 'BUTTON' || e.target.textContent !== 'x') {
            setShowModal(!showModal);
        }
    };

    const handleHideEvent = () => {
        setIsVisible(false);
        localStorage.setItem('isEventVisible', 'false');
    };

    return (
        <div>
            {isVisible && (
                <button className="fixed bottom-6 right-2 h-20 w-20" onClick={toggleModal}>
                    <button onClick={handleHideEvent}>
                        x
                    </button>
                    <Lottie animationData={animationData} autoplay loop />
                </button>
            )}
            {showModal && <Modal onClose={toggleModal} />}
        </div>
    );
}
