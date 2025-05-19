import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDatabase, ref, onValue, set } from "firebase/database";

export default function DeviceViewer() {
  const { deviceId } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [updatingLED, setUpdatingLED] = useState(false);

  useEffect(() => {
    const db = getDatabase();
    const deviceRef = ref(db, `devices/${deviceId}`);

    const unsubscribe = onValue(deviceRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
        setError("");
      } else {
        setError("Device not found.");
      }
    });

    return () => unsubscribe();
  }, [deviceId]);

  const toggleManualLED = async () => {
    const db = getDatabase();
    const ledRef = ref(db, `devices/${deviceId}/manual_led`);
    try {
      setUpdatingLED(true);
      await set(ledRef, !data.manual_led);
    } catch (err) {
      console.error("Error toggling LED:", err);
    } finally {
      setUpdatingLED(false);
    }
  };

  const timeAgo = (timestamp) => {
    if (!timestamp) return "";
    const now = new Date();
    const diff = Math.floor((now.getTime() - new Date(timestamp).getTime()) / 1000);
    if (diff < 60) return `${diff} second(s) ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minute(s) ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hour(s) ago`;
    return `${Math.floor(diff / 86400)} day(s) ago`;
  };

  const getStatusColor = (status) => {
    if (!status) return "gray";
    switch (status.toLowerCase()) {
      case "online":
      case "active":
      case "connected":
        return "green";
      case "warning":
      case "unstable":
        return "yellow";
      case "offline":
      case "disconnected":
      case "error":
      case "unsafe":
        return "red";
      default:
        return "gray";
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-500 max-w-md w-full">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mx-auto mb-4"></div>
          <p className="text-gray-700">Loading device data...</p>
        </div>
      </div>
    );
  }

  const statusColor = getStatusColor(data.sensors?.status);
  const lastUpdateRaw = data.status?.last_update;
  const lastUpdateFormatted = lastUpdateRaw
    ? new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
        hour12: true,
      }).format(new Date(lastUpdateRaw))
    : "--";
  const isLedOn = data.manual_led === true;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Device Dashboard
          </h1>
          <div className="bg-white shadow rounded-lg px-4 py-2 flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 bg-${statusColor}-500`}></div>
            <span className="font-medium text-gray-700">
              {data.sensors?.status || "Unknown"}
            </span>
          </div>
        </div>

        {/* Device Info */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 text-white">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h2 className="text-xl font-semibold">{deviceId}</h2>
            </div>
            <p className="text-sm">Device ID: {deviceId}</p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Temperature */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Temperature</h3>
                <div className="mt-2 flex items-end">
                  <span className="text-3xl font-semibold text-gray-800">
                    {data.sensors?.temperature ?? "--"}
                  </span>
                  <span className="ml-1 text-xl text-gray-600">°C</span>
                </div>
              </div>

              {/* Humidity */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-500">Humidity</h3>
                <div className="mt-2 flex items-end">
                  <span className="text-3xl font-semibold text-gray-800">
                    {data.sensors?.humidity ?? "--"}
                  </span>
                  <span className="ml-1 text-xl text-gray-600">%</span>
                </div>
              </div>
            </div>

            {/* Meta Info */}
            <div className="mt-6 space-y-4 border-t pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Last Update</span>
                <span className="text-gray-800 font-medium">
                  {lastUpdateFormatted}
                  <br />
                  <span className="text-xs text-gray-500">
                    ({timeAgo(lastUpdateRaw)})
                  </span>
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">IP Address</span>
                <span className="text-gray-800 font-mono">{data.status?.ip ?? "--"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Manual LED</span>
                <span className={`px-3 py-1 rounded-full ${isLedOn ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} font-medium`}>
                  {isLedOn ? 'ON' : 'OFF'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Device Controls</h3>
          <div className="flex flex-wrap gap-4">
            <button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              onClick={() => window.location.reload()}
            >
              Refresh Data
            </button>
            <button
              onClick={toggleManualLED}
              disabled={updatingLED}
              className={`flex-1 ${isLedOn ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white font-medium py-2 px-4 rounded-lg transition-colors`}
            >
              {updatingLED ? "Updating..." : isLedOn ? 'Turn LED OFF' : 'Turn LED ON'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
