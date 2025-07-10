import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router'; // Assuming react-router-dom for Link
import { baseURL } from '../Utilities/BaseURL';
import { HiDocumentMagnifyingGlass } from "react-icons/hi2";

const BrowseJobs = () => {
    const [listings, setListings] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    const [selectedJobType, setSelectedJobType] = useState('');
    const [selectedEmploymentType, setSelectedEmploymentType] = useState('');
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [selectedPaidStatus, setSelectedPaidStatus] = useState('');

    useEffect(() => {
        const fetchListings = async () => {
            setLoading(true);
            setError(null);
            try {
                const queryParams = new URLSearchParams();
                queryParams.append('page', currentPage);
                queryParams.append('limit', itemsPerPage);

                if (selectedJobType) {
                    queryParams.append('jobType', selectedJobType);
                }
                if (selectedEmploymentType) {
                    queryParams.append('employmentType', selectedEmploymentType);
                }
                if (selectedIndustry) {
                    queryParams.append('industry', selectedIndustry);
                }
                if (selectedPaidStatus) {
                    queryParams.append('paid', selectedPaidStatus);
                }

                const response = await axios.get(`${baseURL}/allListings?${queryParams.toString()}`);

                // --- MODIFIED: Defensive checks for response data ---
                const fetchedListings = response.data?.listings || []; // Use || [] to ensure it's an array
                const fetchedTotalPages = response.data?.totalPages || 1; // Default to 1 page

                setListings(fetchedListings);
                setTotalPages(fetchedTotalPages);

            } catch (err) {
                console.error("Error fetching listings:", err);
                setError("Failed to load listings. Please try again.");
                setListings([]); // Ensure listings is an empty array on error
                setTotalPages(1); // Reset total pages on error
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, [currentPage, itemsPerPage, selectedJobType, selectedEmploymentType, selectedIndustry, selectedPaidStatus]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setCurrentPage(1);

        if (name === 'jobType') setSelectedJobType(value);
        else if (name === 'employmentType') setSelectedEmploymentType(value);
        else if (name === 'industry') setSelectedIndustry(value);
        else if (name === 'paid') setSelectedPaidStatus(value);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const getStatusBadge = (appliDeadline) => {
        if (!appliDeadline) return null;

        const deadlineDate = parseISO(appliDeadline);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (deadlineDate < today) {
            return <div className="badge badge-error text-white badge-sm">Closed</div>;
        } else {
            return <div className="badge badge-info text-white badge-sm">Open</div>;
        }
    };

    return (
        <div className='container mx-auto p-4'>
            <h1 className='mt-5 mb-3 text-2xl md:mt-8 md:mb-6 md:text-4xl font-bold text-secondary text-center'>Browse All Jobs/Internships</h1>

            {/* Filter Section */}
            <div className="bg-base-100 p-6 rounded-box shadow-md mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Job Type Filter */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Job Type</span>
                    </label>
                    <select
                        className="select select-bordered w-full"
                        name="jobType"
                        value={selectedJobType}
                        onChange={handleFilterChange}
                    >
                        <option value="">All Job Types</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option>
                    </select>
                </div>

                {/* Employment Type Filter */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Employment Type</span>
                    </label>
                    <select
                        className="select select-bordered w-full"
                        name="employmentType"
                        value={selectedEmploymentType}
                        onChange={handleFilterChange}
                    >
                        <option value="">All Employment Types</option>
                        <option value="On-site">On-site</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                </div>

                {/* Industry Filter */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Industry</span>
                    </label>
                    <select
                        className="select select-bordered w-full"
                        name="industry"
                        value={selectedIndustry}
                        onChange={handleFilterChange}
                    >
                        <option value="">All Industries</option>
                        <option value="Technology & Engineering">Technology & Engineering</option>
                        <option value="Business & Management">Business & Management</option>
                        <option value="Healthcare & Medicine">Healthcare & Medicine</option>
                        <option value="Science & Research">Science & Research</option>
                        <option value="Media & Creation">Media & Creation</option>
                        <option value="Legal">Legal</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                </div>

                {/* Paid/Unpaid Filter */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Payment Status</span>
                    </label>
                    <select
                        className="select select-bordered w-full"
                        name="paid"
                        value={selectedPaidStatus}
                        onChange={handleFilterChange}
                    >
                        <option value="">All Statuses</option>
                        <option value="yes">Paid</option>
                        <option value="no">Unpaid</option>
                    </select>
                </div>
            </div>
            {/* End Filter Section */}

            {loading && <div className="text-center my-8"><span className="loading loading-spinner loading-lg text-primary"></span><p>Loading listings...</p></div>}
            {error && <div className="text-center my-8 text-red-500"><p>{error}</p></div>}

            {/* Conditional rendering based on listings.length is now safe */}
            {!loading && !error && listings.length === 0 && (
                <div className="text-center my-8 text-gray-600">
                    <p>No listings found matching your criteria.</p>
                </div>
            )}

            {!loading && !error && listings.length > 0 && (
                <>
                    <div className="overflow-x-auto rounded-box border border-slate-200 bg-base-100 mb-8 ">
                        <table className="table table-zebra w-full text-center">
                            <thead>
                                <tr className='border-b border-b-slate-400 text-xs md:text-sm'>
                                    <th>Sl No.</th>
                                    <th>Job Title</th>
                                    <th>Company Name</th>
                                    <th>Location</th>
                                    <th>Type</th>
                                    <th>Salary</th>
                                    <th>Application Deadline</th>
                                    <th>Status</th>
                                    <th>Openings</th>
                                    <th className='w-24'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {listings.map((job, index) => (
                                    <tr key={job._id} className='border-b border-b-slate-400 text-xs md:text-sm'>
                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td>{job?.title || 'N/A'}</td>
                                        <td>{job?.companyName || 'N/A'}</td>
                                        <td>{job?.location || 'N/A'}</td>
                                        <td>{job?.jobType || 'N/A'} ({job?.employmentType || 'N/A'})</td>
                                        <td>{job?.salary || 'N/A'}</td>
                                        <td>{job?.appliDeadline ? format(parseISO(job.appliDeadline), 'dd/MM/yyyy') : 'N/A'}</td>
                                        <td>{getStatusBadge(job?.appliDeadline)}</td>
                                        <td>{job?.noOfOpenngs || 'N/A'}</td>
                                        <td className='p-0'>
                                            <Link
                                                to={`/see-details/${job?._id}`}
                                                className="btn btn-xs md:btn-sm bg-secondary dark:bg-primary text-white font-bold mx-auto"
                                            >
                                                <HiDocumentMagnifyingGlass size={18}/>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center gap-4 my-8">
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span className="font-semibold">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default BrowseJobs;