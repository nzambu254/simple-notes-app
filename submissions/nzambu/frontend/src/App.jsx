import { useState, useEffect } from "react";
import axios from "axios";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

const API_URL = "http://127.0.0.1:8000/api/notes";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(API_URL);
      
      console.log("Full API Response:", response.data);
      
      // Laravel returns { "data": [...] }
      if (response.data.data && Array.isArray(response.data.data)) {
        setNotes(response.data.data);
      } else if (Array.isArray(response.data)) {
        setNotes(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setNotes([]);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      setError("Failed to fetch notes. Make sure your backend server is running.");
      setNotes([]);
      
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add a new note
  const addNote = async (note) => {
    try {
      setError(null);
      const response = await axios.post(API_URL, note, {
        headers: { "Content-Type": "application/json" }
      });
      
      console.log("Add note response:", response.data);
      
      // Refresh the notes list
      await fetchNotes();
      
      // Show success message
      alert("Note added successfully!");
    } catch (error) {
      console.error("Error adding note:", error);
      
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
        
        if (error.response.status === 500) {
          alert("Server error: " + (error.response.data.error || "Failed to add note. Check your backend logs."));
        } else if (error.response.status === 422) {
          const errors = error.response.data.errors;
          const errorMessage = errors ? Object.values(errors).flat().join(", ") : error.response.data.message;
          alert("Validation error: " + errorMessage);
        } else {
          alert("Failed to add note: " + (error.response.data.message || "Unknown error"));
        }
      } else {
        alert("Failed to add note. Please check if the backend server is running.");
      }
    }
  };

  // Update an existing note
  const updateNote = async (id, updatedNote) => {
    try {
      setError(null);
      const response = await axios.put(`${API_URL}/${id}`, updatedNote, {
        headers: { "Content-Type": "application/json" }
      });
      
      console.log("Update note response:", response.data);
      
      // Refresh the notes list
      await fetchNotes();
      
      // Clear editing state
      setEditingNote(null);
      
      // Show success message
      alert("Note updated successfully!");
    } catch (error) {
      console.error("Error updating note:", error);
      
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
        
        if (error.response.status === 500) {
          alert("Server error: " + (error.response.data.error || "Failed to update note."));
        } else if (error.response.status === 422) {
          const errors = error.response.data.errors;
          const errorMessage = errors ? Object.values(errors).flat().join(", ") : error.response.data.message;
          alert("Validation error: " + errorMessage);
        } else if (error.response.status === 404) {
          alert("Note not found. It may have been deleted.");
          fetchNotes();
        } else {
          alert("Failed to update note: " + (error.response.data.message || "Unknown error"));
        }
      } else {
        alert("Failed to update note. Please check if the backend server is running.");
      }
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }
    
    try {
      setError(null);
      await axios.delete(`${API_URL}/${id}`);
      
      console.log("Note deleted successfully");
      
      // Refresh the notes list
      await fetchNotes();
      
      // Show success message
      alert("Note deleted successfully!");
    } catch (error) {
      console.error("Error deleting note:", error);
      
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
        
        if (error.response.status === 500) {
          alert("Server error: Failed to delete note.");
        } else if (error.response.status === 404) {
          alert("Note not found. It may have already been deleted.");
          fetchNotes();
        } else {
          alert("Failed to delete note: " + (error.response.data.message || "Unknown error"));
        }
      } else {
        alert("Failed to delete note. Please check if the backend server is running.");
      }
    }
  };

  // Handle edit cancellation
  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <span className="text-2xl text-white">📝</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            Notes App
          </h1>
          <p className="text-slate-600 text-lg max-w-md mx-auto leading-relaxed">
            Organize your thoughts with our elegant note-taking solution
          </p>
        </header>
        
        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-8 shadow-sm">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-2">
                  {editingNote ? "Edit Note" : "Create New Note"}
                </h2>
                <p className="text-slate-500 text-sm">
                  {editingNote ? "Update your note details" : "Add a new note to your collection"}
                </p>
              </div>
              <NoteForm 
                onSubmit={addNote} 
                editingNote={editingNote} 
                onUpdate={updateNote}
                onCancelEdit={handleCancelEdit}
              />
            </div>
          </div>
          
          {/* Notes List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-800">Your Notes</h2>
                  <p className="text-slate-500 text-sm mt-1">
                    {notes.length} {notes.length === 1 ? 'note' : 'notes'} total
                  </p>
                </div>
                <button
                  onClick={fetchNotes}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </button>
              </div>
              
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                  <p className="text-slate-600 mt-4 font-medium">Loading your notes...</p>
                  <p className="text-slate-400 text-sm mt-2">Please wait a moment</p>
                </div>
              ) : (
                <NoteList 
                  notes={notes} 
                  onEdit={setEditingNote} 
                  onDelete={deleteNote} 
                />
              )}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="text-center mt-12 pt-8 border-t border-slate-200">
          <p className="text-slate-500 text-sm">
            Notes App • Built with React & Laravel
          </p>
        </footer>
      </div>
    </div>
  );
}