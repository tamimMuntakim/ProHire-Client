import React, { useEffect, useState } from 'react';
import Banner from '../Components/Banner';
import FeaturedJobs from '../Components/FeaturedJobs';
import FeaturedInternships from '../Components/FeaturedInternships';
import axios from 'axios';
import { baseURL } from '../Utilities/BaseURL';

const Home = () => {
    const [allJobs, setAllJobs] = useState([]);
    const [allInterns, setAllInterns] = useState([]);

    useEffect(() => {
        axios.get(`${baseURL}/onlyJobs?limit=true`)
            .then(function (response) {
                setAllJobs(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${baseURL}/onlyInterns?limit=true`)
            .then(function (response) {
                setAllInterns(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);


    return (
        <>
            <section id="banner">
                <Banner></Banner>
            </section>
            <section id="featured-jobs" className='container mx-auto mt-6'>
                <FeaturedJobs allJobs={allJobs}></FeaturedJobs>
            </section>
            <section id="featured-interns" className='container mx-auto mt-6'>
                <FeaturedInternships allInterns={allInterns}></FeaturedInternships>
            </section>
        </>
    );
};

export default Home;