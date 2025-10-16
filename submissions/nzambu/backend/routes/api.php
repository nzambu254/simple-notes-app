<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NoteController;

// Default route
Route::get('/', function () {
    return response()->json(['message' => 'Notes API is working!'], 200);
});

// Notes CRUD API Routes
Route::get('/notes', [NoteController::class, 'index']);          // Get all notes
Route::post('/notes', [NoteController::class, 'store']);         // Create a note
Route::get('/notes/{id}', [NoteController::class, 'show']);      // Get a single note
Route::put('/notes/{id}', [NoteController::class, 'update']);    // Update a note
Route::delete('/notes/{id}', [NoteController::class, 'destroy']); // Delete a note