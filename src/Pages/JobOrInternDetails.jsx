import React from 'react';
// If you are NOT using react-router-dom, useLoaderData will likely not work directly from 'react-router'.
// You'll need to get your job data differently, e.g., via useEffect and axios.
// For this example, I'm keeping useLoaderData for illustration, assuming it resolves for you.
import { useLoaderData } from 'react-router'; // <--- IMPORTANT: This typically comes from 'react-router-dom' for web apps
import { format, parseISO } from 'date-fns';
import { FaBuilding, FaBriefcase, FaClock, FaCalendarAlt, FaPhoneAlt, FaAward, FaMoneyBill, FaUserPlus, FaInfoCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";


const JobOrInternDetails = () => {
  const job = useLoaderData(); // This line depends on react-router-dom's loader setup

  // Handle case where job data might not be loaded
  if (!job) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
        <div className="card w-full max-w-3xl bg-base-100 shadow-2xl border border-gray-200 text-center p-8">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Job or Internship Details Not Found</h2>
          <p className="text-gray-700">The requested listing could not be loaded. It might have been removed or the ID is incorrect.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center bg-base-200 py-8">
      <div className="card w-full max-w-3xl bg-base-100 shadow-2xl border border-gray-200 rounded-lg">
        <div className="card-body space-y-4 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-primary leading-tight">
              {job?.title || 'Job/Internship Title N/A'}
            </h1>
            <div className={`badge ${job?.paid === 'yes' ? 'badge-success' : 'badge-warning'} text-white text-sm font-semibold p-3`}>
              {job?.paid === 'yes' ? 'Paid' : 'Unpaid'}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <p className="flex items-center gap-2"><FaBuilding className="text-blue-500" /> {job?.companyName || 'Company N/A'}</p>
            <p className="flex items-center gap-2"><FaLocationDot className="text-red-500" /> {job?.location || 'Location N/A'}</p>
            <p className="flex items-center gap-2"><FaBriefcase className="text-yellow-600" /> {job?.position || 'Position N/A'} — {job?.jobType || 'Type N/A'} ({job?.employmentType || 'Employment N/A'})</p>
            <p className="flex items-center gap-2"><FaClock className="text-green-600" /> {job?.workSchedule || 'Schedule N/A'}</p>

            {/* --- Highlighted Start Date --- */}
            <p className="flex items-center gap-2 font-bold text-green-700"> {/* Added font-bold and text-green-700 */}
              <FaCalendarAlt className="text-green-500" /> Start: {job?.startDate ? format(parseISO(job.startDate), "do MMMM yyyy") : 'N/A'}
            </p>

            {/* --- Highlighted Deadline --- */}
            <p className="flex items-center gap-2 font-bold text-red-700"> {/* Added font-bold and text-red-700 */}
              <FaCalendarAlt className="text-red-500" /> Deadline: {job?.appliDeadline ? format(parseISO(job.appliDeadline), "do MMMM yyyy") : 'N/A'}
            </p>

            <p className="flex items-center gap-2"><FaMoneyBill className="text-purple-600" /> Salary: {job?.salary || 'N/A'}</p>
            <p className="flex items-center gap-2"><FaAward className="text-orange-400" /> {job?.eligibility || 'Eligibility N/A'}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 text-sm text-gray-700">
            <p><span className="font-semibold">Department:</span> {job?.dept || 'N/A'}</p>
            <p><span className="font-semibold">Industry:</span> {job?.industry || 'N/A'}</p>
            <p><span className="font-semibold">Job Duration:</span> {job?.jobDuration || 'N/A'}</p>
            <p><span className="font-semibold">Openings:</span> {job?.noOfOpenngs || 'N/A'}</p>
            <p><span className="font-semibold">Skills:</span> {job?.skills || 'N/A'}</p>
            <p><span className="font-semibold">Benefits:</span> {job?.benefits || 'N/A'}</p>
            <p><span className="font-semibold">Responsibilities:</span> {job?.responsibilities || 'N/A'}</p>
            <p className="flex items-center gap-2"><FaPhoneAlt className="text-gray-500" /> {job?.contact || 'N/A'}</p>
            {/* <p className="flex items-center gap-2"><FaUserPlus className="text-teal-500" /> Added By: {job?.addedBy || 'N/A'}</p>
            <p className="flex items-center gap-2"><FaInfoCircle className="text-blue-400" /> Added At: {job?.addedAt ? format(parseISO(job.addedAt), "do MMMM yyyy, p") : 'N/A'}</p> */}
          </div>

          <div className="card-actions justify-end mt-6">
            <button className="btn btn-primary px-6">Apply Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOrInternDetails;