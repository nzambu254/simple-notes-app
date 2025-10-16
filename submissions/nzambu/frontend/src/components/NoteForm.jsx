import { useState, useEffect } from "react";

export default function NoteForm({ onSubmit, editingNote, onUpdate, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingNote) {
      onUpdate(editingNote.id, { title, content });
    } else {
      onSubmit({ title, content });
    }
    if (!editingNote) {
      setTitle("");
      setContent("");
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            {editingNote ? "Edit Note" : "New Note"}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {editingNote ? "Update your note details" : "Add a new note to your collection"}
          </p>
        </div>
        {editingNote && (
          <button
            type="button"
            onClick={handleCancel}
            className="text-sm text-slate-500 hover:text-slate-700 transition-colors duration-200"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Title Input */}
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-slate-700">
          Title
        </label>
        <input
          id="title"
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-slate-400"
          placeholder="Enter note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Content Textarea */}
      <div className="space-y-2">
        <label htmlFor="content" className="block text-sm font-medium text-slate-700">
          Content
        </label>
        <textarea
          id="content"
          rows={6}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-slate-400 resize-none"
          placeholder="Write your note content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <div className="flex items-center justify-center">
          {editingNote ? (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Update Note
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Note
            </>
          )}
        </div>
      </button>

      {/* Form Tips */}
      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-slate-700">Pro Tip</p>
            <p className="text-sm text-slate-500 mt-1">
              Keep your notes organized with clear titles and detailed content for better readability.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}