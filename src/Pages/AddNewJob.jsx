import React, { useContext } from 'react';
import { AuthContext } from "../Providers/AuthProvider";
import axios from 'axios';
import Swal from 'sweetalert2';
import { baseURL } from '../Utilities/BaseURL';

const AddNewJob = () => {

    const { user } = useContext(AuthContext);

    const addNewJobSubmission = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newJobOrIntern = Object.fromEntries(formData.entries());
        newJobOrIntern.addedBy = user?.email;
        newJobOrIntern.startDate = new Date(newJobOrIntern.startDate);
        newJobOrIntern.appliDeadline = new Date(newJobOrIntern.appliDeadline);
        newJobOrIntern.addedAt = new Date();

        axios.post(`${baseURL}/jobsAndInterns`, {
            ...newJobOrIntern
        })
            .then(function (response) {
                if (response?.data?.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "New Marathon Details added successfully !!",
                        timer: 1500
                    });
                    e.target.reset();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Please try again later!!",
                        timer: 1500
                    });
                }
            })
            .catch(function (error) {
                Swal.fire({
                    icon: "error",
                    title: "Please try again later!!",
                    timer: 1500
                });
            });
    }

    return (
        <div className='container mx-auto'>
            <h1 className='mt-5 mb-3 text-2xl md:mt-8 md:mb-6 md:text-4xl font-bold text-primary text-center'>New Job/Internship Details</h1>
            <p className='mb-3 md:mb-6 text-center'>Add new job/internship details to help others find suitable job/internship easily</p>
            <div className='bg-base-200 border-base-300 rounded-box border mb-3 md:mb-6'>
                <form className="fieldset p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 items-end" onSubmit={addNewJobSubmission}>

                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">Job Title<span className='text-red-400'>*</span> </label>
                        <input type="text" className="input w-full" placeholder="Enter Job Title" name="title" required />
                    </div>

                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">Job Type<span className='text-red-400'>*</span> </label>
                        <select className="input w-full" placeholder="Select Job Type" name="jobType" required>
                            <option value="">--Please choose an option--</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Internship">Internship</option>
                            <option value="Contract">Contract</option>
                            <option value="Freelance">Freelance</option>
                        </select>
                    </div>

                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">Employment Type<span className='text-red-400'>*</span> </label>
                        <select className="input w-full" placeholder="Select Employment Type" name="employmentType" required>
                            <option value="">--Please choose an option--</option>
                            <option value="On-site">On-site</option>
                            <option value="Remote">Remote</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>

                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">Company Name<span className='text-red-400'>*</span> </label>
                        <input type="text" className="input w-full" placeholder="Enter Company Name" name="companyName" required />
                    </div>

                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">Location<span className='text-red-400'>*</span> </label>
                        <input type="text" className="input w-full" placeholder="Enter Location" name="location" required />
                    </div>

                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">Industry<span className='text-red-400'>*</span> </label>
                        <select className="input w-full" placeholder="Select Industry Type" name="industry" required>
                            <option value="">--Please choose an option--</option>
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

                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">Position<span className='text-red-400'>*</span> </label>
                        <input type="text" className="input w-full" placeholder="Enter Position" name="position" required />
                    </div>

                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">Department<span className='text-red-400'>*</span> </label>
                        <input type="text" className="input w-full" placeholder="Enter Department" name="dept" required />
                    </div>

                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">Starting Date<span className='text-red-400'>*</span> </label>
                        <input type="date" className="input w-full" placeholder="Select Starting Date" name="startDate" required />
                    </div>

                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">Application Deadline<span className='text-red-400'>*</span> </label>
                        <input type="date" className="input w-full" placeholder="Select Application Deadline" name="appliDeadline" required />
                    </div>

                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">Job Duration<span className='text-red-400'>*</span> </label>
                        <input type="text" className="input w-full" placeholder="Enter Job Duration" name="jobDuration" required />
                    </div>

                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">Work Schedule<span className='text-red-400'>*</span> </label>
                        <input type="text" className="input w-full" placeholder="Enter Work Schedule" name="workSchedule" required />
                    </div>

                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">Paid or Unpaid<span className='text-red-400'>*</span> </label>
                        <select className="input w-full" placeholder="Select a option" name="paid" required>
                            <option value="">--Please choose an option--</option>
                            <option value="yes">Paid</option>
                            <option value="no">Unpaid</option>
                        </select>
                    </div>

                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">Salary<span className='text-red-400'>*</span> </label>
                        <input type="text" className="input w-full" placeholder="Enter Salary" name="salary" required />
                    </div>

                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">Benefits<span className='text-red-400'>*</span> </label>
                        <input type="text" className="input w-full" placeholder="Enter Benefits" name="benefits" required />
                    </div>

                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">Responsibilities<span className='text-red-400'>*</span> </label>
                        <input type="text" className="input w-full" placeholder="Enter Responsibilities" name="responsibilities" required />
                    </div>

                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">Skills <span className='text-red-400'>*</span> </label>
                        <input type="text" className="input w-full" placeholder="Enter Skills" name="skills" required />
                    </div>

                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">Eligibility Criteria<span className='text-red-400'>*</span> </label>
                        <input type="text" className="input w-full" placeholder="Enter Eligibility Criteria" name="eligibility" required />
                    </div>

                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">Number of Openings<span className='text-red-400'>*</span> </label>
                        <input type="text" className="input w-full" placeholder="Enter Number of Openings" name="noOfOpenngs" required />
                    </div>

                    <div className='flex flex-col gap-2 md:text-base w-full'>
                        <label className="label font-semibold">Contact<span className='text-red-400'>*</span> </label>
                        <input type="text" className="input w-full" placeholder="Enter Contact Details" name="contact" required />
                    </div>

                    <button type='submit' className='btn btn-primary w-full font-bold text-white mt-4'>Add</button>
                </form>
            </div>
        </div>
    );
};

export default AddNewJob;