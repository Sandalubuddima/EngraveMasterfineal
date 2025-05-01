// test-server.js
// A minimal server for testing the AskAI component

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Enable CORS for React app
app.use(cors());
app.use(express.json());

// Mock Gemini API endpoint
app.post('/api/gemini', (req, res) => {
  const { question } = req.body;
  
  // Simulate processing time
  setTimeout(() => {
    // Return a mock response based on the question
    const response = generateMockResponse(question);
    res.json({ answer: response });
  }, 1000);
});

// Generate mock responses
function generateMockResponse(question) {
  const lowercaseQuery = question.toLowerCase();
  
  if (lowercaseQuery.includes("material")) {
    return "For laser engraving, material selection is crucial. Wood, acrylic, and anodized aluminum work well for beginners. Each material requires different power and speed settings. For wood, start with 50% power and 300mm/min speed. Always test on scrap material first.";
  } else if (lowercaseQuery.includes("safety")) {
    return "Safety is paramount in laser engraving. Always ensure proper ventilation, wear appropriate eye protection, never leave the machine unattended, and keep a fire extinguisher nearby. Many materials like PVC should never be engraved as they produce toxic chlorine gas when heated.";
  } else if (lowercaseQuery.includes("settings") || lowercaseQuery.includes("parameters")) {
    return "Optimal settings depend on your specific machine and material. For a 40W CO2 laser on 3mm plywood, try: 15-20% power, 300mm/min speed, and 2 passes. Always start with conservative settings and adjust gradually after test cuts.";
  } else {
    return "Thank you for your question about laser engraving. To provide the most helpful answer, could you share more details about your specific laser engraver model and the materials you're working with? This will help me give you more tailored advice.";
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
});

/*
To use this test server:
1. Save this file as test-server.js
2. Run: npm install express cors
3. Start server: node test-server.js
4. Your React app should now be able to connect to http://localhost:5000/api/gemini
*/