import { useState, useEffect } from 'react';
import Profile from '../../assets/profile.png';
import { Link, } from 'react-router-dom'
function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className={`bg-[#434342] ${isScrolled ? 'fixed top-0 left-0 w-full z-50' : ''}`}>
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <a href="/login">
                            <img src={Profile} alt="logo" className='w-20 h-20 p-3' />
                        </a>
                        <h1 className='text-white text-2xl'>St. Mikael</h1>
                    </div>
                    {/* Button untuk mode responsif */}
                    <div className="sm:hidden ml-auto">
                        <button
                            className={`inline-flex items-center justify-center p-2 rounded-md transition duration-150 ease-in-out ${isOpen ? 'text-dark' : 'text-dark'}`}
                            onClick={toggleNavbar}
                        >
                            <svg
                                className={isOpen ? 'hidden' : 'block h-6 w-6'}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                            <svg
                                className={isOpen ? 'block h-6 w-6' : 'hidden'}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    {/* Menu navigasi */}
                    <div className="hidden sm:flex flex-grow text-center justify-center text-white">
                        <div className="flex">
                            <div className=" flex gap-3">
                                <Link to={'/'} className="text-dark">Home</Link>
                                <h1 className="">|</h1>
                            </div>
                            <div className="flex gap-3">
                                <Link to={'/profile'} className="ml-4 text-dark">Profile</Link>
                                <h1 className="">|</h1>
                            </div>
                            <div className="flex gap-3">
                                <Link to={'/pengumuman'} className="ml-4 text-dark">Pengumuman</Link>
                                <h1 className="">|</h1>
                            </div>
                            <Link to={`/blog`} className="ml-4 text-dark">Blog</Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* Menu desktop */}
            <div className={isOpen ? 'block' : 'hidden sm:hidden'}>
                <div className="px-2 pt-2 pb-3 text-white">
                    <Link to={'/'} className="text-dark">Home</Link>
                    <Link to={'/profile'} className="ml-4 text-dark">Profile</Link>
                    <Link to={'/pengumuman'} className="ml-4 text-dark">Pengumuman</Link>
                    <Link to={`/blog`} className="ml-4 text-dark">Blog</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
