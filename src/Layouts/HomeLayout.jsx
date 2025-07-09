import React from 'react';
import Navbar from '../Components/Navbar';
import Banner from '../Components/Banner';
import FeaturedJobs from '../Components/FeaturedJobs';
import FeaturedInternships from '../Components/FeaturedInternships';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const HomeLayout = () => {
    return (
        <div>
            <header className='w-full sticky top-0 z-50 bg-base-100 border-b-2 border-b-slate-600'>
                <nav className='container mx-auto'>
                    <Navbar></Navbar>
                </nav>
            </header>
            <main className='min-h-[calc(100vh-460px)] md:min-h-[calc(100vh-320px)]'>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default HomeLayout;