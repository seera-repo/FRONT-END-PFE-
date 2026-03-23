const Sidebar = () => {
  return (
    <div className="w-64 bg-white p-5 shadow">
      <h2 className="font-bold mb-6">LOGO</h2>

      <ul className="space-y-3">
        <li className="text-indigo-600 font-semibold">Dashboard</li>
        <li>Inbox</li>
        <li>Courses</li>
        <li>Task</li>
      </ul>
    </div>
  );
};

export default Sidebar;