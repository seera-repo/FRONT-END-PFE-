const CourseCard = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold">Web Development</h3>
      <p className="text-sm text-gray-500">Manel</p>

      <div className="w-full bg-gray-200 h-2 rounded mt-2">
        <div className="bg-indigo-500 h-2 rounded w-2/3"></div>
      </div>
    </div>
  );
};

export default CourseCard;