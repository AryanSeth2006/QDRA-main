import React, { useState } from "react";
import axios from "axios";
import q_coin from "../images/q_coin.png";
import "./Mission.css";
import Sidebar from "./Sidebar";

const Mission: React.FC = () => {
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("token")
  );

  const handleFollow = async (
    platform: "twitter" | "facebook" | "instagram" | "youtube"
  ) => {
    if (!isAuthenticated) {
      alert("Please log in to follow and get rewarded.");
    } else {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:5000/api/updateCoins",
          {
            platform,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert(
          `You followed ${platform}! Coins rewarded: ${response.data.coins}`
        );
      } catch (error) {
        console.error("Error rewarding coins:", error);
        alert("Failed to reward coins.");
      }
    }
  };

  const handleMouseEnter = (color: string) => {
    setBackgroundColor(color);
  };

  const handleMouseLeave = () => {
    setBackgroundColor("");
  };

  return (
    <div className="container mx-auto flex flex-col items-center h-[700px] text-white bg-[#151515] py-8 pb-0 mb-0">
      <h2 className="text-5xl pb-10 mb-8 max-lg:text-3xl  text-center font-semibold">
        <span className="text-[#F4CE14]">Follow Us</span> and Get Rewarded!
      </h2>
      <div
        className="flex flex-col items-center w-full h-full relative"
        id="social-section"
        style={{ backgroundColor }}
      >
        <img
          className="absolute left-1/2 top-[-10%] transform -translate-x-1/2 w-40 h-auto"
          src={q_coin}
          alt="coin"
        />
        <div className="py-12 flex flex-col items-center justify-center w-full">
          <div className="flex flex-col items-center space-y-6">
            <a
              href="https://x.com/qudracommunity"
              className="twitter bg-[#0F67B1] rounded-lg shadow-lg w-64 text-center py-2"
              onMouseEnter={() => handleMouseEnter("color-twitter")}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleFollow("twitter")}
            >
              <i className="fa fa-twitter mr-2"></i>Telegram
              <span className="ml-4 font-bold text-[#F4CE14]">+5000 coins</span>
            </a>
            <a
              href="https://x.com/qudracommunity"
              className="twitter bg-[#3FA2F6] rounded-lg shadow-lg w-64 text-center py-2"
              onMouseEnter={() => handleMouseEnter("color-twitter")}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleFollow("twitter")}
            >
              <i className="fa fa-twitter mr-2"></i>Twitter
              <span className="ml-4 font-bold text-[#F4CE14]">+5000 coins</span>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61561154702697&mibextid=ZbWKwL"
              className="facebook bg-[#4A249D] rounded-lg shadow-lg w-64 text-center py-2"
              onMouseEnter={() => handleMouseEnter("color-facebook")}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleFollow("facebook")}
            >
              <i className="fa fa-facebook mr-2"></i>Facebook
              <span className="ml-4 font-bold text-[#F4CE14]">+5000 coins</span>
            </a>
            <a
              href="https://t.me/qudracommunity"
              className="youtube bg-[#C80036] rounded-lg shadow-lg w-64 text-center py-2"
              onMouseEnter={() => handleMouseEnter("color-pinterest")}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleFollow("youtube")}
            >
              <i className="fa fa-youtube mr-2"></i>Youtube
              <span className="ml-4 font-bold text-[#F4CE14]">+5000 coins</span>
            </a>
            <a
              href="https://www.instagram.com/qudracommunity?igsh=dGRtZTJibDBzczg="
              className="instagram bg-[#FF5BAE] rounded-lg shadow-lg w-64 text-center py-2"
              onMouseEnter={() => handleMouseEnter("color-instagram")}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleFollow("instagram")}
            >
              <i className="fa fa-instagram mr-2"></i>Instagram
              <span className="ml-4 font-bold text-[#F4CE14]">+5000 coins</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
