import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import DashboardMenu from '../Components/DashboardMenu';

const DashboardLayout = () => {
    return (
        <>
            <header className='w-full sticky top-0 z-50 bg-base-100 border-b-2 border-b-slate-600'>
                <nav className='container mx-auto'>
                    <Navbar></Navbar>
                </nav>
            </header>
            <main className='min-h-[calc(100vh-460px)] md:h-[calc(100vh-80px)] w-11/12 md:container md:grid md:grid-cols-10 md:gap-4 md:mx-auto'>
                <aside className=' md:col-span-2 flex justify-center bg-primary text-white'>
                    <div className="md:h-full md:sticky top-[calc(64px)] md:flex md:items-center w-full">
                        <DashboardMenu></DashboardMenu>
                    </div>
                </aside>
                <div className='md:col-span-8 md:h-full md:overflow-y-auto'>
                    <Outlet></Outlet>
                </div>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </>
    );
};

export default DashboardLayout;