import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { FiFileText, FiTrash2 } from "react-icons/fi";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5001/api/contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (Array.isArray(data)) setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this message?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5001/api/contacts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.message === "Contact deleted") {
        fetchMessages();
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting message.");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <AdminLayout>
      <div>
        <h2 className="text-2xl font-bold text-[#563232] dark:text-white mb-6 flex items-center">
          <FiFileText className="mr-2" /> User Messages
        </h2>

        {/* Scrollable table container */}
        <div className="w-full overflow-auto max-h-[70vh]">
          <table className="table-fixed min-w-full bg-white dark:bg-[#1C1C1C] border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
            <thead className="bg-gray-100 dark:bg-[#2a2a2a]">
              <tr className="text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                <th className="p-4 w-1/6">Name</th>
                <th className="p-4 w-1/6">Email</th>
                <th className="p-4 w-1/6">Phone</th>
                <th className="p-4 w-2/6">Message</th>
                <th className="p-4 w-1/6">Date</th>
                <th className="p-4 w-1/12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr
                  key={msg.id || msg._id}
                  className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2a2a2a]"
                >
                  <td className="p-4 text-gray-800 dark:text-gray-100 break-words">{msg.name}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-300 break-words">{msg.email}</td>
                  <td className="p-4 text-gray-500 dark:text-gray-400 break-words">{msg.phone}</td>
                  <td className="p-4 text-gray-700 dark:text-gray-200 break-words max-w-xs">
                    {msg.message}
                  </td>
                  <td className="p-4 text-gray-500 dark:text-gray-400">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(msg._id)}
                      className="text-red-600 dark:text-red-400 hover:underline flex items-center"
                    >
                      <FiTrash2 className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {messages.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-400">
                    No messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
