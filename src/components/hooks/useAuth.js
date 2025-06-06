import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/api/profile/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const contentType = res.headers.get("content-type");
        const text = await res.text();

        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON:\n" + text);
        }

        const data = JSON.parse(text);
        if (res.ok) {
          setUserData(data.profile);
        } else {
          console.warn("❌ โหลดโปรไฟล์ไม่สำเร็จ:", data.error);
        }
      } catch (err) {
        console.error("⚠️ Error fetching user info:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  return { userData, isLoading, token };
};