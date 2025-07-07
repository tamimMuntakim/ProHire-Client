import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';

const AuthLayout = () => {
    return (
        <div>
            <header className='w-full sticky top-0 z-50 bg-base-100 border-b-2 border-b-slate-600'>
                <nav className='container mx-auto'>
                    <Navbar></Navbar>
                </nav>
            </header>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;