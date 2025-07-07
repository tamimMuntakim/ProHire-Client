import React from 'react';
import JobCard from './JobCard';

const FeaturedInternships = () => {
    return (
        <div>
            <h1 className='mb-2 text-2xl  md:mb-4 md:text-4xl font-bold text-primary'>Featured Internships</h1>
            <p className='mb-2 md:mb-4'>Browse top featured internships ~ save time, find the right fit!</p>
            {/* <div className='grid grid-cols-3 gap-4'> */}
            <div className='carousel gap-4'>
                <JobCard></JobCard>
                <JobCard></JobCard>
                <JobCard></JobCard>
                <JobCard></JobCard>
                <JobCard></JobCard>
                <JobCard></JobCard>
            </div>
        </div>
    );
};

export default FeaturedInternships;