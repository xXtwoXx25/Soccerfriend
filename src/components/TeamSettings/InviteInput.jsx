const InviteInput = ({ value, onChange }) => (
  <div>
    <input
      type="text"
      placeholder="กรอกอีเมล"
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm transition-colors focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
    />
  </div>
);

export default InviteInput;
