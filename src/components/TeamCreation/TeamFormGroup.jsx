import React from "react";

const TeamFormGroup = ({ label, id, required = false, isTextarea = false }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
      {isTextarea ? (
        <textarea
          id={id}
          name={id}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm transition-colors focus:outline-none focus:border-emerald-700 focus:ring-2 focus:ring-blue-100 resize-vertical min-h-[120px]"
          rows={3}
          placeholder={`ใส่${label.toLowerCase()}`}
        />
      ) : (
        <input
          id={id}
          name={id}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm transition-colors focus:outline-none focus:border-emerald-700 focus:ring-2 focus:ring-blue-100"
          placeholder={`ใส่${label.toLowerCase()}`}
          required={required}
        />
      )}
    </div>
  );
};

export default TeamFormGroup;
