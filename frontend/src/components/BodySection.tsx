// BodySection.tsx
import React from 'react';

const BodySection: React.FC = () => {
  return (
    <div className="body-section">
      <div className="content-container bg-[url('https://www.nicehash.com/assets/home-bg-DANkYkPf.jpg')] bg-cover bg-center">
        <div className="content-inner h-[600px] w-full flex justify-center items-center flex-col">
          <div className="flex flex-row items-center px-3   py-2 shadow-lg">
           <div className='flex flex-row justify-center items-center '>
           <img
              className="logo h-16 w-16 md:h-24 md:w-24 "
              src="../../logo.png"
              alt="QDRA"
            />
            <h2 className="brand-name mx-[-10px] text-3xl md:text-5xl text-[#fff] font-semibold">QDRA</h2>
           </div>
          </div>
          <h1 className="headline py-6 h-36 md:h-56 font-bold w-[350px] md:w-[500px] text-white text-[35px] md:text-[48px] tracking-wider leading-[35px] md:leading-[55px] text-center md:text-left">
           <span className='text-[#FFBF00]'> Explore The</span>  Essentials Of The Crypto Mining Universe
          </h1>
          <h3 className=" subheadline text-white py-10 font-thin text-[20px] md:text-[24px] w-[300px] md:w-[700px] leading-6 text-center md:text-left">
            Start the Mobile Mining With QUDRA COMMUNITY ($QDRA)
          </h3>
        </div>
      </div>
    </div>
  );
};

export default BodySection;
