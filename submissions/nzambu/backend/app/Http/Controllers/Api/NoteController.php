<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class NoteController extends Controller
{
    /**
     * GET /api/notes
     * Get all notes
     */
    public function index(): JsonResponse
    {
        try {
            $notes = Note::orderBy('created_at', 'desc')->get();
            return response()->json(['data' => $notes], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * POST /api/notes
     * Create a new note
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'nullable|string',
            ]);

            $note = Note::create($validated);

            return response()->json(['data' => $note], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * GET /api/notes/{id}
     * Get a single note
     */
    public function show($id): JsonResponse
    {
        try {
            $note = Note::findOrFail($id);
            return response()->json(['data' => $note], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Note not found'
            ], 404);
        }
    }

    /**
     * PUT /api/notes/{id}
     * Update a note
     */
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $note = Note::findOrFail($id);

            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'nullable|string',
            ]);

            $note->update($validated);

            return response()->json(['data' => $note], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Note not found'
            ], 404);
        }
    }

    /**
     * DELETE /api/notes/{id}
     * Delete a note
     */
    public function destroy($id): JsonResponse
    {
        try {
            $note = Note::findOrFail($id);
            $note->delete();

            return response()->json([
                'message' => 'Note deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Note not found'
            ], 404);
        }
    }
}