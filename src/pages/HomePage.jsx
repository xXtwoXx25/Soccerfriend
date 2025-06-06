import React, { useEffect, useState } from "react";
import HeroSection from "../components/Homepage/HeroSection";
import FeaturesSection from "../components/Homepage/FeatureSection";
import CTASection from "../components/Homepage/CTASection";

const HomePage = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    if (token) {
      fetch("http://localhost:8080/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.email) {
            setUserEmail(data.email);
          }
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }
  }, [token]);

  return (
    <div className="font-sans">
      <HeroSection userEmail={userEmail} token={token} />
      <FeaturesSection />
      <CTASection token={token} />
    </div>
  );
};

export default HomePage;
