import React from 'react';
import { Link } from 'react-router';

const JobCard = () => {
    return (
       <div className="card bg-base-100 shadow-md border border-gray-200 hover:shadow-lg transition">
        <div className="card-body">
          <h2 className="card-title text-lg font-bold text-primary">
            Asst Programmer
          </h2>
          <p className="text-sm text-gray-600">ABC Tech. Ltd. — Tech</p>
          <p className="text-sm"><span className="font-semibold">Location:</span> Mirpur DOHS, Dhaka</p>
          <p className="text-sm"><span className="font-semibold">Salary:</span> ~30k</p>
          <p className="text-sm"><span className="font-semibold">Type:</span> Full-time (Remote)</p>
          <p className="text-sm"><span className="font-semibold">Deadline:</span> 14 July 2025</p>
          <div className="card-actions justify-end mt-4">
            <Link to={"/see-details"} className="btn btn-outline btn-sm btn-primary">Show Details</Link>
          </div>
        </div>
      </div>
  );
};

export default JobCard;