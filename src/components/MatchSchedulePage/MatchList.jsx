import React from "react";
import MatchItem from "./MatchItem";

const MatchList = ({ matches }) => {
  if (matches.length === 0) return null;

  return (
    <div className="match-list">
      {matches.map((match) => (
        <MatchItem key={match.id} match={match} />
      ))}
    </div>
  );
};

export default MatchList;
