import React from 'react';
import Banner from '../Components/Banner';
import FeaturedJobs from '../Components/FeaturedJobs';
import FeaturedInternships from '../Components/FeaturedInternships';

const Home = () => {
    return (
        <>
        <section id="banner">
                    <Banner></Banner>
                </section>
                <section id="featured-jobs" className='container mx-auto mt-6'>
                    <FeaturedJobs></FeaturedJobs>
                </section>
                <section id="featured-interns" className='container mx-auto mt-6'>
                    <FeaturedInternships></FeaturedInternships>
                </section>
        </>
    );
};

export default Home;