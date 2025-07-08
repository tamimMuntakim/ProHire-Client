import React from 'react';
import { FaBuilding, FaBriefcase, FaClock, FaCalendarAlt, FaPhoneAlt, FaAward, FaMoneyBill } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";


const JobOrInternDetails = () => {
       return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-3xl bg-base-100 shadow-2xl border border-gray-200">
        <div className="card-body space-y-3">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-primary">Asst Programmer Needed</h1>
            <div className="badge badge-success text-white">Remote</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <p className="flex items-center gap-2"><FaBuilding className="text-blue-500" /> ABC Tech. Ltd.</p>
            <p className="flex items-center gap-2"><FaLocationDot className="text-red-500" /> Mirpur DOHS, Dhaka</p>
            <p className="flex items-center gap-2"><FaBriefcase className="text-yellow-600" /> Ass.t Programmer — Full-time</p>
            <p className="flex items-center gap-2"><FaClock className="text-green-600" /> 5 days/week, 8hrs (Fri-Sat off)</p>
            <p className="flex items-center gap-2"><FaCalendarAlt className="text-indigo-500" /> Start: 31 July 2025</p>
            <p className="flex items-center gap-2"><FaCalendarAlt className="text-pink-500" /> Deadline: 14 July 2025</p>
            <p className="flex items-center gap-2"><FaMoneyBill className="text-pink-500" /> Salary: ~30k</p>
            <p className="flex items-center gap-2"><FaAward className="text-orange-400" /> 2 years experience</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 text-sm">
            <p><span className="font-semibold">Department:</span> ICT, BUP</p>
            <p><span className="font-semibold">Industry:</span> Tech</p>
            <p><span className="font-semibold">Job Duration:</span> Based on performance</p>
            <p><span className="font-semibold">Openings:</span> 2</p>
            <p><span className="font-semibold">Skills:</span> Figma</p>
            <p><span className="font-semibold">Benefits:</span> Yearly bonus × 2</p>
            <p><span className="font-semibold">Responsibilities:</span> Designing app UIs</p>
            <p className="flex items-center gap-2"><FaPhoneAlt className="text-gray-500" /> +8801234567841</p>
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