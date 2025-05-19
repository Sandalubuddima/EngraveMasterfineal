import React, { useEffect, useState } from "react";

export default function AdminEngravingSettings() {
  const [materialType, setMaterialType] = useState("");
  const [woodTypes, setWoodTypes] = useState([]);
  const [selectedWoodType, setSelectedWoodType] = useState("");
  const [newWoodType, setNewWoodType] = useState("");
  const [power, setPower] = useState("");
  const [speed, setSpeed] = useState("");
  const [message, setMessage] = useState("");

  const [settings, setSettings] = useState([]);
  const [editingSetting, setEditingSetting] = useState(null);
  const [updatedPower, setUpdatedPower] = useState("");
  const [updatedSpeed, setUpdatedSpeed] = useState("");

  const materialOptions = [
    "Wood", "Acrylic", "Black Slate", "Cork", "Glass", "Leather",
    "White Tile Painted Black", "White Tile", "Anodized Aluminum", "Stainless Steel"
  ];

  // Fetch wood types & settings
  useEffect(() => {
    fetch("http://localhost:5001/api/wood-types")
      .then(res => res.json())
      .then(data => setWoodTypes(data))
      .catch(err => console.error("Error loading wood types", err));

    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const res = await fetch("http://localhost:5001/api/engraving-settings");
    const data = await res.json();
    setSettings(data);
  };

  const handleAddWoodType = async () => {
    if (!newWoodType) return;
    try {
      const res = await fetch("http://localhost:5001/api/wood-types", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newWoodType })
      });
      const data = await res.json();
      if (res.ok) {
        setWoodTypes(prev => [...prev, data]);
        setNewWoodType("");
        setMessage("New wood type added!");
      } else {
        setMessage(data.message || "Failed to add wood type.");
      }
    } catch (err) {
      setMessage("Error adding wood type.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!materialType || !power || !speed) {
      setMessage("Please fill all required fields.");
      return;
    }

    const payload = {
      materialType,
      suggestedPower: power,
      suggestedSpeed: speed,
      woodType: materialType === "Wood" ? selectedWoodType : null
    };

    try {
      const response = await fetch("http://localhost:5001/api/engraving-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Engraving settings saved successfully!");
        setPower(""); setSpeed(""); setSelectedWoodType(""); setMaterialType("");
        fetchSettings(); // refresh table
      } else {
        setMessage(result.message || "Failed to save settings.");
      }
    } catch (err) {
      setMessage("Error saving settings.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this setting?")) return;
    try {
      await fetch(`http://localhost:5001/api/engraving-settings/${id}`, { method: "DELETE" });
      setMessage("Setting deleted.");
      fetchSettings();
    } catch (err) {
      setMessage("Error deleting setting.");
    }
  };

  const startEdit = (s) => {
    setEditingSetting(s);
    setUpdatedPower(s.suggestedPower);
    setUpdatedSpeed(s.suggestedSpeed);
  };

  const saveEdit = async () => {
    try {
      const res = await fetch(`http://localhost:5001/api/engraving-settings/${editingSetting._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          suggestedPower: updatedPower,
          suggestedSpeed: updatedSpeed
        })
      });

      if (res.ok) {
        setMessage("Setting updated.");
        setEditingSetting(null);
        fetchSettings();
      } else {
        setMessage("Failed to update.");
      }
    } catch (err) {
      setMessage("Error updating.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="bg-white shadow-md p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4 text-center">Add Engraving Settings</h2>

        {/* Material selection */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Material Type</label>
          <select
            value={materialType}
            onChange={(e) => setMaterialType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select material</option>
            {materialOptions.map((material, i) => (
              <option key={i} value={material}>{material}</option>
            ))}
          </select>
        </div>

        {/* Wood options */}
        {materialType === "Wood" && (
          <>
            <div className="mb-4">
              <label className="block font-medium mb-1">Add New Wood Type</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newWoodType}
                  onChange={(e) => setNewWoodType(e.target.value)}
                  placeholder="e.g., Mango"
                  className="flex-1 p-2 border rounded"
                />
                <button
                  onClick={handleAddWoodType}
                  type="button"
                  className="bg-green-600 text-white px-3 rounded hover:bg-green-700"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Select Wood Type</label>
              <select
                value={selectedWoodType}
                onChange={(e) => setSelectedWoodType(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Choose wood</option>
                {woodTypes.map((wood, i) => (
                  <option key={i} value={wood.name}>{wood.name}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* Power and Speed */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Suggested Power (%)</label>
            <input
              type="number"
              value={power}
              onChange={(e) => setPower(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="e.g., 85"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Suggested Speed (mm/s)</label>
            <input
              type="number"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="e.g., 600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Save Settings
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
      </div>

      {/* Display Table */}
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4">All Engraving Settings</h3>
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Material</th>
              <th className="border px-2 py-1">Wood</th>
              <th className="border px-2 py-1">Power (%)</th>
              <th className="border px-2 py-1">Speed (mm/s)</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {settings.map((s) => (
              <tr key={s._id}>
                <td className="border px-2 py-1">{s.materialType}</td>
                <td className="border px-2 py-1">{s.woodType || "-"}</td>
                <td className="border px-2 py-1">{s.suggestedPower}</td>
                <td className="border px-2 py-1">{s.suggestedSpeed}</td>
                <td className="border px-2 py-1 space-x-2">
                  <button
                    onClick={() => startEdit(s)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingSetting && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h4 className="text-lg font-bold mb-3">Edit Setting</h4>
            <p><strong>Material:</strong> {editingSetting.materialType}</p>
            {editingSetting.woodType && <p><strong>Wood:</strong> {editingSetting.woodType}</p>}

            <div className="my-4">
              <label className="block mb-1">Power (%)</label>
              <input
                type="number"
                value={updatedPower}
                onChange={(e) => setUpdatedPower(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <label className="block mt-4 mb-1">Speed (mm/s)</label>
              <input
                type="number"
                value={updatedSpeed}
                onChange={(e) => setUpdatedSpeed(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setEditingSetting(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
