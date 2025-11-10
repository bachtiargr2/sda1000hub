<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use DeepCopy\Filter\Filter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request) {
        $query = User::query();
        $query->with('role:id,nama')
            ->select('id', 'name', 'email', 'role_id')
            ->latest()
            ->get();

        if ($request->filled('name')) {
            $query->where('name', 'like', "%{$request->name}%");
        }

        if ($request->filled('email')) {
            $query->where('email', 'like', "%{$request->email}%");
        }

        if ($request->filled('role_id')) {
            $query->where('role_id', "{$request->role_id}");
        }

        $users = $query->paginate(10)->withQueryString();

        return Inertia::render('users/index', [
            'users' => $users,
            'roleOptions' => Role::all(['id', 'nama']),
            'filters' => $request->only(['name', 'email', 'role_id']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => ['required', Password::defaults()],
            'role_id' => 'required|exists:roles,id',
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role_id' => $validated['role_id'],
        ]);

        return redirect()->route('users.index')->with('success', 'Data pantai berhasil ditambahkan');
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'password' => ['nullable', Password::defaults()],
            'role_id' => 'required|exists:roles,id',
        ]);

        if (!empty($validated['password'])) {
            $validated['password'] = bcrypt($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return back()->with('success', 'User berhasil diperbarui');
    }

    public function destroy(Request $request, $user = null)
    {
        if ($user) {
            $model = User::findOrFail($user);
            $model->delete();

            return redirect()->back()->with('success', 'User berhasil dihapus');
        }

        $ids = $request->input('ids', []);
        if (!empty($ids)) {
            User::whereIn('id', $ids)->delete();
            return redirect()->back()->with('success', 'Beberapa user berhasil dihapus');
        }

        return redirect()->back()->with('error', 'Tidak ada ID yang dipilih');
    }
}
