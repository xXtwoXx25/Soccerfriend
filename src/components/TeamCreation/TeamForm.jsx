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
    const requiredPlayersValue = form.requiredPlayers.value;

    if (!requiredPlayersValue || parseInt(requiredPlayersValue) <= 0) {
      alert("⚠️ กรุณากรอกจำนวนผู้เล่นที่ต้องการเป็นตัวเลขมากกว่า 0");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.teamName.value);
    formData.append("description", form.teamDetail.value);
    formData.append("day", form.playDate.value);
    formData.append("timeRange", form.playTime.value);
    formData.append("skillLevel", form.skillLevel.value);
    formData.append("location", form.homeStadium.value);
    formData.append("requiredPlayers", String(requiredPlayersValue)); // ✅ ป้องกันส่งค่าไม่ถูก

    if (form.teamLogo && form.teamLogo.files.length > 0) {
      formData.append("logo", form.teamLogo.files[0]);
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/match/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        mode: "cors",
      });

      const contentType = res.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");
      const raw = await res.text();

      if (!isJson) throw new Error("เซิร์ฟเวอร์ไม่ได้ส่ง JSON:\n" + raw);

      const result = JSON.parse(raw);

      if (res.ok) {
        alert("✅ สร้างแมตช์สำเร็จ!");
        if (result.logoUrl) {
          setUploadedLogoUrl("http://localhost:8080" + result.logoUrl);
          setUploadTime(new Date());
        }
        form.reset();
        setUploadedLogoUrl(null);
        setUploadTime(null);
      } else {
        alert("❌ สร้างแมตช์ไม่สำเร็จ: " + (result.error || "ไม่ทราบสาเหตุ"));
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
        <label htmlFor="skillLevel" className="text-sm font-medium text-gray">
          ระดับทักษะที่ต้องการของผู้เล่น
        </label>
        <select
          id="skillLevel"
          name="skillLevel"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm transition-colors focus:outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700"
        >
          <option value="beginner">มือใหม่</option>
          <option value="intermediate">ปานกลาง</option>
          <option value="advanced">เล่นประจำ</option>
        </select>
      </div>

      <TeamFormGroup
        label="จำนวนผู้เล่นที่ต้องการ"
        id="requiredPlayers"
        type="number"
        required
      />

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
