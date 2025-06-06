import React from "react";

const SelectedPositionInfo = ({ position }) => (
  <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-5 rounded-2xl text-center mb-5 shadow-lg">
    <h3 className="m-0 mb-2 text-2xl font-bold">
      ตำแหน่งที่เลือก: {position.name} ({position.label})
    </h3>
  </div>
);

export default SelectedPositionInfo;
