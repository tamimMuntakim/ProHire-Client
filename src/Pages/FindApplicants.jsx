// src/Pages/FindApplicants.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import Swal from 'sweetalert2';
import { AuthContext } from '../Providers/AuthProvider';
import { baseURL } from '../Utilities/BaseURL';

const FindApplicants = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [postedJobs, setPostedJobs] = useState([]); // To store jobs posted by the recruiter
    const [selectedJobId, setSelectedJobId] = useState(''); // Selected job to filter applicants (empty string for 'All My Posted Jobs')
    const [applicants, setApplicants] = useState([]); // Applications for the selected job(s)
    const [loadingJobs, setLoadingJobs] = useState(true);
    const [loadingApplicants, setLoadingApplicants] = useState(false);
    const [errorJobs, setErrorJobs] = useState(null);
    const [errorApplicants, setErrorApplicants] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 7;

    // State for the details modal
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedApplicationDetails, setSelectedApplicationDetails] = useState(null);

    // Filter state for recruiter's view (only status for now, as per request)
    const [selectedApplicantStatusFilter, setSelectedApplicantStatusFilter] = useState('');


    // Effect to fetch jobs posted by the recruiter
    useEffect(() => {
        const fetchPostedJobs = async () => {
            if (!user?.email) {
                if (!authLoading) {
                    setLoadingJobs(false);
                    setErrorJobs("Please log in as a recruiter to view your posted jobs.");
                }
                return;
            }

            setLoadingJobs(true);
            setErrorJobs(null);
            try {
                const response = await axios.get(`${baseURL}/myPostedJobs?employerEmail=${user.email}`);
                setPostedJobs(response.data || []);
                // selectedJobId remains '' to show all jobs by default.
            } catch (err) {
                console.error("Error fetching posted jobs:", err.response?.data || err.message);
                setErrorJobs(err.response?.data?.message || "Failed to load your posted jobs.");
                setPostedJobs([]);
            } finally {
                setLoadingJobs(false);
            }
        };

        if (!authLoading) {
            fetchPostedJobs();
        }
    }, [user, authLoading]);

    // Effect to fetch applicants for the selected job(s) - CRITICAL FIX HERE
    useEffect(() => {
        const fetchApplicants = async () => {
            // Only proceed if user is authenticated and auth state is resolved
            if (!user?.email || authLoading) {
                setLoadingApplicants(false);
                setApplicants([]);
                setTotalPages(1);
                return;
            }

            setLoadingApplicants(true);
            setErrorApplicants(null);
            try {
                const queryParams = new URLSearchParams();
                queryParams.append('page', currentPage);
                queryParams.append('limit', itemsPerPage);

                // --- CRITICAL FIX: Logic for fetching all applications by default ---
                if (selectedJobId) {
                    // If a specific job is selected in the dropdown, filter by its ID
                    queryParams.append('jobId', selectedJobId);
                } else {
                    // If no specific job is selected (default "All My Posted Jobs"),
                    // send the recruiter's email to get applications for ALL their jobs.
                    queryParams.append('employerEmail', user.email);
                }
                // --- End CRITICAL FIX ---

                // Apply the simplified status filter
                if (selectedApplicantStatusFilter) {
                    queryParams.append('status', selectedApplicantStatusFilter);
                }

                const response = await axios.get(`${baseURL}/applicationsByJob?${queryParams.toString()}`);
                setApplicants(response.data?.applications || []);
                setTotalPages(response.data?.totalPages || 1);
            } catch (err) {
                console.error("Error fetching applicants:", err.response?.data || err.message);
                setErrorApplicants(err.response?.data?.message || "Failed to load applicants.");
                setApplicants([]);
                setTotalPages(1);
            } finally {
                setLoadingApplicants(false);
            }
        };

        // Trigger fetch when user is ready, or when selectedJobId/filters change.
        // This ensures the initial load happens once user.email is available.
        if (!authLoading && user?.email) {
            fetchApplicants();
        } else if (!authLoading && !user?.email) {
            // If auth is done and no user, clear state
            setLoadingApplicants(false);
            setApplicants([]);
            setTotalPages(1);
        }
    }, [selectedJobId, currentPage, itemsPerPage, selectedApplicantStatusFilter, user, authLoading]); // Dependencies

    // Handler for job selection dropdown
    const handleJobSelectChange = (e) => {
        setSelectedJobId(e.target.value);
        setCurrentPage(1); // Reset to first page when job changes
        setSelectedApplicantStatusFilter(''); // Reset status filter when job changes
    };

    // Handler for status filter change
    const handleStatusFilterChange = (e) => {
        setSelectedApplicantStatusFilter(e.target.value);
        setCurrentPage(1); // Reset to first page when filter changes
    };

    // Pagination handlers
    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    // Function to open the details modal
    const handleSeeDetails = (application) => {
        setSelectedApplicationDetails(application);
        setShowDetailsModal(true);
        setTimeout(() => {
            const modal = document.getElementById('application_details_modal');
            if (modal) {
                modal.showModal();
            }
        }, 0);
    };

    // Function to close the details modal
    const handleCloseDetailsModal = () => {
        const modal = document.getElementById('application_details_modal');
        if (modal) {
            modal.close();
        }
        setShowDetailsModal(false);
        setSelectedApplicationDetails(null);
    };

    // Helper for status badge styling - STRICTLY PENDING, ACCEPTED, REJECTED
    const getStatusBadge = (status) => {
        switch (status) {
            case 'Pending':
            case 'Reviewed': // Map Reviewed to Pending for display
            case 'Interview': // Map Interview to Pending for display
                return <div className="badge badge-warning text-white badge-sm">Pending</div>;
            case 'Accepted':
                return <div className="badge badge-success text-white badge-sm">Accepted</div>;
            case 'Rejected':
                return <div className="badge badge-error text-white badge-sm">Rejected</div>;
            default:
                // Fallback for any unexpected status, keeping it within the simplified view
                return <div className="badge badge-secondary text-white badge-sm">Pending</div>;
        }
    };

    // --- Application Status Update Handlers ---
    const updateApplicationStatus = async (applicationId, newStatus) => {
        const actionVerb = newStatus.toLowerCase();
        let displayVerb;
        if (actionVerb === 'accepted') {
            displayVerb = 'accept';
        } else if (actionVerb === 'rejected') {
            displayVerb = 'reject';
        } else {
            displayVerb = actionVerb;
        }

        Swal.fire({
            title: `Are you sure you want to ${displayVerb}?`,
            text: `This will set the application status to "${newStatus}".`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, ${displayVerb} it!`
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.patch(`${baseURL}/applications/${applicationId}/status`, { status: newStatus });
                    if (response.data?.modifiedCount > 0) {
                        Swal.fire(
                            'Updated!',
                            `Application status set to "${newStatus}".`,
                            'success'
                        );
                        // Re-fetch applicants to update the table
                        setLoadingApplicants(true);
                        setErrorApplicants(null);
                        const queryParams = new URLSearchParams();
                        queryParams.append('page', currentPage);
                        queryParams.append('limit', itemsPerPage);
                        // Re-apply current job filter (or default to all jobs)
                        if (selectedJobId) {
                            queryParams.append('jobId', selectedJobId);
                        } else {
                            queryParams.append('employerEmail', user.email);
                        }
                        // Re-apply current status filter if any
                        if (selectedApplicantStatusFilter) {
                            queryParams.append('status', selectedApplicantStatusFilter);
                        }
                        const updatedResponse = await axios.get(`${baseURL}/applicationsByJob?${queryParams.toString()}`);
                        setApplicants(updatedResponse.data?.applications || []);
                        setLoadingApplicants(false);
                    } else {
                        Swal.fire('Failed!', 'Could not update application status.', 'error');
                    }
                } catch (error) {
                    console.error(`Error ${actionVerb}ing application:`, error.response?.data || error.message);
                    Swal.fire('Error!', `Failed to update status: ${error.response?.data?.message || 'Server error'}`, 'error');
                }
            }
        });
    };


    return (
        <div className='container mx-auto p-4'>
            <h1 className='mt-5 mb-3 text-2xl md:mt-8 md:mb-6 md:text-4xl font-bold text-secondary text-center'>Find Applicants</h1>

            {/* Job Selection Filter & Status Filter */}
            <div className="bg-base-100 p-6 rounded-box shadow-md mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Job Selection Dropdown */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Select a Job You Posted:</span>
                    </label>
                    {loadingJobs ? (
                        <span className="loading loading-spinner loading-md text-primary"></span>
                    ) : errorJobs ? (
                        <p className="text-red-500">{errorJobs}</p>
                    ) : postedJobs.length === 0 ? (
                        <p className="text-gray-600">No jobs posted by you yet.</p>
                    ) : (
                        <select
                            className="select select-bordered w-full"
                            name="selectedJob"
                            value={selectedJobId}
                            onChange={handleJobSelectChange}
                        >
                            <option value="">All My Posted Jobs</option> {/* Default option to show all */}
                            {postedJobs.map(job => (
                                <option key={job._id} value={job._id}>
                                    {job.title} ({job.companyName})
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {/* Status Filter Dropdown */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Filter by Status:</span>
                    </label>
                    <select
                        className="select select-bordered w-full"
                        name="statusFilter"
                        value={selectedApplicantStatusFilter}
                        onChange={handleStatusFilterChange}
                        disabled={postedJobs.length === 0} // Disable if no jobs are posted
                    >
                        <option value="">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>
            {/* End Job Selection Filter & Status Filter */}

            {loadingApplicants ? (
                <div className="text-center my-8"><span className="loading loading-spinner loading-lg text-primary"></span><p>Loading applicants...</p></div>
            ) : errorApplicants ? (
                <div className="text-center my-8 text-red-500"><p>{errorApplicants}</p></div>
            ) : postedJobs.length === 0 ? (
                <div className="text-center my-8 text-gray-600">
                    <p>You have not posted any jobs yet.</p>
                </div>
            ) : applicants.length === 0 && selectedJobId === '' && selectedApplicantStatusFilter === '' ? (
                <div className="text-center my-8 text-gray-600">
                    <p>No applicants found for any of your posted jobs.</p>
                </div>
            ) : applicants.length === 0 ? (
                <div className="text-center my-8 text-gray-600">
                    <p>No applicants found for {selectedJobId ? `the selected job` : `your posted jobs`} matching the current filters.</p>
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto rounded-box border border-slate-200 bg-base-100 mb-8 ">
                        <table className="table table-zebra w-full text-center">
                            <thead>
                                <tr className='border-b border-b-slate-400 text-xs md:text-sm'>
                                    <th>Sl No.</th>
                                    <th>Applicant Name</th>
                                    <th>Job Title</th>
                                    <th>Applied On</th>
                                    <th>Status</th>
                                    <th className='w-48'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applicants.map((applicant, index) => (
                                    <tr key={applicant._id} className='border-b border-b-slate-400 text-xs md:text-sm'>
                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td>{applicant?.applicantName || 'N/A'}</td>
                                        <td>{applicant?.jobTitle || 'N/A'}</td>
                                        <td>{applicant?.appliedAt ? format(parseISO(applicant.appliedAt), 'dd/MM/yyyy') : 'N/A'}</td>
                                        <td>{getStatusBadge(applicant?.status)}</td>
                                        <td className='p-0'>
                                            <div className="flex flex-col sm:flex-row gap-1 justify-center items-center">
                                                <button
                                                    onClick={() => handleSeeDetails(applicant)}
                                                    className="btn btn-xs md:btn-sm btn-info text-white font-bold"
                                                >
                                                    Preview
                                                </button>
                                                {/* Only show Accept/Reject if status is not already Accepted/Rejected */}
                                                {applicant.status !== 'Accepted' && applicant.status !== 'Rejected' && (
                                                    <>
                                                        <button
                                                            onClick={() => updateApplicationStatus(applicant._id, 'Accepted')}
                                                            className="btn btn-xs md:btn-sm btn-success text-white font-bold"
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            onClick={() => updateApplicationStatus(applicant._id, 'Rejected')}
                                                            className="btn btn-xs md:btn-sm btn-error text-white font-bold"
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                            </div>
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
            {showDetailsModal && selectedApplicationDetails && (
                <dialog
                    id="application_details_modal"
                    className="modal"
                    onClose={handleCloseDetailsModal}
                >
                    <div className="modal-box w-11/12 max-w-3xl p-6 sm:p-8">
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
                                <input type="tel" defaultValue={selectedApplicationDetails.phoneNumber || 'N/A'} className="input input-bordered w-full cursor-not-allowed" readOnly />
                            </div>
                            <div className='flex flex-col gap-2 md:text-base w-full'>
                                <label className="label font-semibold">Resume/CV Link:</label>
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

export default FindApplicants;