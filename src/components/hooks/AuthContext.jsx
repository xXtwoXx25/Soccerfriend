import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // โหลดโปรไฟล์เมื่อ token เปลี่ยน
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setUserData(null);
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/api/profile/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setUserData(data.profile);
        } else {
          console.warn("❌ โหลดโปรไฟล์ไม่สำเร็จ:", data.error);
          setUserData(null);
        }
      } catch (err) {
        console.error("⚠️ Error fetching user info:", err.message);
        setUserData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  return (
    <AuthContext.Provider value={{ userData, token, setUserData, setToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
