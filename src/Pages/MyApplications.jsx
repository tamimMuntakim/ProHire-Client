// src/Pages/MyApplications.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router'; // Changed to react-router-dom for Link
import { AuthContext } from '../Providers/AuthProvider';
import { baseURL } from '../Utilities/BaseURL'; // Ensure this is correctly configured

const MyApplications = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 7;

    // State for filters
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedJobType, setSelectedJobType] = useState('');
    const [selectedEmploymentType, setSelectedEmploymentType] = useState('');

    // State for the details modal
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedApplicationDetails, setSelectedApplicationDetails] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            if (!user?.uid) {
                if (!authLoading) {
                    setLoading(false);
                    setError("Please log in to view your applications.");
                }
                return;
            }

            setLoading(true);
            setError(null);
            try {
                const queryParams = new URLSearchParams();
                queryParams.append('applicantUserId', user.uid);
                queryParams.append('page', currentPage);
                queryParams.append('limit', itemsPerPage);

                if (selectedStatus) queryParams.append('status', selectedStatus);
                if (selectedJobType) queryParams.append('jobType', selectedJobType);
                if (selectedEmploymentType) queryParams.append('employmentType', selectedEmploymentType);

                const response = await axios.get(`${baseURL}/myApplications?${queryParams.toString()}`);

                const fetchedApplications = response.data?.applications || [];
                const fetchedTotalPages = response.data?.totalPages || 1;

                setApplications(fetchedApplications);
                setTotalPages(fetchedTotalPages);

            } catch (err) {
                console.error("Error fetching applications:", err.response?.data || err.message);
                setError(err.response?.data?.message || "Failed to load applications. Please try again.");
                setApplications([]);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading) {
            fetchApplications();
        }
    }, [currentPage, itemsPerPage, user, authLoading, selectedStatus, selectedJobType, selectedEmploymentType]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setCurrentPage(1);

        if (name === 'status') setSelectedStatus(value);
        else if (name === 'jobType') setSelectedJobType(value);
        else if (name === 'employmentType') setSelectedEmploymentType(value);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleSeeDetails = (application) => {
        setSelectedApplicationDetails(application);
        setShowDetailsModal(true); // Set state to true to ensure modal is mounted
        // Use a slight delay to ensure the dialog is fully mounted before calling showModal
        // This helps prevent the double-click issue if React hasn't finished its render cycle
        setTimeout(() => {
            const modal = document.getElementById('application_details_modal');
            if (modal) {
                modal.showModal();
            }
        }, 0); // 0ms delay means it runs after current call stack
    };

    const handleCloseDetailsModal = () => {
        // This function is now called both by the explicit close button
        // AND by the dialog's native 'close' event.
        setShowDetailsModal(false);
        setSelectedApplicationDetails(null);
    };

    // Helper for status badge styling
    const getStatusBadge = (status) => {
        switch (status) {
            case 'Pending':
            case 'Reviewed':
            case 'Interview':
                return <div className="badge badge-warning text-white badge-sm">Pending</div>;
            case 'Accepted':
                return <div className="badge badge-success text-white badge-sm">Accepted</div>;
            case 'Rejected':
                return <div className="badge badge-error text-white badge-sm">Rejected</div>;
            default:
                return <div className="badge badge-secondary text-white badge-sm">N/A</div>;
        }
    };

    return (
        <div className='container mx-auto p-4'>
            <h1 className='mt-5 mb-3 text-2xl md:mt-8 md:mb-6 md:text-4xl font-bold text-secondary text-center'>My Applications</h1>

            {/* Filter Section */}
            <div className="bg-base-100 p-6 rounded-box shadow-md mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Application Status Filter */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Status</span>
                    </label>
                    <select
                        className="select select-bordered w-full"
                        name="status"
                        value={selectedStatus}
                        onChange={handleFilterChange}
                    >
                        <option value="">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

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
            </div>
            {/* End Filter Section */}

            {loading && <div className="text-center my-8"><span className="loading loading-spinner loading-lg text-primary"></span><p>Loading your applications...</p></div>}
            {error && <div className="text-center my-8 text-red-500"><p>{error}</p></div>}

            {!loading && !error && applications.length === 0 && (
                <div className="text-center my-8 text-gray-600">
                    <p>You haven't submitted any applications yet or no applications match your criteria.</p>
                </div>
            )}

            {!loading && !error && applications.length > 0 && (
                <>
                    <div className="overflow-x-auto rounded-box border border-slate-200 bg-base-100 mb-8 ">
                        <table className="table table-zebra w-full text-center">
                            <thead>
                                <tr className='border-b border-b-slate-400 text-xs md:text-sm'>
                                    <th>Sl No.</th>
                                    <th>Job Title</th>
                                    <th>Company Name</th>
                                    <th>Job Type</th>
                                    <th>Applied On</th>
                                    <th>Status</th>
                                    <th className='w-24'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app, index) => (
                                    <tr key={app._id} className='border-b border-b-slate-400 text-xs md:text-sm'>
                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td>{app?.jobTitle || 'N/A'}</td>
                                        <td>{app?.companyName || 'N/A'}</td>
                                        <td>{app?.jobType || 'N/A'} ({app?.employmentType || 'N/A'})</td>
                                        <td>{app?.appliedAt ? format(parseISO(app.appliedAt), 'dd/MM/yyyy') : 'N/A'}</td>
                                        <td>{getStatusBadge(app?.status)}</td>
                                        <td className='p-0'>
                                            <button
                                                onClick={() => handleSeeDetails(app)}
                                                className="btn btn-xs md:btn-sm bg-secondary dark:bg-primary text-white font-bold mx-auto"
                                            >
                                                See Details
                                            </button>
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

            {/* Application Details Modal */}
            {/* The <dialog> element itself */}
            {showDetailsModal && selectedApplicationDetails && (
                <dialog
                    id="application_details_modal"
                    className="modal"
                    onClose={handleCloseDetailsModal} // <-- CRITICAL: Add this event listener
                >
                    <div className="modal-box w-11/12 max-w-3xl p-6 sm:p-8">
                        {/* Close button inside the modal for better UX */}
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleCloseDetailsModal}>✕</button>
                        </form>
                        <h3 className="font-bold text-lg text-primary mb-4">Application Details for: {selectedApplicationDetails.jobTitle}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
                            {/* Applicant Info */}
                            <div className='flex flex-col gap-2 md:text-base w-full'>
                                <label className="label font-semibold">Applicant Name:</label>
                                <input type="text" defaultValue={selectedApplicationDetails.applicantName || 'N/A'} className="input input-bordered w-full cursor-not-allowed" readOnly />
                            </div>
                            <div className='flex flex-col gap-2 md:text-base w-full'>
                                <label className="label font-semibold">Applicant Email:</label>
                                <input type="email" defaultValue={selectedApplicationDetails.applicantEmail || 'N/A'} className="input input-bordered w-full cursor-not-allowed" readOnly />
                            </div>
                            <div className='flex flex-col gap-2 md:text-base w-full'>
                                <label className="label font-semibold">Phone Number:</label>
                                <input type="tel" defaultValue={selectedApplicationDetails.applicantPhoneNumber || 'N/A'} className="input input-bordered w-full cursor-not-allowed" readOnly />
                            </div>
                            <div className='flex flex-col gap-2 md:text-base w-full'>
                                <label className="label font-semibold">Resume/CV Link:</label>
                                {/* Styled as input, but remains a clickable link */}
                                <a href={selectedApplicationDetails.resumeLink} target="_blank" rel="noopener noreferrer"
                                    className="input input-bordered w-full link link-primary break-all flex items-center h-auto min-h-[3rem] cursor-pointer overflow-hidden">
                                    {selectedApplicationDetails.resumeLink || 'N/A'}
                                </a>
                            </div>
                            <div className='flex flex-col gap-2 md:text-base w-full'>
                                <label className="label font-semibold">LinkedIn Profile:</label>
                                <a href={selectedApplicationDetails.linkedInUrl} target="_blank" rel="noopener noreferrer"
                                    className="input input-bordered w-full link link-primary break-all flex items-center h-auto min-h-[3rem] cursor-pointer overflow-hidden">
                                    {selectedApplicationDetails.linkedInUrl || 'N/A'}
                                </a>
                            </div>
                            <div className='flex flex-col gap-2 md:text-base w-full'>
                                <label className="label font-semibold">Portfolio URL:</label>
                                <a href={selectedApplicationDetails.portfolioUrl} target="_blank" rel="noopener noreferrer"
                                    className="input input-bordered w-full link link-primary break-all flex items-center h-auto min-h-[3rem] cursor-pointer overflow-hidden">
                                    {selectedApplicationDetails.portfolioUrl || 'N/A'}
                                </a>
                            </div>
                            <div className='flex flex-col gap-2 md:text-base w-full'>
                                <label className="label font-semibold">Desired Salary:</label>
                                <input type="text" defaultValue={selectedApplicationDetails.desiredSalary || 'N/A'} className="input input-bordered w-full cursor-not-allowed" readOnly />
                            </div>
                            <div className='flex flex-col col-span-full gap-2 md:text-base w-full'>
                                <label className="label font-semibold">Cover Letter:</label>
                                <textarea defaultValue={selectedApplicationDetails.coverLetter || 'N/A'} className="textarea textarea-bordered h-32 w-full cursor-not-allowed" readOnly></textarea>
                            </div>

                            {/* Job Info (from application record) */}
                            <div className='flex flex-col gap-2 md:text-base w-full'>
                                <label className="label font-semibold">Company Name:</label>
                                <input type="text" defaultValue={selectedApplicationDetails.companyName || 'N/A'} className="input input-bordered w-full cursor-not-allowed" readOnly />
                            </div>
                            <div className='flex flex-col gap-2 md:text-base w-full'>
                                <label className="label font-semibold">Job Type:</label>
                                <input type="text" defaultValue={`${selectedApplicationDetails.jobType || 'N/A'} (${selectedApplicationDetails.employmentType || 'N/A'})`} className="input input-bordered w-full cursor-not-allowed" readOnly />
                            </div>
                            <div className='flex flex-col gap-2 md:text-base w-full'>
                                <label className="label"><span className="label-text font-semibold">Applied On:</span></label>
                                <input type="text" defaultValue={selectedApplicationDetails.appliedAt ? format(parseISO(selectedApplicationDetails.appliedAt), 'dd/MM/yyyy p') : 'N/A'} className="input input-bordered w-full cursor-not-allowed" readOnly />
                            </div>
                            <div className='flex flex-col gap-2 md:text-base w-full'>
                                <label className="label"><span className="label-text font-semibold">Application Status:</span></label>
                                <input type="text" defaultValue={getStatusBadge(selectedApplicationDetails.status).props.children} className="input input-bordered w-full cursor-not-allowed" readOnly />
                            </div>
                        </div>
                        <div className="modal-action">
                            <button className="btn btn-primary" onClick={handleCloseDetailsModal}>Close</button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default MyApplications;