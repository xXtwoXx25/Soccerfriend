const TeamField = () => (
  <div className="flex-2 text-center">
    <p className="text-gray-700 mb-2">สนามฟุตบอล 7 คน</p>
    <div className="flex flex-wrap justify-center gap-2 mt-2">
      {[...Array(7)].map((_, index) => (
        <div 
          key={index} 
          className="w-8 h-8 bg-gray-200 border border-gray-400 rounded-full"
        />
      ))}
    </div>
  </div>
);

export default TeamField;
