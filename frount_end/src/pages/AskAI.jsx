import { useState, useEffect, useRef } from "react";
import Navbar from "../components/PageNavbar";
import Footer from "../components/Footer";
import { GoogleGenAI } from "@google/genai";

export default function AskAI() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your EngraveMaster assistant. Ask me anything about laser engraving settings, materials, or techniques."
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setCharCount(query.length);
  }, [query]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const engraveMasterPrompt = (query) => `
You are an intelligent assistant built into the EngraveMaster software, designed to help users optimize laser engraving settings based on wood type and project requirements.
Respond to the following user query with clear, expert guidance:
"${query}"
Please format your response as follows:
**1. Summary Answer:**  
- Give a brief, clear summary of the best approach
**2. Recommended Laser Settings:**  
- *Power (% or Watts)*  
- *Speed (mm/s)*  
- *Interval / DPI*  
- *Number of Passes*  
- *Focus & Z-offset advice*
**3. Wood-Specific Considerations:**  
- Mention grain type, density, or surface coatings that affect results
**4. Image & Design Tips (if applicable):**  
- Suggest image resolution, contrast, and vector vs raster choices
**5. Practical Recommendations:**  
- Include safety tips, cleaning advice, and efficiency tricks
Use bullet points where needed, and make it easy to scan. Be specific and avoid vague suggestions.
`;

  const handleAsk = async () => {
    if (!query.trim()) return;
    
    // Add user message to the chat
    const userMessage = { role: "user", content: query };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input and set loading
    setQuery("");
    setLoading(true);
    
    try {
      const ai = new GoogleGenAI({
        apiKey: "AIzaSyDU5MLXF8_X7g1p0KjweHpryLnFWrk4oY0", // 🔐 Replace with your key from makersuite.google.com
      });

      // Use the EngraveMaster specific prompt format
      const formattedPrompt = engraveMasterPrompt(userMessage.content);

      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: formattedPrompt,
      });

      // Add AI response to chat
      const text = result.text || "I couldn't find an answer to that. Could you try rephrasing your question?";
      setMessages(prev => [...prev, { role: "assistant", content: text }]);
      
    } catch (err) {
      console.error("Gemini API Error:", err);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "❌ Sorry, I encountered an error while processing your request. Please try again later." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  const formatMessageContent = (content) => {
    return {
      __html: content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n\n/g, '<br/><br/>')
        .replace(/\n\* /g, '<br/>• ')
        .replace(/\n/g, '<br/>')
    };
  };

  const addSampleQuestion = (question) => {
    setQuery(question);
    // Focus on input field
    document.getElementById('message-input').focus();
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col">
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold">EngraveMaster Assistant</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Expert laser engraving advice</p>
              </div>
            </div>
          </div>
          
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.role === 'user' 
                        ? 'bg-blue-500 text-white rounded-tr-none' 
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    ) : (
                      <div 
                        className="prose dark:prose-invert prose-sm max-w-none"
                        dangerouslySetInnerHTML={formatMessageContent(message.content)} 
                      />
                    )}
                    <div className="text-xs mt-1 opacity-70 text-right">
                      {message.role === 'user' ? 'You' : 'EngraveMaster AI'} • {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl p-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-2">
                      <div className="h-3 w-3 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce"></div>
                      <div className="h-3 w-3 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="h-3 w-3 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Quick Question Suggestions */}
          <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-2">
            <div className="flex overflow-x-auto space-x-2 pb-2">
              <button 
                onClick={() => addSampleQuestion("What are the best settings for engraving cherry wood with a 40W laser?")}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Cherry wood settings
              </button>
              <button 
                onClick={() => addSampleQuestion("How do I engrave a detailed photo on walnut wood?")}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Photo on walnut
              </button>
              <button 
                onClick={() => addSampleQuestion("How do I prevent dark burn marks when engraving maple wood?")}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Prevent burn marks
              </button>
              <button 
                onClick={() => addSampleQuestion("What's the ideal DPI for detailed text engraving on plywood?")}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Text on plywood
              </button>
              <button 
                onClick={() => addSampleQuestion("How do I maintain my laser engraver for optimal performance?")}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Maintenance tips
              </button>
            </div>
          </div>
          
          {/* Input Area */}
          <div className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="flex items-end space-x-2">
              <div className="flex-grow relative">
                <textarea
                  id="message-input"
                  rows={1}
                  className="w-full p-3 pr-10 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Ask about laser engraving..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{ minHeight: '44px', maxHeight: '150px' }}
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-500 dark:text-gray-400">
                  {charCount > 0 && `${charCount}/500`}
                </div>
              </div>
              <button
                onClick={handleAsk}
                disabled={!query.trim() || loading}
                className={`p-3 rounded-full ${
                  !query.trim() || loading 
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                } transition-colors duration-200`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              Press Enter to send • Shift+Enter for new line
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}