import React, { useEffect } from 'react';

const Footer: React.FC = () => {
  useEffect(() => {
    const canvas = document.getElementById('picassoCanvas') as HTMLCanvasElement;
    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext('2d');

      if (ctx) {
        canvas.width = 200;
        canvas.height = 200;

        ctx.fillStyle = "#FFD700";
        ctx.beginPath();
        ctx.moveTo(100, 0);
        ctx.lineTo(200, 100);
        ctx.lineTo(100, 200);
        ctx.lineTo(0, 100);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#AFEEEE";
        ctx.beginPath();
        ctx.arc(100, 100, 50, 0, Math.PI * 2, true);
        ctx.fill();

        ctx.moveTo(0, 0);
        ctx.lineTo(200, 200);
        ctx.moveTo(200, 0);
        ctx.lineTo(0, 200);
        ctx.strokeStyle = "#FFFFFF";
        ctx.stroke();
      }
    }
  }, []);

  return (
    <footer className="bg-[#2D2727] w-full mt-auto">
      <div className="container px-4 py-8  md:px-0 grid gap-4 text-center md:grid-cols-3 text-white">
        <div className="grid gap-5 ">
          <ul className="flex flex-row justify-center gap-4 text-lg md:text-base">
            <li>
              <a href="/home" className="hover:underline">Home</a>
            </li>
            <li>
              <a href="work.html" className="hover:underline">About Us</a>
            </li>
            <li>
              <a href="contact.html" className="hover:underline">Contact Us</a>
            </li>
          </ul>

          <div className="flex items-start justify-center gap-6">
            <a href="https://t.me/qudracommunity" target="_blank" rel="noopener noreferrer" className="text-3xl md:text-2xl shadow-lg hover:text-gray-300">
              <i className="ri-telegram-fill"></i>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61561154702697&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="text-3xl md:text-2xl shadow-lg hover:text-gray-300">
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a href="https://www.instagram.com/qudracommunity?igsh=dGRtZTJibDBzczg=/" target="_blank" rel="noopener noreferrer" className="text-3xl md:text-2xl shadow-lg hover:text-gray-300">
              <i className="ri-instagram-fill"></i>
            </a>
            <a href="https://x.com/qudracommunity" target="_blank" rel="noopener noreferrer" className="text-3xl md:text-2xl shadow-lg hover:text-gray-300">
              <i className="ri-twitter-x-line"></i>
            </a>
            <a href="https://youtube.com/@qudracommunity?si=ERGWqPKRKmPY_pm2" target="_blank" rel="noopener noreferrer" className="text-3xl md:text-2xl shadow-lg hover:text-gray-300">
              <i className="ri-youtube-fill"></i>
            </a>
          </div>
          <span className="flex py-4 leading-3  align-bottom flex-end text-md md:text-base font-medium">
          &#169; QUDRA COMMUNITY 2024. All rights reserved
        </span>
        </div>
       
      </div>
    </footer>
  );
};

export default Footer;
