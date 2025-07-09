import React from 'react';
import { Link } from 'react-router';
import { format, parseISO } from 'date-fns';

const JobCard = ({ job }) => {
  return (
    <div className="card bg-base-100 shadow-md border border-gray-200 hover:shadow-lg transition">
      <div className="card-body">
        <h2 className="card-title text-lg font-bold text-primary">
          {job?.title}
        </h2>
        <p className="text-sm text-gray-600">{job?.companyName}</p>
        <p className="text-sm"><span className="font-semibold">Location:</span> {job?.location}</p>
        <p className="text-sm"><span className="font-semibold">Salary:</span> {job?.salary}</p>
        <p className="text-sm"><span className="font-semibold">Type:</span> {job?.jobType} ({job?.employmentType})</p>
        {/* Full-time (Remote) */}
        <p className="text-sm"><span className="font-semibold">Deadline: </span>
          {job?.appliDeadline
            ? format(parseISO(job?.appliDeadline), "EEEE, MMMM do, yyyy") // Added yyyy for full year
            : "N/A" // Fallback if deadline is not available
          }
        </p>
        <div className="card-actions justify-end mt-4">
          <Link to={`/see-details/${job?._id}`} className="btn btn-outline btn-sm btn-primary">Show Details</Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;