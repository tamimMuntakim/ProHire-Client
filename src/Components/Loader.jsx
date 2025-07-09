import React from 'react';

const Loader = () => {
    return (
        <div className='min-h-[calc(100vh-460px)] md:min-h-[calc(100vh-340px)] flex justify-center items-center text-primary'>
            <span className="loading loading-infinity loading-xl md:w-[50px] md:h-auto"></span>
        </div>
    );
};

export default Loader;