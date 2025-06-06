import React from "react";

const LogoUploader = ({ uploadedLogoUrl, uploadTime, onFileChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="teamLogo" className="text-sm font-medium text-gray-700">โลโก้ทีม (ไม่จำเป็น)</label>
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
          {uploadedLogoUrl ? (
            <img
              src={uploadedLogoUrl}
              alt="โลโก้ทีม"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <span className="text-sm text-gray-500">รูปโลโก้</span>
          )}
        </div>
        <div className="flex-1">
          <input
            id="teamLogo"
            name="teamLogo"
            type="file"
            accept="image/*"
            className="w-full mb-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={onFileChange}
          />
          <p className="text-xs text-gray-500">แนะนำขนาด 512x512 พิกเซล (PNG, JPG)</p>
        </div>
      </div>
      {uploadedLogoUrl && uploadTime && (
        <div className="mt-2 text-sm text-gray-600">
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
  );
};

export default LogoUploader;
