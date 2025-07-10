import React from 'react';

const FaqCard = ({ faq }) => {
    return (
        <div className="collapse collapse-arrow join-item border-slate-200 border-b-2">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title font-medium">{faq.question}</div>
            <div className="collapse-content text-sm font-light">{faq.answer}</div>
        </div>
    );
};

export default FaqCard;