import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { FiUsers, FiTrash2, FiEdit3 } from "react-icons/fi";
import AddUserModal from "../components/AddUserModal";
import EditUserModal from "../components/EditUserModal";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5001/api/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (Array.isArray(data)) setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle delete
  const handleDeleteUser = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5001/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (data.message === "User deleted") {
        fetchUsers();
      } else {
        alert("Delete failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting user.");
    }
  };

  // Open edit modal
  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

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
                <th className="p-4 flex justify-between items-center">
                  <span>Actions</span>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="text-white bg-orange-600 hover:bg-orange-500 px-3 py-1 rounded-md text-xs font-semibold"
                  >
                    + Add User
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2a2a2a]">
                  <td className="p-4 text-gray-800 dark:text-gray-100">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">
                    {user.email}
                  </td>
                  <td className="p-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      user.type === "admin"
                        ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200"
                    }`}>
                      {user.type}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 dark:text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 flex space-x-3">
                    <button
                      onClick={() => openEditModal(user)}
                      className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                    >
                      <FiEdit3 className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="text-red-600 dark:text-red-400 hover:underline flex items-center"
                    >
                      <FiTrash2 className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modals */}
        <AddUserModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onUserAdded={fetchUsers}
        />

        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={selectedUser}
          onUserUpdated={fetchUsers}
        />
      </div>
    </AdminLayout>
  );
}
