
import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
    return (
        <>
            <section className="calltoaction_home py-12 px-2 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-5 text-center lg:text-left">
                <div className='callaction_left col-span-none lg:col-span-2'>
                    <p className='font-Roboto text-lg lg:text-xl mb-0'>Call for any information regarding the course</p>
                    <span>8am to 11pm</span>
                </div>
                <div className='flex justify-center lg:justify-end'>
                    <Link to="/coming_soon" className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 py-5 px-8 font-bold rounded-lg'>Call To Action</Link>
                </div>
            </section>
        </>
    );
};

export default CallToAction;