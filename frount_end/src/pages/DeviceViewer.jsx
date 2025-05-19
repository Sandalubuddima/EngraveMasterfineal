import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue, set } from "firebase/database";
import { database } from "../firebase";
import Navbar from "../components/PageNavbar";
import Footer from "../components/Footer";

export default function DeviceViewer() {
  const { deviceId } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [updatingLED, setUpdatingLED] = useState(false);

  useEffect(() => {
    const deviceRef = ref(database, `devices/${deviceId}`);
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
    const ledRef = ref(database, `devices/${deviceId}/manual_led`);
    try {
      setUpdatingLED(true);
      await set(ledRef, !data.manual_led);
    } catch (err) {
      console.error("Error toggling LED:", err);
    } finally {
      setUpdatingLED(false);
    }
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

  const statusColor = getStatusColor(data?.sensors?.status);
  const lastUpdate = data?.status?.last_update
    ? new Date(data.status.last_update).toLocaleString()
    : "--";
  const isLedOn = data?.manual_led === true;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />

      <main className="flex-grow py-10 px-4">
        {error ? (
          <div className="min-h-full flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 border-l-4 border-red-500 max-w-md w-full">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-2 rounded-full mr-4">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Error</h2>
              </div>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        ) : !data ? (
          <div className="min-h-full flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
              <div className="flex justify-center mb-6">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
              <p className="text-gray-600 font-medium">Loading device data...</p>
            </div>
          </div>
        ) : (
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

            {/* Device Info Card */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-6 py-4">
                <div className="flex items-center text-white">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  <h2 className="text-xl font-semibold">{deviceId}</h2>
                </div>
                <p className="text-blue-100 mt-1 text-sm">Device ID: {deviceId}</p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Temperature */}
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="text-gray-500 text-sm font-medium">Temperature</h3>
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8m-4-4h8" />
                      </svg>
                    </div>
                    <div className="mt-3 flex items-end">
                      <span className="text-3xl font-semibold text-gray-800">{data.sensors?.temperature ?? "--"}</span>
                      <span className="ml-1 text-xl text-gray-600">°C</span>
                    </div>
                  </div>

                  {/* Humidity */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="text-gray-500 text-sm font-medium">Humidity</h3>
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div className="mt-3 flex items-end">
                      <span className="text-3xl font-semibold text-gray-800">{data.sensors?.humidity ?? "--"}</span>
                      <span className="ml-1 text-xl text-gray-600">%</span>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 space-y-4 border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Last Update</span>
                    <span className="text-gray-800 font-medium">{lastUpdate}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">IP Address</span>
                    <span className="text-gray-800 font-mono">{data.status?.ip ?? "--"}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Manual LED</span>
                    <div className={`px-3 py-1 rounded-full ${isLedOn ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} font-medium`}>
                      {isLedOn ? 'ON' : 'OFF'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Device Controls</h3>
              <div className="flex flex-wrap gap-4">
                <button
                  className="flex-1 bg-orange-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
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
        )}
      </main>

      <Footer />
    </div>
  );
}
