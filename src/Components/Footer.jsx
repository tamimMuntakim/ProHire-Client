import React from 'react';
import { Link } from 'react-router';
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Logo from "./Logo"

const Footer = () => {

    return (
        <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
            <aside className='space-y-1 md:space-y-2'>
                <Link to="/" className=""><Logo></Logo></Link>
                <p className=''>Your all-in-one platform for job-internship aplications and management.</p>
                <p className='text-slate-400'>Copyright © {new Date().getFullYear()} - All right reserved by ProHire Tech Ltd.</p>
                <nav className="flex flex-col gap-1 md:gap-2">
                    <Link className="link link-hover" to="/">Home</Link>
                    <Link className="link link-hover" to="/dashboard" >Dashboard</Link>
                </nav>
            </aside>
            <nav>
                <h6 className="footer-title">Social</h6>
                <div className="grid grid-flow-col gap-4 md:gap-8">
                    <a href="https://www.facebook.com" target='_blank'><FaFacebookSquare className='w-4 h-4 md:w-5 md:h-5' /></a>
                    <a href="https://www.linkedin.com" target='_blank'><FaLinkedin className='w-4 h-4 md:w-5 md:h-5' /></a>
                    <a href="https://github.com" target='_blank'><FaGithub className='w-4 h-4 md:w-5 md:h-5' /></a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;