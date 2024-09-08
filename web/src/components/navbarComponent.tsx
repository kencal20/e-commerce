import { faSearch, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SearchBarComponent from "./searchBarComponent";
import { auth } from "../config/firebase.config"; 
import useLogout from "./logoutComponent";

interface NavbarComponentProps {
    isAuthenticated: boolean;
}

export default function NavbarComponent({ isAuthenticated }: NavbarComponentProps) {
    const [navbarCollapse, setNavbarCollapse] = useState(false);
    const [searchBarVisible, setSearchBarVisible] = useState(false);
    const [user, setUser] = useState<any>(null); // State to hold user data
    const [dropdownVisible, setDropdownVisible] = useState(false); // State for user dropdown visibility
    const navigate = useNavigate();
    const handleLogout = useLogout(); // Get the logout function

    useEffect(() => {
        // Subscribe to authentication state changes
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
        });

        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);

    const toggleNavbarCollapse = () => {
        setNavbarCollapse(!navbarCollapse);
    };

    const toggleSearchBar = () => {
        setSearchBarVisible(!searchBarVisible);
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleUserIconClick = () => {
        if (!user) {
            navigate('/login'); // Navigate to login if the user is not authenticated
        }
    };

    const handleLogoutAndReset = async () => {
        await handleLogout(); // Call the logout function
        setDropdownVisible(false); // Reset the dropdown visibility
    };

    return (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <p className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-white">Kenzie Hub</span>
                    </p>
                    <button
                        data-collapse-toggle="navbar-default"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded={navbarCollapse}
                        onClick={toggleNavbarCollapse}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className={`w-full md:block md:w-auto ${navbarCollapse ? 'block' : 'hidden'}`} id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `block py-2 px-3 rounded md:p-0 ${isActive ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`
                                    }
                                    aria-current="page"
                                >
                                    HOME
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/services"
                                    className={({ isActive }) =>
                                        `block py-2 px-3 rounded md:p-0 ${isActive ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`
                                    }
                                >
                                    SERVICES
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/products"
                                    className={({ isActive }) =>
                                        `block py-2 px-3 rounded md:p-0 ${isActive ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`
                                    }
                                >
                                    PRODUCTS
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/sale"
                                    className={({ isActive }) =>
                                        `block py-2 px-3 rounded md:p-0 ${isActive ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`
                                    }
                                >
                                    SALE
                                </NavLink>
                            </li>
                            {isAuthenticated ? (
                                <li className="relative">
                                    <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar"
                                        onClick={toggleDropdown}
                                        className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                                        <FontAwesomeIcon icon={faUser} />
                                        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                        </svg>
                                    </button>

                                    {dropdownVisible && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                                            <button
                                                onClick={() => navigate('/profile')}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                Profile
                                            </button>
                                            <button
                                                onClick={handleLogoutAndReset} // Call logout and reset state
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                Logout
                                            </button>
                                            <button
                                                onClick={() => navigate('/settings')}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                Settings
                                            </button>
                                        </div>
                                    )}
                                </li>
                            ) : (
                                <li>
                                    <button
                                        onClick={handleUserIconClick}
                                        className="block py-2 px-3 rounded md:p-0 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        <FontAwesomeIcon icon={faUser} />
                                    </button>
                                </li>
                            )}
                            <li>
                                <NavLink
                                    to="/cart"
                                    className={({ isActive }) =>
                                        `block py-2 px-3 rounded md:p-0 ${isActive ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`
                                    }
                                >
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                </NavLink>
                            </li>
                            <li>
                                <button
                                    onClick={toggleSearchBar}
                                    className="block py-2 px-3 rounded md:p-0 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                >
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {searchBarVisible && (<SearchBarComponent />)}
        </div>
    );
}
