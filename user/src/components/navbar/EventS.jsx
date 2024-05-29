import { useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/Animation - 1711173652655.json';
import animationData2 from '../../assets/Animation - 1716809647897.json';
import Modal from './Modal';
import Modal2 from './modal2';

export default function Event() {
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const toggleModal1 = () => {
        setShowModal1(!showModal1);
    };

    const toggleModal2 = () => {
        setShowModal2(!showModal2);
    };

    const handleHideEvent = () => {
        setIsVisible(false);
        localStorage.setItem('isEventVisible', 'false');
    };

    return (
        <div>
            {isVisible && (
                <button className="fixed bottom-6 right-2 h-20 w-20" onClick={toggleModal1}>
                    <button onClick={handleHideEvent}>x</button>
                    {/* Tampilkan animasi animationData2 */}
                    <Lottie animationData={animationData} autoplay loop />
                </button>
            )}
            {showModal1 && <Modal onClose={toggleModal1} />}
            {isVisible && (
                <button className="fixed bottom-32 right-2 h-20 w-20" onClick={toggleModal2}>
                    <button onClick={handleHideEvent}>x</button>
                    {/* Tampilkan animasi animationData */}
                    <Lottie animationData={animationData2} autoplay loop />
                </button>
            )}
            {showModal2 && <Modal2 onClose={toggleModal2} />}
        </div>
    );
}
