import React from 'react';
import Image from "../../../assets/coming_soon.gif";
import { Link } from 'react-router-dom';

const comingSoon = () => {
  return (
    <>
      <div className='h-screen flex flex-col justify-center items-center'>
          <img src={Image} className='w-2/4' alt='coming soon'/>
          <h3 className='text-5xl'><em>Coming Soon</em></h3>
          <Link to="/" className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 mt-5 py-2 px-8 font-bold rounded-lg'>Go To Home</Link>
      </div>
    </>
  );
};

export default comingSoon;