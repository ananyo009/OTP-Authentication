import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../hook/useAuth.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    
    const [username, setusername] = useState(null)
    const [password, setpassword] = useState(null)

    const { handleLogin, loading } = useAuth();

    const navigate = useNavigate();
    
    async function handleSubmit(e) {
        e.preventDefault();
        try{
            await handleLogin(username, password);
            navigate("/home"); // Navigate to the home page after successful login
        } catch (error) {
            console.error("Login failed:", error);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow space-y-4">
                    <h1 className="text-2xl font-bold">Loading...</h1>
                </div>
            </div>
        );
    }



  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <form onSubmit={handleSubmit}  className="w-full max-w-md bg-white p-8 rounded-xl shadow space-y-4">
      <h1 className="text-2xl font-bold">Sign in</h1>
              <input onChange={(e) => {setusername(e.target.value)}} type="text" placeholder="username" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      <input onChange={(e) => {setpassword(e.target.value)}} type="password" placeholder="Password" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700">
        Sign in
      </button>
      <p className="text-sm text-gray-600 text-center">
        New here? <Link to="/register" className="text-indigo-600 font-semibold">Create an account</Link>
      </p>
    </form>
  </div>
);
}

export default Login