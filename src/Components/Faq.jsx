import React from 'react';
import FaqCard from './FaqCard';

const Faq = () => {
    const faqs = [
        {
            "question": "How do I apply for a job or internship on ProHire?",
            "answer": "You can apply by visiting the job's details page and clicking the 'Apply Now' button. Make sure you're logged in, and fill out the application form with your details and documents like your resume or CV."
        },
        {
            "question": "Is there an application deadline for job postings?",
            "answer": "Yes, each job or internship listing has a specific application deadline set by the employer. You'll find it clearly mentioned on the job's details page. Always submit your application before the deadline!"
        },
        {
            "question": "Can I update my application details after submitting?",
            "answer": "Once you've submitted an application, you generally cannot edit its details. However, you can update your personal profile information anytime from your dashboard. For any critical changes to an already submitted application, you might need to contact the employer directly."
        },
        {
            "question": "Does ProHire provide support for visa or relocation for international applicants?",
            "answer": "No, ProHire is a platform for connecting job seekers with employers. We do not provide assistance with visa applications, relocation, or accommodation. Such arrangements are between the applicant and the hiring company."
        },
        {
            "question": "Do job seekers receive confirmation of their application status?",
            "answer": "Yes! You can track the status of all your submitted applications on your 'My Applications' page in your dashboard. Employers will update the status there, and you'll see if your application is Pending, Accepted, or Rejected."
        },
        {
            "question": "As a recruiter, how do I view applications for my posted jobs?",
            "answer": "If you're a recruiter, navigate to your 'Find Applicants' page from your dashboard. You can select a specific job you've posted from the dropdown to view its applicants, or see applications for all your jobs by default."
        },
        {
            "question": "Can recruiters change the status of an application?",
            "answer": "Yes, on the 'Find Applicants' page, recruiters can preview applications and then choose to Accept or Reject an applicant, which updates the application's status."
        }
    ];

    return (
        <>
            <h1 className='mb-2 text-2xl  md:mb-4 md:text-4xl font-bold text-secondary'>Frequently Asked Questions (FAQ)</h1>
            <div className="join join-vertical bg-base-200 w-full rounded-md md:rounded-xl overflow-hidden text-sm md:text-base">
                {
                    faqs.map((faq, index) => <FaqCard key={index} faq={faq}></FaqCard>)
                }
            </div>
        </>
    );
};

export default Faq;