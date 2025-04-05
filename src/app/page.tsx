"use client";

import { useState, useEffect } from "react";
import { sdk } from "@farcaster/frame-sdk";

export default function FrameUserInfo() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/frame", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ test: true }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
        await sdk.actions.ready();
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>User Info from Frame</h1>
      {userData ? (
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}
