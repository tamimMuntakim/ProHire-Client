// src/Pages/ApplyForJob.jsx
import React, { useContext, useState } from 'react';
import { AuthContext } from "../Providers/AuthProvider";
import axios from 'axios';
import Swal from 'sweetalert2';
// IMPORTANT: Ensure useLoaderData is imported from 'react-router-dom'
// as it's the standard for browser routers using loaders.
import { useLoaderData, useNavigate } from 'react-router';
import { baseURL } from '../Utilities/BaseURL';


const ApplyForJob = () => {
    const { user } = useContext(AuthContext); // Get logged-in user from AuthContext
    const job = useLoaderData(); // Get job details from the loader
    const navigate = useNavigate(); // To redirect after successful application

    // State for consent checkbox
    const [hasConsented, setHasConsented] = useState(false);

    // Initial pre-filled values for read-only fields
    const defaultApplicantFullName = user?.displayName || '';
    const defaultApplicantEmail = user?.email || '';

    const handleApplicationSubmission = async (e) => {
        e.preventDefault();

        // Basic client-side validation for consent
        if (!hasConsented) {
            Swal.fire({
                icon: "warning",
                title: "Consent Required",
                text: "Please agree to the terms by checking the consent box.",
                timer: 2000
            });
            return;
        }

        if (!job?._id || !user?.uid) { // Check for essential IDs before proceeding
            Swal.fire({
                icon: "error",
                title: "Missing Data",
                text: "Could not retrieve necessary job or user information. Please try again.",
                timer: 2000
            });
            return;
        }

        // --- SIMPLIFIED INPUT PROCESSING ---
        const formData = new FormData(e.target);
        const applicantInput = Object.fromEntries(formData.entries());

        // Compile application data
        const applicationData = {
            applicantUserId: user?.uid, // Firebase UID, if that's what you use for usersCollection
            applicantName: defaultApplicantFullName, // Use pre-filled name
            applicantEmail: defaultApplicantEmail,   // Use pre-filled email
            ...applicantInput, // Spread all form inputs (phone, resume link, etc.)

            // --- Fields from Job Object (auto-included) ---
            jobId: job?._id,
            jobTitle: job?.title,
            companyName: job?.companyName,
            employerEmail: job?.addedBy || job?.contact, // Use addedBy (poster) or contact email
            jobType: job?.jobType,
            employmentType: job?.employmentType,
        };

        try {
            const response = await axios.post(`${baseURL}/applications`, applicationData);

            if (response?.data?.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Application Submitted!",
                    text: "Your application has been successfully sent.",
                    timer: 2000
                });
                e.target.reset(); // Reset form fields
                setHasConsented(false); // Reset consent checkbox
                // navigate('/dashboard/my-applications'); // Redirect user to their applications page
                navigate('/'); // Redirect user to their applications page
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Submission Failed",
                    text: "There was an issue submitting your application. Please try again later.",
                    timer: 2000
                });
            }
        } catch (error) {
            console.error("Application submission error:", error.response?.data || error.message);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response?.data?.message || "An unexpected error occurred during submission.",
                timer: 2000
            });
        }
    };


    return (
        <div className='container mx-auto p-4'>
            <h1 className='mt-5 mb-3 text-2xl md:mt-8 md:mb-6 md:text-4xl font-bold text-primary text-center'>
                Apply for: {job?.title || 'Job/Internship'} at {job?.companyName || 'Company'}
            </h1>
            <p className='mb-3 md:mb-6 text-center'>
                Fill out the form below to submit your application for this position.
            </p>

            <div className='bg-base-200 border-base-300 rounded-box border mb-3 md:mb-6'>
                <form className="fieldset p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 items-end" onSubmit={handleApplicationSubmission}>

                    {/* Applicant Information (Pre-filled & Read-Only) */}
                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">Full Name</label>
                        {/* Value is directly from the default, no need for controlled component for read-only */}
                        <input
                            type="text"
                            className="input w-full cursor-not-allowed"
                            name="fullName"
                            value={defaultApplicantFullName}
                            readOnly
                        />
                    </div>

                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">Email Address</label>
                        {/* Value is directly from the default, no need for controlled component for read-only */}
                        <input
                            type="email"
                            className="input w-full cursor-not-allowed"
                            name="email"
                            value={defaultApplicantEmail}
                            readOnly
                        />
                    </div>

                    {/* Applicant Input Fields */}
                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">
                            Phone Number<span className='text-red-400'>*</span>
                        </label>
                        <input
                            type="tel"
                            className="input w-full"
                            placeholder="Enter your phone number"
                            name="phoneNumber"
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">
                            Resume/CV Link<span className='text-red-400'>*</span>
                        </label>
                        <input
                            type="url"
                            className="input w-full"
                            placeholder="Link to your online Resume/CV (e.g., Google Drive, Dropbox)"
                            name="resumeLink"
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">LinkedIn Profile URL</label>
                        <input
                            type="url"
                            className="input w-full"
                            placeholder="https://linkedin.com/in/yourprofile"
                            name="linkedInUrl"
                        />
                    </div>

                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">Portfolio/Personal Website URL</label>
                        <input
                            type="url"
                            className="input w-full"
                            placeholder="https://yourportfolio.com"
                            name="portfolioUrl"
                        />
                    </div>

                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">Desired Salary/Rate</label>
                        <input
                            type="text"
                            className="input w-full"
                            placeholder="Enter your desired salary or 'Negotiable'"
                            name="desiredSalary"
                        />
                    </div>

                    {/* Cover Letter - Col-span for wider textarea */}
                    <div className='flex flex-col gap-2 md:text-base w-full col-span-full'>
                        <label className="label font-semibold">Cover Letter</label>
                        <textarea
                            className="textarea textarea-bordered h-32 w-full"
                            placeholder="Write your cover letter here..."
                            name="coverLetter"
                        ></textarea>
                    </div>

                    {/* Consent Checkbox */}
                    <div className="col-span-full flex items-center gap-2 mt-4">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-primary"
                            checked={hasConsented}
                            onChange={(e) => setHasConsented(e.target.checked)}
                            required // Make consent mandatory
                        />
                        <label className="label-text">
                            I confirm that the information provided is accurate and I consent to my data being processed for this application.
                            <span className='text-red-400'>*</span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-full flex justify-end mt-4">
                        <button type='submit' className='btn btn-primary px-8 text-white font-bold'>
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplyForJob;