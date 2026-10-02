import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../service/auth.context';

const Home = () => {
    const { user, setUser, loading, setLoading } = useContext(AuthContext);
    console.log("User in Home:", user); // Log the user object to check its value
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur rounded-2xl shadow-2xl p-10 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 text-3xl font-bold text-white shadow-lg">
          {(user?.username || "G").charAt(0).toUpperCase()}
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900">Home</h1>
        <p className="mt-3 text-lg text-gray-600">
          Welcome,{" "}
          <span className="font-semibold text-indigo-600">
            {user?.username || "Guest"}
          </span>
          !
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-indigo-50 p-4">
            <p className="text-sm text-indigo-600 font-medium">Status</p>
            <p className="mt-1 font-semibold text-gray-900">Verified</p>
          </div>
          <div className="rounded-xl bg-pink-50 p-4">
            <p className="text-sm text-pink-600 font-medium">Account</p>
            <p className="mt-1 font-semibold text-gray-900">Active</p>
          </div>
        </div>

        <button className="mt-8 w-full rounded-lg bg-gradient-to-r from-indigo-600 to-pink-500 py-2.5 font-semibold text-white shadow hover:opacity-90 transition">
          Get started
        </button>
      </div>
    </div>
  );
}

export default Home