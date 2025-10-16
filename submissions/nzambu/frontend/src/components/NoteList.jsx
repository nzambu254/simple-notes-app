import NoteItem from "./NoteItem";

export default function NoteList({ notes, onEdit, onDelete }) {
  // Safety check: ensure notes is always an array
  const notesList = Array.isArray(notes) ? notes : [];
  
  return (
    <div className="space-y-6">
      {/* List Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Your Notes</h2>
          <p className="text-slate-600 mt-1">
            {notesList.length} {notesList.length === 1 ? 'note' : 'notes'} in your collection
          </p>
        </div>
        
        {/* Sort/Filter Options */}
        <div className="flex items-center space-x-3">
          <select className="text-sm border border-slate-300 rounded-lg px-3 py-2 text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>Sort by: Newest</option>
            <option>Sort by: Oldest</option>
            <option>Sort by: Title</option>
          </select>
        </div>
      </div>

      {/* Notes Grid */}
      {notesList.length === 0 ? (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No notes yet</h3>
            <p className="text-slate-500 mb-6 leading-relaxed">
              Start organizing your thoughts by creating your first note. 
              Your ideas are waiting to be captured and remembered.
            </p>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <p className="text-sm text-slate-600">
                💡 <strong>Tip:</strong> Great notes start with clear titles and detailed content. 
                Try adding your first note using the form on the left!
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notesList.map((note) => (
            <NoteItem 
              key={note.id} 
              note={note} 
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          ))}
        </div>
      )}

      {/* Load More Section*/}
      {notesList.length > 0 && (
        <div className="text-center pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            Showing all {notesList.length} notes
          </p>
        </div>
      )}
    </div>
  );
}