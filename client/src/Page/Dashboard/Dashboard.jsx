import React from "react";
import {
  FaUserGraduate,
  FaUniversity,
  FaClipboardList,
  FaUsers,
} from "react-icons/fa";
import UseAuth from "../../Hook/useAuth";

const Dashboard = () => {
  const { user } = UseAuth();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#012131] mb-4 md:mb-0">
            Welcome, {user?.displayName || user?.email}
          </h1>
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out flex flex-col items-center">
            <FaUserGraduate className="text-4xl text-[#F39C12] mb-2" />
            <p className="text-gray-500">Total Students</p>
            <h2 className="text-2xl font-bold">1200</h2>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out flex flex-col items-center">
            <FaUniversity className="text-4xl text-[#F39C12] mb-2" />
            <p className="text-gray-500">Total Universities</p>
            <h2 className="text-2xl font-bold">35</h2>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out flex flex-col items-center">
            <FaClipboardList className="text-4xl text-[#F39C12] mb-2" />
            <p className="text-gray-500">Total Scholarships</p>
            <h2 className="text-2xl font-bold">150</h2>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out flex flex-col items-center">
            <FaUsers className="text-4xl text-[#F39C12] mb-2" />
            <p className="text-gray-500">Active Users</p>
            <h2 className="text-2xl font-bold">900</h2>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
          <h2 className="text-2xl font-bold text-[#012131] mb-4">
            Recent Activities
          </h2>
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#012131] text-white">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Action</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 transition-colors">
                <td className="px-4 py-2">1</td>
                <td className="px-4 py-2">John Doe</td>
                <td className="px-4 py-2">Applied Scholarship</td>
                <td className="px-4 py-2">2026-03-13</td>
              </tr>
              <tr className="hover:bg-gray-100 transition-colors">
                <td className="px-4 py-2">2</td>
                <td className="px-4 py-2">Jane Smith</td>
                <td className="px-4 py-2">Added Scholarship</td>
                <td className="px-4 py-2">2026-03-12</td>
              </tr>
              <tr className="hover:bg-gray-100 transition-colors">
                <td className="px-4 py-2">3</td>
                <td className="px-4 py-2">Asadul Sameer</td>
                <td className="px-4 py-2">Updated Profile</td>
                <td className="px-4 py-2">2026-03-11</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
