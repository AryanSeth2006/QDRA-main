import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthCallback = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [timer, setTimer] = useState(10);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const updateCoins = async (coins: number) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/updateCoins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coins, userId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Updated points:", data.updatedPoints);
    } catch (error) {
      console.error("Error updating coins:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("User object:", user);
      const userId = user.sub || user.userId || user.id;
      if (userId) {
        localStorage.setItem("userId", userId);

        const id = setInterval(() => {
          setTimer(prev => {
            if (prev === 1) {
              clearInterval(id);
              updateCoins(10); // Add coins when timer reaches zero
              return 10; // Reset the timer
            }
            return prev - 1;
          });
        }, 1000);
        setIntervalId(id);
      } else {
        console.error("User ID not found in user object");
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAuthenticated, user]);

  if (isLoading) {
    return <div className="text-center text-blue-500">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {isAuthenticated && user ? (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">User Info</h2>
          <p className="text-gray-700">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-gray-700">
            <strong>User ID:</strong> {user.sub || user.userId || user.id}
          </p>
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-black">Timer: {timer} seconds</h3>
          </div>
        </div>
      ) : (
        <div className="text-red-500">User not authenticated</div>
      )}
    </div>
  );
};

export default AuthCallback;
