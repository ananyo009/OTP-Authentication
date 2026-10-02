import React from 'react'
import { Link } from 'react-router-dom'; 
import { useState } from 'react';
import { useAuth } from '../hook/useAuth.js';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { handleregister, loading } = useAuth();
    const [email, setemail] = useState(null);
    const [username, setusername] = useState(null);
    const [password, setpassword] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await handleregister(username, email, password);
            navigate("/otp"); // Navigate to the OTP page after successful registration
        } catch (error) {
            console.error("Registration failed:", error);
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
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-xl shadow space-y-4">
      <h1 className="text-2xl font-bold">Create your account</h1>
      <input onChange={(e) => {setusername(e.target.value)}} type="text" placeholder="Full name" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      <input onChange={(e) => {setemail(e.target.value)}} type="email" placeholder="Email" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      <input onChange={(e) => {setpassword(e.target.value)}} type="password" placeholder="Password" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700">
        Create account
      </button>
      <p className="text-sm text-gray-600 text-center">
        Already have an account? <Link to="/login" className="text-indigo-600 font-semibold">Sign in</Link>
      </p>
    </form>
  </div>
);
}

export default Register