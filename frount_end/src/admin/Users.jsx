import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { FiUsers, FiTrash2, FiEdit3 } from "react-icons/fi";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  // Dummy data (replace with your API call)
  useEffect(() => {
    setUsers([
      {
        id: "1",
        name: "Sandalu Buddima",
        email: "sandalu@example.com",
        role: "Admin",
        joinedAt: "2024-11-10",
      },
      {
        id: "2",
        name: "Malki Perera",
        email: "malki@example.com",
        role: "User",
        joinedAt: "2024-12-05",
      },
    ]);
  }, []);

  return (
    <AdminLayout>
      <div>
        <h2 className="text-2xl font-bold text-[#563232] dark:text-white mb-6 flex items-center">
          <FiUsers className="mr-2" /> Manage Users
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-[#1C1C1C] border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
            <thead className="bg-gray-100 dark:bg-[#2a2a2a]">
              <tr className="text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Joined</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2a2a2a]">
                  <td className="p-4 text-gray-800 dark:text-gray-100">{user.name}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">{user.email}</td>
                  <td className="p-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      user.role === "Admin"
                        ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 dark:text-gray-400">{user.joinedAt}</td>
                  <td className="p-4 flex space-x-3">
                    <button className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                      <FiEdit3 className="mr-1" /> Edit
                    </button>
                    <button className="text-red-600 dark:text-red-400 hover:underline flex items-center">
                      <FiTrash2 className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
