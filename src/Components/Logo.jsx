import React from 'react';
import { Link, useNavigate } from 'react-router';

const Logo = () => {
    const navigate = useNavigate();
    return (
        <>
            <p className="text-xl text-primary flex items-center font-bold" onClick={()=>navigate("/")}>
                <img className='w-[50px] h-auto' src="https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/66/external-Hire-banking-and-finance-smashingstocks-flat-smashing-stocks.png" alt="external-Hire-banking-and-finance-smashingstocks-flat-smashing-stocks" />
                <span className='logo-font mt-1'>Pro<span className='logo-font text-secondary'>Hire</span></span></p>
        </>
    );
};

export default Logo;