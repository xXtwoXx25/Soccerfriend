import React, { useState } from "react";
import "../styles/TeamCreationPage.css";

const TeamCreationPage = () => {
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState(null);
  const [uploadTime, setUploadTime] = useState(null);

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
    formData.append("teamDetail", form.teamDetail.value); // ✅ รายละเอียดทั่วไป
    formData.append("playDate", form.playDate.value);     // ✅ วันที่เล่น
    formData.append("playTime", form.playTime.value);     // ✅ เวลาเล่น
    formData.append("skillLevel", form.skillLevel.value); // ✅ ระดับทักษะ
    formData.append("homeStadium", form.homeStadium.value);

    if (form.teamLogo.files.length > 0) {
      formData.append("teamLogo", form.teamLogo.files[0]);
    }

    try {
      const response = await fetch("http://localhost:8080/teams", {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");

      const raw = await response.text();

      if (!isJson) {
        throw new Error("เซิร์ฟเวอร์ไม่ได้ส่ง JSON กลับมา:\n" + raw);
      }

      const result = JSON.parse(raw);

      if (response.ok) {
        alert("✅ สร้างทีมสำเร็จ!");

        if (result.team?.logoUrl) {
          setUploadedLogoUrl("http://localhost:8080" + result.team.logoUrl);
          setUploadTime(new Date());
        }

        form.reset();
        setUploadedLogoUrl(null);
        setUploadTime(null);
      } else {
        alert("❌ สร้างทีมไม่สำเร็จ: " + result.error || "ไม่ทราบสาเหตุ");
      }
    } catch (err) {
      alert("⚠️ เกิดข้อผิดพลาด: " + err.message);
    }
  };

  return (
    <div className="tc-container">
      <h1 className="tc-title">สร้างทีมใหม่</h1>

      <div className="tc-form-container">
        <form onSubmit={handleSubmit} className="tc-form">
          <div className="tc-form-group">
            <label htmlFor="teamName" className="tc-label">ชื่อทีม</label>
            <input
              id="teamName"
              name="teamName"
              className="tc-input"
              placeholder="ใส่ชื่อทีมของคุณ"
              required
            />
          </div>

<div className="tc-form-group">
  <label htmlFor="teamDetail" className="tc-label">รายละเอียดทีม</label>
  <textarea
    id="teamDetail"
    name="teamDetail"
    className="tc-textarea"
    placeholder="ตัวอย่าง: ทีมเล่นสไตล์ชิล ๆ เน้นสนุก นัดล่วงหน้า 1 สัปดาห์ เปิดรับผู้เล่นใหม่"
    rows={3}
  />
</div>

<div className="tc-form-group">
  <label htmlFor="playDate" className="tc-label">วันที่ต้องการลงแข่ง</label>
  <input
    type="text"
    id="playDate"
    name="playDate"
    className="tc-input"
    placeholder="เช่น เสาร์-อาทิตย์ หรือ 5 มิ.ย. 2025"
  />
</div>

<div className="tc-form-group">
  <label htmlFor="playTime" className="tc-label">เวลาที่ต้องการเล่น</label>
  <input
    type="text"
    id="playTime"
    name="playTime"
    className="tc-input"
    placeholder="เช่น 17:00 - 19:00"
  />
</div>

<div className="tc-form-group">
  <label htmlFor="skillLevel" className="tc-label">ระดับทักษะที่ต้องการของผู้เล่น</label>
  <select
    id="skillLevel"
    name="skillLevel"
    className="tc-input"
  >
    <option value="beginner">มือใหม่</option>
    <option value="intermediate">ปานกลาง</option>
    <option value="advanced">เล่นประจำ</option>
  </select>
</div>


          <div className="tc-form-group">
            <label htmlFor="teamLogo" className="tc-label">โลโก้ทีม (ไม่จำเป็น)</label>
            <div className="tc-logo-upload">
              <div className="tc-logo-preview">
                {uploadedLogoUrl ? (
                  <img
                    src={uploadedLogoUrl}
                    alt="โลโก้ทีม"
                    className="tc-logo-image"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <span className="tc-logo-placeholder">รูปโลโก้</span>
                )}
              </div>
              <div className="tc-logo-input-container">
                <input
                  id="teamLogo"
                  name="teamLogo"
                  type="file"
                  accept="image/*"
                  className="tc-file-input"
                  onChange={handleFileChange}
                />
                <p className="tc-file-description">
                  แนะนำขนาด 512x512 พิกเซล (PNG, JPG)
                </p>
              </div>
            </div>

            {/* แสดงเวลาพร้อมรูปหลังเลือก */}
            {uploadedLogoUrl && uploadTime && (
              <div style={{ marginTop: "10px", color: "#444" }}>
                <p>
                  เวลาเลือกรูป:{" "}
                  {uploadTime.toLocaleString("th-TH", {
                    dateStyle: "long",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            )}
          </div>

          <div className="tc-form-group">
            <label htmlFor="homeStadium" className="tc-label">สนามเหย้า (ไม่จำเป็น)</label>
            <input
              id="homeStadium"
              name="homeStadium"
              className="tc-input"
              placeholder="สนามที่ทีมของคุณใช้เล่นเป็นหลัก"
            />
          </div>

          <div className="tc-form-submit">
            <button type="submit" className="tc-button">
              สร้างทีม
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamCreationPage;
