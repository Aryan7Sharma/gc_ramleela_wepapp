import { useState } from 'react'
import SignOut from './SignOut';
import avatar from '../assets/profile.png';
const Navbar = () => {
    const user_type = localStorage.getItem('user_type');
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const userProfileImg = localStorage.getItem('profile_img_path');
    const url = process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3001/api";

    const toggleUserDropdown = () => {
        setUserDropdownOpen(!userDropdownOpen);
    };

    return (
        <header className="bg-customOrange border-gray-200 dark:bg-customOrange">
            <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center">
                    <img
                        src="./WhatsApp Image 2023-08-11 at 4.21.35 PM.jpeg"
                        className="h-12 mr-3 sm:h-20 sm:w-80"
                        alt="Logo"
                    />
                    <span className="hidden self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        GCR Trust
                    </span>
                </a>
                <div className="flex items-center md:order-2">
                    <button
                        type="button"
                        className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        id="user-menu-button"
                        aria-expanded={userDropdownOpen}
                        onClick={toggleUserDropdown}
                    >
                        <span className="sr-only">Open user menu</span>
                        <img
                            className="w-8 h-8 rounded-full sm:w-12 sm:h-12"
                            src={userProfileImg && userProfileImg!=='NA'? `${url}/auth/images/profileimg/${userProfileImg}` :avatar}
                            alt="User"
                        />
                    </button>
                    <div
                        className={`${userDropdownOpen ? "block" : "hidden"
                            } origin-top-right top-14 absolute right-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition-opacity duration-300`}
                        style={{ zIndex: userDropdownOpen ? 1 : -1 }}
                    >
                        <div
                            className="py-1"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="user-menu"
                        >
                            <a
                                href="/profile"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                Your Profile
                            </a>
                            {user_type.toString() === "0" ?
                                <div>
                                    <a
                                        href="/register"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                    >
                                        Register Collector
                                    </a>
                                </div> : <></>}
                            <a
                                href="/reports"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                See Reports
                            </a>
                            <a
                                href="/contactUs"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                Contact Us
                            </a>
                            <a
                                href="/changePassword"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                Change Password
                            </a>
                            <SignOut />

                        </div>
                    </div>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0  sm:text-xl">
                        <li>
                            <a href="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="/reports" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">See Reports</a>
                        </li>
                        <li>
                            <a href="/profile" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Profile</a>
                        </li>
                        <li>
                            <a href="/contactUs" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact US</a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Navbar
