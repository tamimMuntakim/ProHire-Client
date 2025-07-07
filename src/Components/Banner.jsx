import React from 'react';

const Banner = () => {
    return (
        <div>
            <div
                className="hero min-h-[70vh]"
                style={{
                    backgroundImage:
                        "url(https://i.ibb.co/7tDwCgF9/the-blowup-C8-D0upr8-H-Y-unsplash.jpg)",
                }}
            >
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold text-white">Find Your Dream Job Today</h1>
                        <p className="mb-5 text-white">
                            Start your career journey—search by job title, company name, skills, or preferred location...
                        </p>
                        <button className="btn btn-primary text-white">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;