import React from 'react';

const JobCard = () => {
    return (
        <div className="carousel-item w-1/4">
            <div className="card bg-base-100 image-full shadow-sm">
                <figure>
                    <img
                        src="https://i.ibb.co/8LxfPPcK/tim-mossholder-GOMhu-Cj-O9w-unsplash.jpg"
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Job Title</h2>
                    <p>Job Description</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobCard;