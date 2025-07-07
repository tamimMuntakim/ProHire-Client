import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import './Navbar.css'
import Logo from './Logo';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { Tooltip } from 'react-tooltip';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const links =
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/new-job">New Job/Intern</NavLink></li>
            <li><NavLink to="/browse-jobs">Browse Jobs</NavLink></li>
            <li><NavLink to="/applied-jobs">Applied Jobs</NavLink></li>
            <li><NavLink to="/find-applicants">Find Applicants</NavLink></li>
        </>;

    const handleLogout = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Successfully Logged out!!",
                    timer: 1500
                });
            }).catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Please try again !!",
                    timer: 1500
                });
            });
    }

    return (
        <div>
            <div className="navbar bg-base-100 p-0 flex justify-between items-center">
                <div className="flex items-center">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-44 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <div>
                        <Logo></Logo>
                    </div>
                </div>
                <div className="hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        {links}
                    </ul>
                </div>
                <div className="flex gap-2 md:gap-4 items-center">
                    {user ?
                        (
                            <>
                                <a data-tooltip-id="my-tooltip" 
                                data-tooltip-content={`${user.displayName} - ${user?.role}`}
                                >
                                    <div className="avatar avatar-online">
                                        <div className="w-7 md:w-9 rounded-full">
                                            <img src={user.photoURL} />
                                        </div>
                                    </div>
                                </a>
                                <Tooltip id="my-tooltip" />
                                <button onClick={handleLogout} className='btn btn-error text-white btn-sm md:btn-md md:font-bold md:w-[100px]'>Logout</button>
                            </>)
                        :
                        (
                            <Link to="/auth/login" className='btn btn-primary text-white btn-sm md:btn-md md:font-bold md:w-[100px]'>Login</Link>
                        )
                    }
                </div >
            </div>
        </div>
    );
};

export default Navbar;