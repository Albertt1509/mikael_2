import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { BsFillPersonFill, BsFillBellFill, BsFillChatFill, BsFillGridFill, BsBoxArrowRight } from 'react-icons/bs';
import axios from 'axios';

const Sidebar = () => {
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isAnnouncementDropdownOpen, setIsAnnouncementDropdownOpen] = useState(false);
    const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);
    const [isHomePage, setHomePage] = useState(null)
    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const toggleAnnouncementDropdown = () => {
        setIsAnnouncementDropdownOpen(!isAnnouncementDropdownOpen);
    };

    const toggleBlogDropdown = () => {
        setIsBlogDropdownOpen(!isBlogDropdownOpen);
    };

    async function logout() {
        await axios.post('/api/logout')
        setHomePage('/')
    }
    if (isHomePage) {
        return <Navigate to={isHomePage} />
    }
    return (
        <div className="bg-gray-800 h-full w-64 text-white flex flex-col">
            <div className="p-4">
                <h2 className="text-lg font-semibold">Admin Dashboard</h2>
            </div>
            <nav className="text-sm flex-1">
                <ul className="space-y-2">
                    <li>
                        <Link to='/dashboard' className="block p-2 hover:bg-gray-700"><BsFillGridFill className="inline-block mr-2" />Dashboard</Link>
                    </li>
                    <li>
                        <a href="#" className="block p-2 hover:bg-gray-700" onClick={toggleProfileDropdown}><BsFillPersonFill className="inline-block mr-2" />Profile</a>
                        <ul className={`${isProfileDropdownOpen ? 'block' : 'hidden'} bg-gray-700 py-2 pl-4`}>
                            <li>
                                <Link to='/dashboard/profile-add' className="block p-2 hover:bg-gray-600">Tambah Profile</Link>
                            </li>
                            <li>
                                <Link to='/dashboard/profile-edit' className="block p-2 hover:bg-gray-600">Edit Profile</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="block p-2 hover:bg-gray-700" onClick={toggleAnnouncementDropdown}><BsFillBellFill className="inline-block mr-2" />Pengumuman</a>
                        <ul className={`${isAnnouncementDropdownOpen ? 'block' : 'hidden'} bg-gray-700 py-2 pl-4`}>
                            <li>
                                <Link to='/dashboard/pengumuman-add' className="block p-2 hover:bg-gray-600">Tambah Pengumuman</Link>
                            </li>
                            <li>
                                <Link to='/dashboard/pengumuman-show' className="block p-2 hover:bg-gray-600">Edit Pengumuman</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="block p-2 hover:bg-gray-700" onClick={toggleBlogDropdown}><BsFillChatFill className="inline-block mr-2" />Blog</a>
                        <ul className={`${isBlogDropdownOpen ? 'block' : 'hidden'} bg-gray-700 py-2 pl-4`}>
                            <li>
                                <Link to='/dashboard/blog-add' className="block p-2 hover:bg-gray-600">Tambah Blog</Link>
                            </li>
                            <li>
                                <Link to='/dashboard/blog-show' className="block p-2 hover:bg-gray-600">Edit Blog</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div className="mt-auto">
                <button onClick={logout} className="block p-2 hover:bg-gray-700"><BsBoxArrowRight className="inline-block mr-2" />Logout</button>
            </div>
        </div>
    );
};

export default Sidebar;
