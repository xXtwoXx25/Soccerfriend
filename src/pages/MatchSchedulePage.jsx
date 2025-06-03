import React, { useEffect, useState } from "react";
import MatchList from "../components/MatchSchedulePage/MatchList";
import NoMatchesMessage from "../components/MatchSchedulePage/NoMatchesMessage";

const MatchSchedulePage = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/matches/mine", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMatches(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch matches:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="match-schedule-page">
      <h1>ตารางแมตช์ของฉัน</h1>
      {loading ? (
        <p>Loading...</p>
      ) : matches.length > 0 ? (
        <MatchList matches={matches} />
      ) : (
        <NoMatchesMessage />
      )}
    </div>
  );
};

export default MatchSchedulePage;
