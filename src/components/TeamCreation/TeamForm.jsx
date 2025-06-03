import React from "react";
import TeamFormGroup from "./TeamFormGroup";
import LogoUploader from "./LogoUploader";
import SubmitButton from "./SubmitButton";

const TeamForm = ({
  uploadedLogoUrl,
  setUploadedLogoUrl,
  uploadTime,
  setUploadTime,
}) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      setUploadedLogoUrl(tempUrl);
      setUploadTime(new Date());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData();

    formData.append("teamName", form.teamName.value);
    formData.append("teamDetail", form.teamDetail.value);
    formData.append("playDate", form.playDate.value);
    formData.append("playTime", form.playTime.value);
    formData.append("skillLevel", form.skillLevel.value);
    formData.append("homeStadium", form.homeStadium.value);

    if (form.teamLogo.files.length > 0) {
      formData.append("teamLogo", form.teamLogo.files[0]);
    }

    try {
      const res = await fetch("http://localhost:8080/teams", {
        method: "POST",
        body: formData,
      });

      const contentType = res.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");
      const raw = await res.text();

      if (!isJson) throw new Error("เซิร์ฟเวอร์ไม่ได้ส่ง JSON:\n" + raw);

      const result = JSON.parse(raw);

      if (res.ok) {
        alert("✅ สร้างทีมสำเร็จ!");
        if (result.team?.logoUrl) {
          setUploadedLogoUrl("http://localhost:8080" + result.team.logoUrl);
          setUploadTime(new Date());
        }
        form.reset();
        setUploadedLogoUrl(null);
        setUploadTime(null);
      } else {
        alert("❌ สร้างทีมไม่สำเร็จ: " + (result.error || "ไม่ทราบสาเหตุ"));
      }
    } catch (err) {
      alert("⚠️ เกิดข้อผิดพลาด: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <TeamFormGroup label="ชื่อทีม" id="teamName" required />
      <TeamFormGroup label="รายละเอียดทีม" id="teamDetail" isTextarea />

      <TeamFormGroup label="วันที่ต้องการลงแข่ง" id="playDate" />
      <TeamFormGroup label="เวลาที่ต้องการเล่น" id="playTime" />

      <div className="flex flex-col gap-2">
        <label htmlFor="skillLevel" className="text-sm font-medium text-gray-700">ระดับทักษะที่ต้องการของผู้เล่น</label>
        <select 
          id="skillLevel" 
          name="skillLevel" 
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm transition-colors focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        >
          <option value="beginner">มือใหม่</option>
          <option value="intermediate">ปานกลาง</option>
          <option value="advanced">เล่นประจำ</option>
        </select>
      </div>

      <LogoUploader
        uploadedLogoUrl={uploadedLogoUrl}
        uploadTime={uploadTime}
        onFileChange={handleFileChange}
      />

      <TeamFormGroup label="สนามเหย้า (ไม่จำเป็น)" id="homeStadium" />

      <SubmitButton />
    </form>
  );
};

export default TeamForm;
