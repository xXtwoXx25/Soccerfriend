import React from "react";

const MatchItem = ({ match }) => {
  return (
    <div className="match-item">
      <h3>{match.title}</h3>
      <p>{match.date} at {match.location}</p>
      {/* Optional buttons: Edit, Delete */}
    </div>
  );
};

export default MatchItem;
