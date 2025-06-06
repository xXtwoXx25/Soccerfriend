import React, { useState } from "react";
import TeamForm from "../components/TeamCreation/TeamForm";

const TeamCreationPage = () => {
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState(null);
  const [uploadTime, setUploadTime] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-emerald-700">สร้างทีมใหม่</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <TeamForm 
          uploadedLogoUrl={uploadedLogoUrl}
          setUploadedLogoUrl={setUploadedLogoUrl}
          uploadTime={uploadTime}
          setUploadTime={setUploadTime}
        />
      </div>
    </div>
  );
};

export default TeamCreationPage;
