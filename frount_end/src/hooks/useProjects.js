import { useState, useEffect } from "react";

export default function useProjects() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [renameInfo, setRenameInfo] = useState({ current: "", newName: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [viewMode, setViewMode] = useState("grid");
  const [toast, setToast] = useState({ message: "", type: "", visible: false });

  const token = localStorage.getItem("token");

  // Fetch images
  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch("http://localhost:5001/api/photopea/list", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setImages(data.images || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading images:", err);
        setLoading(false);
        showToast("Error loading images", "error");
      });
  }, [token]);

  // Toast helper
  const showToast = (message, type = "success") => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ message: "", type: "", visible: false }), 3000);
  };

  // Delete
  const handleDelete = async (url) => {
    const filename = url.split("/").pop();
    if (!confirm(`Are you sure you want to delete ${filename}?`)) return;

    try {
      const res = await fetch(`http://localhost:5001/api/photopea/delete/${filename}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      if (res.ok) {
        setImages((prev) => prev.filter((img) => img !== url));
        showToast("Project deleted successfully!");
      } else {
        showToast(result.message || "Failed to delete project", "error");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      showToast("Error deleting project", "error");
    }
  };

  // Rename
  const handleRename = async () => {
    const { current, newName } = renameInfo;
    if (!newName.trim()) {
      showToast("Please enter a valid name", "error");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/photopea/rename", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldName: current, newName }),
      });

      const data = await res.json();
      if (res.ok) {
        showToast("Project renamed successfully!");
        setImages((prev) =>
          prev.map((img) =>
            img.includes(current) ? img.replace(current, newName) : img
          )
        );
        setRenameInfo({ current: "", newName: "" });
      } else {
        showToast(data.message, "error");
      }
    } catch (err) {
      showToast("Rename failed", "error");
    }
  };

  // Filter + Sort
  const filteredProjects = images.filter((url) => {
    const filename = url.split("/").pop().toLowerCase();
    return filename.includes(searchTerm.toLowerCase());
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const filenameA = a.split("/").pop();
    const filenameB = b.split("/").pop();

    if (sortBy === "name") {
      return sortOrder === "asc"
        ? filenameA.localeCompare(filenameB)
        : filenameB.localeCompare(filenameA);
    }

    return sortOrder === "asc" ? a.localeCompare(b) : b.localeCompare(a);
  });

  return {
    images: sortedProjects,
    loading,
    previewUrl,
    renameInfo,
    searchTerm,
    sortBy,
    sortOrder,
    viewMode,
    toast,
    setPreviewUrl,
    setRenameInfo,
    setSearchTerm,
    setSortBy,
    setSortOrder,
    setViewMode,
    handleDelete,
    handleRename,
  };
}
