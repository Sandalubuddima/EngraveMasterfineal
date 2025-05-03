import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  FiEdit3, 
  FiTrash2, 
  FiPlus, 
  FiSave, 
  FiX, 
  FiSearch,
  FiFolder,
  FiFileText,
  FiImage,
  FiGrid,
  FiList,
  FiChevronRight,
  FiTag,
  FiCalendar,
  FiClock,
  FiHelpCircle,
  FiShare2,
  FiDownload,
  FiCheck,
  FiStar
} from "react-icons/fi";
import Navbar from "../components/PageNavbar";
import Footer from "../components/Footer";

export default function NotesAndSketches() {
  // State for notes and sketches
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // all, notes, sketches, favorites
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("date"); // date, title, type
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [showTagSelector, setShowTagSelector] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const isDrawing = useRef(false);
  const editorRef = useRef(null);
  
  // Toast notification system
  const [toast, setToast] = useState({ message: "", type: "", visible: false });
  
  const showToast = (message, type = "success") => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ message: "", type: "", visible: false }), 3000);
  };

  // Mock data initialization
  useEffect(() => {
    // Simulating API call to get notes and sketches
    setTimeout(() => {
      const mockNotes = [
        {
          id: 1,
          title: "Wood Grain Pattern Ideas",
          content: "For the next project, consider using oak with its distinctive grain pattern. The client mentioned they prefer natural looks with minimal staining.\n\nPossible patterns to explore:\n- Vertical straight grain\n- Cathedral patterns\n- Bird's eye maple effect",
          type: "note",
          tags: ["ideas", "patterns"],
          created: "2025-04-28T14:30:00",
          updated: "2025-05-01T09:15:00",
          favorite: true
        },
        {
          id: 2,
          title: "Customer Logo Sketch",
          content: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MDAgNTAwIj48cGF0aCBmaWxsPSIjRkY2RjNDIiBkPSJNMjUwLDUwYzExMC41LDAsMjAwLDg5LjUsMjAwLDIwMHMtODkuNSwyMDAtMjAwLDIwMFM1MCwzNjAuNSw1MCwyNTBTMTM5LjUsNTAsMjUwLDUweiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yMjUsMTUwaDUwdjE1MGgtNTBWMTUweiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xNzUsMjAwaDEwMHY1MEgxNzVWMjAweiBNMjI1LDMwMGg1MHY1MGgtNTBWMzAweiIvPjwvc3ZnPg==",
          type: "sketch",
          tags: ["client", "logo"],
          created: "2025-04-29T11:20:00",
          updated: "2025-04-29T16:45:00",
          favorite: false
        },
        {
          id: 3,
          title: "Machine Calibration Notes",
          content: "Laser power: 65% for hardwoods, 45% for softer woods\nSpeed: 35mm/s for detailed work, 50mm/s for outlines\n\nRemember to adjust focal length based on material thickness:\n- 3mm plywood: Standard focus\n- 6mm oak: +2mm adjustment\n- 12mm cherry: +5mm adjustment\n\nAlways test on scrap material first!",
          type: "note",
          tags: ["technical", "settings"],
          created: "2025-04-30T09:00:00",
          updated: "2025-05-02T10:10:00",
          favorite: true
        },
        {
          id: 4,
          title: "Custom Border Design",
          content: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MDAgNTAwIj48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiM4NDI0MGMiIHN0cm9rZS13aWR0aD0iOCIgZD0iTTUwLDUwIEw0NTAsNTAgTDQ1MCw0NTAgTDUwLDQ1MCBMNTAsNTAgWiIvPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGNkYzQyIgc3Ryb2tlLXdpZHRoPSI0IiBkPSJNNzUsNzUgTDQyNSw3NSBMNDI1LDQyNSBMNzUsNDI1IEw3NSw3NSBaIi8+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjODQyNDBjIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0xMDAsMTAwIEwxMDAsMTUwIEwxNTAsMTUwIE0zNTAsMTUwIEw0MDAsMTUwIEw0MDAsMTAwIE00MDAsMzUwIEw0MDAsMTUwIEw0MDAsMTAwIE0xNTAsMTUwIEwxNTAsMjAwIE0xNTAsMzAwIEwxNTAsMzUwIE00MDAsMzUwIEw0MDAsMTUwIE00MDAsMzUwIEwzNTAsMzUwIE0xNTAsMzUwIEwxMDAsMzUwIEwxMDAsMTUwIi8+PC9zdmc+",
          type: "sketch",
          tags: ["border", "design"],
          created: "2025-05-01T14:30:00",
          updated: "2025-05-02T08:20:00",
          favorite: false
        },
        {
          id: 5,
          title: "Project Timeline Tracker",
          content: "May 5: Meet with client to finalize design specs\nMay 7-9: Create prototypes and test engravings\nMay 12: Client review meeting\nMay 15-20: Production phase\nMay 22: Final quality check\nMay 25: Delivery deadline\n\nNote: Ask about finishes - oil vs. polyurethane preference?",
          type: "note",
          tags: ["project", "timeline"],
          created: "2025-05-02T13:15:00",
          updated: "2025-05-02T13:15:00",
          favorite: false
        },
        {
          id: 6,
          title: "Floral Pattern Sketch",
          content: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MDAgNTAwIj48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiM4NDI0MGMiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTI1MCwyNTAgQzI1MCwyMDAgMzAwLDE1MCAzNTAsMTUwIEMzNzUsMTUwIDQwMCwxNzUgNDAwLDIwMCBDNDAwLDI1MCAzNTAsMzAwIDMwMCwzMDAgQzI1MCwzMDAgMjAwLDM1MCAxNTAsMzUwIEMxMjUsMzUwIDEwMCwzMjUgMTAwLDMwMCBDMTAwLDI1MCAxNTAsMjAwIDIwMCwyMDAgQzI1MCwyMDAgMzAwLDE1MCAzNTAsMTUwIi8+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkY2RjNDIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0yNTAsMjUwIEMyNTAsMzAwIDMwMCwzNTAgMzUwLDM1MCBDMzc1LDM1MCA0MDAsMzI1IDQwMCwzMDAgQzQwMCwyNTAgMzUwLDIwMCAzMDAsMjAwIEMyNTAsMjAwIDIwMCwxNTAgMTUwLDE1MCBDMTIyLDE1MCAxMDAsMTc1IDEwMCwyMDAgQzEwMCwyNTAgMTUwLDMwMCAyMDAsMzAwIEMyNTAsMzAwIDMwMCwzNTAgMzUwLDM1MCIvPjxjaXJjbGUgY3g9IjI1MCIgY3k9IjI1MCIgcj0iMTAiIGZpbGw9IiNGRjZGM0MiLz48Y2lyY2xlIGN4PSIzNTAiIGN5PSIxNTAiIHI9IjgiIGZpbGw9IiM4NDI0MGMiLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSIxNTAiIHI9IjgiIGZpbGw9IiM4NDI0MGMiLz48Y2lyY2xlIGN4PSIzNTAiIGN5PSIzNTAiIHI9IjgiIGZpbGw9IiM4NDI0MGMiLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSIzNTAiIHI9IjgiIGZpbGw9IiM4NDI0MGMiLz48L3N2Zz4=",
          type: "sketch",
          tags: ["floral", "pattern", "design"],
          created: "2025-05-02T16:45:00",
          updated: "2025-05-02T17:30:00",
          favorite: true
        }
      ];
      
      // Extract all unique tags
      const uniqueTags = [...new Set(mockNotes.flatMap(note => note.tags))];
      
      setNotes(mockNotes);
      setTags(uniqueTags.map(tag => ({ name: tag, selected: false })));
      setLoading(false);
    }, 1000);
  }, []);

  // Initialize canvas when in sketch mode
  useEffect(() => {
    if (editMode && activeNote && activeNote.type === 'sketch' && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = "#FF6F3C";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctxRef.current = ctx;
      
      // If we have existing content, load it
      if (activeNote.content && activeNote.content.startsWith('data:')) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = activeNote.content;
      }
    }
  }, [editMode, activeNote]);

  // Handle mouse events for drawing
  const startDrawing = (e) => {
    if (!editMode || !ctxRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    isDrawing.current = true;
  };
  
  const draw = (e) => {
    if (!isDrawing.current || !ctxRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };
  
  const stopDrawing = () => {
    if (!ctxRef.current) return;
    
    ctxRef.current.closePath();
    isDrawing.current = false;
  };

  // Create a new note
  const createNewNote = (type) => {
    const newNote = {
      id: Date.now(),
      title: type === 'note' ? "New Note" : "New Sketch",
      content: type === 'note' ? "" : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MDAgNTAwIj48L3N2Zz4=",
      type: type,
      tags: [],
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      favorite: false
    };
    
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
    setEditMode(true);
    showToast(`New ${type} created`);
  };

  // Save the current note
  const saveNote = () => {
    if (!activeNote) return;
    
    let updatedContent = activeNote.content;
    
    // If it's a sketch and we're in edit mode, save the canvas content
    if (activeNote.type === 'sketch' && canvasRef.current) {
      updatedContent = canvasRef.current.toDataURL();
    }
    
    // If it's a note and we're in edit mode, save the text content
    if (activeNote.type === 'note' && editorRef.current) {
      updatedContent = editorRef.current.value;
    }
    
    const updatedNote = {
      ...activeNote,
      content: updatedContent,
      updated: new Date().toISOString()
    };
    
    setNotes(notes.map(note => note.id === activeNote.id ? updatedNote : note));
    setActiveNote(updatedNote);
    setEditMode(false);
    showToast("Changes saved successfully");
  };

  // Delete a note
  const deleteNote = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setNotes(notes.filter(note => note.id !== id));
      if (activeNote && activeNote.id === id) {
        setActiveNote(null);
        setEditMode(false);
      }
      showToast("Item deleted");
    }
  };

  // Toggle favorite status
  const toggleFavorite = (note) => {
    const updatedNote = { ...note, favorite: !note.favorite };
    setNotes(notes.map(n => n.id === note.id ? updatedNote : n));
    
    if (activeNote && activeNote.id === note.id) {
      setActiveNote(updatedNote);
    }
    
    showToast(updatedNote.favorite ? "Added to favorites" : "Removed from favorites");
  };

  // Add or remove tag from active note
  const toggleTag = (tagName) => {
    if (!activeNote) return;
    
    let updatedTags;
    if (activeNote.tags.includes(tagName)) {
      updatedTags = activeNote.tags.filter(tag => tag !== tagName);
    } else {
      updatedTags = [...activeNote.tags, tagName];
    }
    
    const updatedNote = {
      ...activeNote,
      tags: updatedTags,
      updated: new Date().toISOString()
    };
    
    setNotes(notes.map(note => note.id === activeNote.id ? updatedNote : note));
    setActiveNote(updatedNote);
  };

  // Create a new tag
  const addNewTag = () => {
    if (!newTagName.trim()) return;
    
    // Check if tag already exists
    if (tags.some(tag => tag.name === newTagName)) {
      showToast("Tag already exists", "error");
      return;
    }
    
    setTags([...tags, { name: newTagName, selected: false }]);
    
    // Add to active note if we have one
    if (activeNote) {
      const updatedNote = {
        ...activeNote,
        tags: [...activeNote.tags, newTagName],
        updated: new Date().toISOString()
      };
      
      setNotes(notes.map(note => note.id === activeNote.id ? updatedNote : note));
      setActiveNote(updatedNote);
    }
    
    setNewTagName("");
    showToast("New tag created");
  };

  // Filter notes based on search term, filter, and tags
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        (note.type === 'note' && typeof note.content === 'string' && 
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filter === 'all' || 
                        (filter === 'notes' && note.type === 'note') ||
                        (filter === 'sketches' && note.type === 'sketch') ||
                        (filter === 'favorites' && note.favorite);
    
    const selectedTags = tags.filter(tag => tag.selected).map(tag => tag.name);
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => note.tags.includes(tag));
    
    return matchesSearch && matchesFilter && matchesTags;
  });

  // Sort notes
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'type') {
      return a.type.localeCompare(b.type);
    } else {
      // Default: by date (newest first)
      return new Date(b.updated) - new Date(a.updated);
    }
  });

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-[#f5e9da] to-[#e7cfb4] dark:from-[#1C1C1C] dark:to-[#2e2e2e] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with breadcrumbs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <div className="flex items-center text-sm text-[#563232] dark:text-[#e7cfb4] mb-2">
                <a href="/" className="hover:text-[#FF6F3C]">Home</a>
                <FiChevronRight className="mx-2" />
                <span className="font-medium">Notes & Sketches</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#84240c] dark:text-[#ffc18c]">
                Notes & Sketches
              </h1>
              <p className="mt-2 text-[#563232] dark:text-[#e7cfb4] max-w-2xl">
                Capture your ideas, designs, and technical notes for your engraving projects
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button 
                onClick={() => createNewNote('note')}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#00C2A8] to-[#00A28D] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <FiFileText className="mr-2" />
                New Note
              </button>
              <button 
                onClick={() => createNewNote('sketch')}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#FF6F3C] to-[#FF3C3C] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <FiImage className="mr-2" />
                New Sketch
              </button>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-64 flex-shrink-0"
            >
              <div className="bg-white dark:bg-[#2e2e2e] rounded-xl shadow-md overflow-hidden sticky top-24">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="font-semibold text-[#84240c] dark:text-[#ffc18c]">Filters</h2>
                </div>
                
                <div className="p-4">
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-[#563232] dark:text-[#e7cfb4] mb-2">Type</h3>
                    <div className="space-y-2">
                      <button 
                        onClick={() => setFilter('all')}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                          filter === 'all' 
                            ? 'bg-[#FF6F3C]/10 text-[#FF6F3C]' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-[#563232] dark:text-[#e7cfb4]'
                        }`}
                      >
                        <div className="flex items-center">
                          <FiFolder className="mr-2" />
                          <span>All Items</span>
                          <span className="ml-auto bg-gray-200 dark:bg-gray-700 text-[#563232] dark:text-[#e7cfb4] text-xs font-medium rounded-full px-2 py-0.5">
                            {notes.length}
                          </span>
                        </div>
                      </button>
                      
                      <button 
                        onClick={() => setFilter('notes')}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                          filter === 'notes' 
                            ? 'bg-[#00C2A8]/10 text-[#00C2A8]' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-[#563232] dark:text-[#e7cfb4]'
                        }`}
                      >
                        <div className="flex items-center">
                          <FiFileText className="mr-2" />
                          <span>Notes</span>
                          <span className="ml-auto bg-gray-200 dark:bg-gray-700 text-[#563232] dark:text-[#e7cfb4] text-xs font-medium rounded-full px-2 py-0.5">
                            {notes.filter(note => note.type === 'note').length}
                          </span>
                        </div>
                      </button>
                      
                      <button 
                        onClick={() => setFilter('sketches')}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                          filter === 'sketches' 
                            ? 'bg-[#FF6F3C]/10 text-[#FF6F3C]' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-[#563232] dark:text-[#e7cfb4]'
                        }`}
                      >
                        <div className="flex items-center">
                          <FiImage className="mr-2" />
                          <span>Sketches</span>
                          <span className="ml-auto bg-gray-200 dark:bg-gray-700 text-[#563232] dark:text-[#e7cfb4] text-xs font-medium rounded-full px-2 py-0.5">
                            {notes.filter(note => note.type === 'sketch').length}
                          </span>
                        </div>
                      </button>
                      
                      <button 
                        onClick={() => setFilter('favorites')}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                          filter === 'favorites' 
                            ? 'bg-[#845EC2]/10 text-[#845EC2]' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-[#563232] dark:text-[#e7cfb4]'
                        }`}
                      >
                        <div className="flex items-center">
                          <FiStar className="mr-2" />
                          <span>Favorites</span>
                          <span className="ml-auto bg-gray-200 dark:bg-gray-700 text-[#563232] dark:text-[#e7cfb4] text-xs font-medium rounded-full px-2 py-0.5">
                            {notes.filter(note => note.favorite).length}
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-[#563232] dark:text-[#e7cfb4]">Tags</h3>
                      <button 
                        onClick={() => setTags(tags.map(tag => ({ ...tag, selected: false })))}
                        className="text-xs text-[#FF6F3C] hover:underline"
                      >
                        Clear All
                      </button>
                    </div>
                    
                    <div className="space-y-1.5 max-h-40 overflow-auto">
                      {tags.map((tag, index) => (
                        <button 
                          key={index}
                          onClick={() => setTags(tags.map((t, i) => 
                            i === index ? { ...t, selected: !t.selected } : t
                          ))}
                          className={`flex items-center text-sm px-2 py-1 rounded-md ${
                            tag.selected
                              ? 'bg-[#FF6F3C]/10 text-[#FF6F3C]'
                              : 'text-[#563232] dark:text-[#e7cfb4] hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          <FiTag className="mr-1.5" size={14} />
                          <span>{tag.name}</span>
                          <span className="ml-auto text-xs opacity-70">
                            {notes.filter(note => note.tags.includes(tag.name)).length}
                          </span>
                        </button>
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => setShowTagSelector(!showTagSelector)}
                      className="mt-2 text-sm text-[#FF6F3C] hover:text-[#e55a27] inline-flex items-center"
                    >
                      <FiPlus className="mr-1" size={14} />
                      Add Tag
                    </button>
                    
                    {showTagSelector && (
                      <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex">
                          <input
                            type="text"
                            className="block w-full text-sm border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 text-[#563232] dark:text-[#e7cfb4] focus:ring-[#FF6F3C] focus:border-[#FF6F3C]"
                            placeholder="New tag name..."
                            value={newTagName}
                            onChange={(e) => setNewTagName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addNewTag()}
                          />
                          <button
                            onClick={addNewTag}
                            className="px-2 bg-[#FF6F3C] text-white rounded-r-lg"
                          >
                            <FiPlus />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-[#563232] dark:text-[#e7cfb4] mb-2">Sort By</h3>
                    <select
                      className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-[#563232] dark:text-[#e7cfb4] rounded-lg focus:ring-[#FF6F3C] focus:border-[#FF6F3C] p-2 text-sm"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="date">Last Updated</option>
                      <option value="title">Title</option>
                      <option value="type">Type</option>
                    </select>
                  </div>
                </div>
                
                <div className="p-4 bg-[#f9f5f2] dark:bg-[#1c1c1c] border-t border-gray-200 dark:border-gray-700">
                  <a 
                    href="/support"
                    className="text-sm text-[#563232] dark:text-[#e7cfb4] flex items-center hover:text-[#FF6F3C]"
                  >
                    <FiHelpCircle className="mr-2" />
                    <span>Need help?</span>
                  </a>
                </div>
              </div>
            </motion.div>
            
            <div className="flex-1">
              {/* Search bar and view toggle */}
              <div className="bg-white dark:bg-[#2e2e2e] rounded-xl shadow-md mb-6 p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                  <div className="relative flex-grow max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-[#563232] dark:text-[#e7cfb4] focus:ring-[#FF6F3C] focus:border-[#FF6F3C]"
                      placeholder="Search notes and sketches..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    <button
                      className={`p-2 rounded-md ${viewMode === "grid" ? "bg-white dark:bg-gray-600 shadow-sm" : "text-gray-500 dark:text-gray-400"}`}
                      onClick={() => setViewMode("grid")}
                      title="Grid view"
                    >
                      <FiGrid />
                    </button>
                    <button
                      className={`p-2 rounded-md ${viewMode === "list" ? "bg-white dark:bg-gray-600 shadow-sm" : "text-gray-500 dark:text-gray-400"}`}
                      onClick={() => setViewMode("list")}
                      title="List view"
                    >
                      <FiList />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Main content area */}
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6F3C]"></div>
                </div>
              ) : activeNote ? (
                // Show active note/sketch
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-[#2e2e2e] rounded-xl shadow-md overflow-hidden"
                >
                  {/* Note/sketch header */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      {editMode ? (
                        <input
                          type="text"
                          className="block w-full text-xl font-bold border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-[#84240c] dark:text-[#ffc18c] focus:ring-[#FF6F3C] focus:border-[#FF6F3C] mb-2"
                          value={activeNote.title}
                          onChange={(e) => setActiveNote({...activeNote, title: e.target.value})}
                        />
                      ) : (
                        <h2 className="text-xl font-bold text-[#84240c] dark:text-[#ffc18c] mb-2">
                          {activeNote.title}
                        </h2>
                      )}
                      
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#563232] dark:text-[#e7cfb4]">
                        <div className="flex items-center">
                          <FiClock className="mr-1" />
                          <span>Last updated: {formatDate(activeNote.updated)}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <FiFileText className="mr-1" />
                          <span>{activeNote.type === 'note' ? 'Note' : 'Sketch'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleFavorite(activeNote)}
                        className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          activeNote.favorite ? 'text-[#845EC2]' : 'text-gray-400'
                        }`}
                        title={activeNote.favorite ? "Remove from favorites" : "Add to favorites"}
                      >
                        <FiStar className={activeNote.favorite ? "fill-current" : ""} />
                      </button>
                      
                      {editMode ? (
                        <>
                          <button
                            onClick={saveNote}
                            className="px-3 py-1.5 bg-[#00C2A8] text-white rounded-lg hover:bg-[#00a28d] transition-colors duration-200 flex items-center"
                          >
                            <FiSave className="mr-1.5" />
                            Save
                          </button>
                          <button
                            onClick={() => setEditMode(false)}
                            className="px-3 py-1.5 bg-gray-200 dark:bg-gray-600 text-[#563232] dark:text-[#e7cfb4] rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200 flex items-center"
                          >
                            <FiX className="mr-1.5" />
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setEditMode(true)}
                            className="px-3 py-1.5 bg-[#FF6F3C] text-white rounded-lg hover:bg-[#e55a27] transition-colors duration-200 flex items-center"
                          >
                            <FiEdit3 className="mr-1.5" />
                            Edit
                          </button>
                          <button
                            onClick={() => deleteNote(activeNote.id)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                          <button
                            onClick={() => setActiveNote(null)}
                            className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                            title="Close"
                          >
                            <FiX />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center gap-2">
                    <span className="text-sm text-[#563232] dark:text-[#e7cfb4]">Tags:</span>
                    
                    {activeNote.tags.length > 0 ? (
                      activeNote.tags.map((tag, index) => (
                        <div 
                          key={index}
                          className="flex items-center bg-[#FF6F3C]/10 text-[#FF6F3C] text-xs rounded-full px-2 py-1"
                        >
                          <FiTag className="mr-1" size={12} />
                          <span>{tag}</span>
                          {editMode && (
                            <button
                              onClick={() => toggleTag(tag)}
                              className="ml-1 hover:text-[#e55a27]"
                            >
                              <FiX size={12} />
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <span className="text-sm text-gray-400">No tags</span>
                    )}
                    
                    {editMode && (
                      <button 
                        onClick={() => setShowTagSelector(!showTagSelector)}
                        className="text-xs text-[#FF6F3C] hover:text-[#e55a27] inline-flex items-center"
                      >
                        <FiPlus size={12} className="mr-0.5" />
                        Add
                      </button>
                    )}
                  </div>
                  
                  {/* Content area */}
                  <div className="p-6">
                    {activeNote.type === 'note' ? (
                      editMode ? (
                        <textarea
                          ref={editorRef}
                          className="w-full h-64 md:h-80 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-[#563232] dark:text-[#e7cfb4] focus:ring-[#FF6F3C] focus:border-[#FF6F3C]"
                          defaultValue={activeNote.content}
                        ></textarea>
                      ) : (
                        <div className="prose prose-orange dark:prose-invert max-w-none">
                          {activeNote.content.split('\n').map((line, i) => (
                            <p key={i} className="mb-4 text-[#563232] dark:text-[#e7cfb4]">
                              {line || <br />}
                            </p>
                          ))}
                        </div>
                      )
                    ) : (
                      // Sketch content
                      <div className="relative">
                        {editMode ? (
                          <div className="border-2 border-dashed border-[#FF6F3C] rounded-lg overflow-hidden bg-white">
                            <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 z-10">
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-[#FF6F3C] rounded-full"></div>
                                <div className="w-6 h-6 bg-[#84240c] rounded-full"></div>
                                <div className="w-6 h-6 bg-black rounded-full"></div>
                              </div>
                            </div>
                            <canvas
                              ref={canvasRef}
                              className="w-full h-96 md:h-[500px] touch-none"
                              onMouseDown={startDrawing}
                              onMouseMove={draw}
                              onMouseUp={stopDrawing}
                              onMouseLeave={stopDrawing}
                            />
                          </div>
                        ) : (
                          <div className="bg-[#f9f5f2] dark:bg-[#1c1c1c] rounded-lg p-4 flex justify-center">
                            <img 
                              src={activeNote.content} 
                              alt={activeNote.title}
                              className="max-w-full h-auto rounded shadow-sm"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Footer with actions */}
                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                    <div className="text-sm text-[#563232] dark:text-[#e7cfb4]">
                      Created: {formatDate(activeNote.created)}
                    </div>
                    
                    {!editMode && (
                      <div className="flex space-x-2">
                        {activeNote.type === 'sketch' && (
                          <a
                            href={activeNote.content}
                            download={`${activeNote.title.replace(/\s+/g, '_')}.svg`}
                            className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg text-[#563232] dark:text-[#e7cfb4] transition-colors duration-200 flex items-center"
                          >
                            <FiDownload className="mr-1.5" />
                            Download
                          </a>
                        )}
                        <button
                          className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg text-[#563232] dark:text-[#e7cfb4] transition-colors duration-200 flex items-center"
                        >
                          <FiShare2 className="mr-1.5" />
                          Share
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : sortedNotes.length === 0 ? (
                // Empty state
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-[#2e2e2e] rounded-xl shadow-md p-8 text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FF6F3C] bg-opacity-10 rounded-full mb-4">
                    <FiFileText className="text-2xl text-[#FF6F3C]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#84240c] dark:text-[#ffc18c] mb-2">
                    {searchTerm || tags.some(tag => tag.selected) ? "No matching items found" : "No notes or sketches yet"}
                  </h3>
                  <p className="text-[#563232] dark:text-[#e7cfb4] max-w-md mx-auto mb-6">
                    {searchTerm || tags.some(tag => tag.selected)
                      ? `Try adjusting your search or filters to find what you're looking for.`
                      : `Start capturing your ideas, project plans, or design sketches for your laser engraving projects.`
                    }
                  </p>
                  {!(searchTerm || tags.some(tag => tag.selected)) && (
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                      <button 
                        onClick={() => createNewNote('note')}
                        className="inline-flex items-center justify-center px-4 py-2 bg-[#00C2A8] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <FiFileText className="mr-2" />
                        Create a Note
                      </button>
                      <button 
                        onClick={() => createNewNote('sketch')}
                        className="inline-flex items-center justify-center px-4 py-2 bg-[#FF6F3C] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <FiImage className="mr-2" />
                        Create a Sketch
                      </button>
                    </div>
                  )}
                </motion.div>
              ) : (
                // Note/sketch grid or list
                viewMode === "grid" ? (
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {sortedNotes.map((note) => (
                      <motion.div
                        key={note.id}
                        variants={itemVariants}
                        className="bg-white dark:bg-[#2e2e2e] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer group"
                        onClick={() => setActiveNote(note)}
                      >
                        <div className="relative">
                          {note.type === 'sketch' ? (
                            <div className="h-48 bg-[#f9f5f2] dark:bg-[#1c1c1c] flex items-center justify-center overflow-hidden">
                              <img 
                                src={note.content} 
                                alt={note.title}
                                className="max-w-full h-auto max-h-full"
                              />
                            </div>
                          ) : (
                            <div className="h-48 bg-[#f9f5f2] dark:bg-[#1c1c1c] p-4 overflow-hidden">
                              <div className="line-clamp-7 text-sm text-[#563232] dark:text-[#e7cfb4]">
                                {note.content}
                              </div>
                            </div>
                          )}
                          
                          {note.favorite && (
                            <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md">
                              <FiStar className="text-[#845EC2] fill-current" size={16} />
                            </div>
                          )}
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-semibold text-[#84240c] dark:text-[#ffc18c] mb-1 truncate">
                            {note.title}
                          </h3>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <FiCalendar size={12} className="mr-1" />
                              <span>{new Date(note.updated).toLocaleDateString()}</span>
                            </div>
                            
                            <div className="flex items-center text-xs">
                              <span className={`px-2 py-0.5 rounded-full ${
                                note.type === 'note' 
                                  ? 'bg-[#00C2A8]/10 text-[#00C2A8]' 
                                  : 'bg-[#FF6F3C]/10 text-[#FF6F3C]'
                              }`}>
                                {note.type}
                              </span>
                            </div>
                          </div>
                          
                          {note.tags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1">
                              {note.tags.slice(0, 3).map((tag, idx) => (
                                <div 
                                  key={idx}
                                  className="bg-gray-100 dark:bg-gray-700 text-[#563232] dark:text-[#e7cfb4] text-xs rounded-full px-2 py-0.5 truncate max-w-[80px]"
                                >
                                  {tag}
                                </div>
                              ))}
                              {note.tags.length > 3 && (
                                <div className="bg-gray-100 dark:bg-gray-700 text-[#563232] dark:text-[#e7cfb4] text-xs rounded-full px-2 py-0.5">
                                  +{note.tags.length - 3}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white dark:bg-[#2e2e2e] rounded-xl shadow-md overflow-hidden"
                  >
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Title
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Type
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Tags
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Updated
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-[#2e2e2e] divide-y divide-gray-200 dark:divide-gray-700">
                        {sortedNotes.map((note) => (
                          <motion.tr 
                            key={note.id}
                            variants={itemVariants}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div onClick={() => setActiveNote(note)} className="cursor-pointer">
                                  <div className="text-sm font-semibold text-[#84240c] dark:text-[#ffc18c] flex items-center">
                                    {note.favorite && (
                                      <FiStar className="text-[#845EC2] fill-current mr-1" size={16} />
                                    )}
                                    {note.title}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                note.type === 'note' 
                                  ? 'bg-[#00C2A8]/10 text-[#00C2A8]' 
                                  : 'bg-[#FF6F3C]/10 text-[#FF6F3C]'
                              }`}>
                                {note.type}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1 max-w-xs">
                                {note.tags.length > 0 ? (
                                  note.tags.map((tag, idx) => (
                                    <div 
                                      key={idx}
                                      className="bg-gray-100 dark:bg-gray-700 text-[#563232] dark:text-[#e7cfb4] text-xs rounded-full px-2 py-0.5"
                                    >
                                      {tag}
                                    </div>
                                  ))
                                ) : (
                                  <span className="text-gray-400 text-xs">No tags</span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {new Date(note.updated).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex space-x-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveNote(note);
                                  }}
                                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                  title="View"
                                >
                                  <FiSearch size={18} />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveNote(note);
                                    setEditMode(true);
                                  }}
                                  className="text-[#FF6F3C] hover:text-[#e55a27]"
                                  title="Edit"
                                >
                                  <FiEdit3 size={18} />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNote(note.id);
                                  }}
                                  className="text-red-500 hover:text-red-700"
                                  title="Delete"
                                >
                                  <FiTrash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Toast notification */}
      {toast.visible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2 ${
            toast.type === "error" 
              ? "bg-red-500 text-white" 
              : "bg-green-500 text-white"
          }`}
        >
          {toast.type === "error" ? (
            <FiX className="flex-shrink-0" />
          ) : (
            <FiCheck className="flex-shrink-0" />
          )}
          <span>{toast.message}</span>
        </motion.div>
      )}
      
      <Footer />
    </>
  );
}