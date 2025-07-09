import React from 'react';
import JobCard from './JobCard';

const FeaturedJobs = ({ allJobs }) => {
    return (
        <div>
            <h1 className='mb-2 text-2xl  md:mb-4 md:text-4xl font-bold text-secondary'>Featured Jobs</h1>
            <p className='mb-2 md:mb-4'>Browse top featured jobs ~ save time, find the right fit!</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
                {
                    allJobs.map((job, index)=> <JobCard job={job} key={index}></JobCard>)
                }
            </div>
        </div>
    );
};

export default FeaturedJobs;