// src/components/Referral.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Referral = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">{error}</div>
    );
  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        No user data available
      </div>
    );

  const referralLink = `${window.location.origin}/register?referrerId=${user._id}`;

  return (
    <div className="container max-h-screen p-4 max-w-lg bg-[url('https://img.freepik.com/free-vector/gradient-dynamic-purple-lines-background_23-2148995757.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1720483200&semt=ais_hybrid')] bg-cover bg-center">
      <div className="text-white shadow-lg rounded-lg p-6 bg-opacity-50 bg-black">
        <h1 className="text-2xl font-bold mb-4 text-[#F5E7B2]">
          Welcome, {user.username}
        </h1>
        <p className="text-lg font-extrabold text-[30px] mb-4 text-[#F5F7F8]">
          Refer a Friend:
        </p>
        <div className="mt-4">
          <label className="block text-white-700 text-sm font-bold mb-2">
            Referral Link:
          </label>
          <input
            type="text"
            value={referralLink}
            readOnly
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            onClick={handleCopy}
          />
          {copied && (
            <p className="mt-2 text-green-500">Link copied to clipboard!</p>
          )}
            <p className="border border-[#F5F7F8] text-blue-400 ">
         Click on Link to copy
            </p>
          <div className="mt-4 py-4 text-white text-lg">
            <h1 className="text-[24px] mb-2 text-[#F5F7F8]">What you earn?</h1>
            <p className="text-center text-[#F5F7F8] leading-5 font-normal text-[18px] mb-3">
              Guaranteed rewards on referring friends 
            </p>
          
            <ul className="list-decimal list-inside text-[16px] font-normal leading-6 space-y-1">
              <li className="text-[#F5F7F8]">Invite 2 Friends: Earn 20,000 QDRA coins</li>
              <li className="text-[#F5F7F8]">Invite 5 Friends: Earn 50,000 QDRA coins</li>
              <li className="text-[#F5F7F8]">Invite 10 Friends: Earn 100,000 QDRA coins</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referral;
