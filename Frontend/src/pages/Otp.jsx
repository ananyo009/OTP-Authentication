import React from 'react'
import { useState } from 'react'
import { useAuth } from '../hook/useAuth.js';
import { useRef } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../service/auth.context.jsx';
import {useNavigate} from 'react-router-dom'


const Otp = () => {

    const { handleVerifyOtp, loading } = useAuth();
    const { user } = useContext(AuthContext);
    const email = user?.email; // Assuming the email is stored in the user object after registration or login
    console.log("Email from context:", email); // Log the email to verify it's being retrieved correctly

    const navigate = useNavigate();
    
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputsRef = useRef([]);

    const handleChange = (index, value) => {
      if (!/^\d?$/.test(value)) return; // allow only a single digit
      const next = [...otp];
      next[index] = value;
        setOtp(next);
        
          if (value && index < 5) {
            inputsRef.current[index + 1].focus();
          }
    };

    const handleKeyDown = (index, e) => {
      // on backspace in an empty box, go back to the previous one
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputsRef.current[index - 1].focus();
      }
    };

     const handleSubmit = async (e) => {
      e.preventDefault();
         const code = otp.join(""); // e.g. "482913"
         console.log(code); // send this to your API
         await handleVerifyOtp(code, email ); // send this to your API
         navigate("/login"); // Navigate to the home page after successful OTP verification
    };

    if (loading) {
        return(
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow space-y-4">
                    <h1 className="text-2xl font-bold">Loading...</h1>
                </div>
            </div>
        )
    }

 return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
     <form
       onSubmit={handleSubmit}
       className="w-full max-w-md bg-white p-8 rounded-xl shadow space-y-6"
     >
       <div>
         <h1 className="text-2xl font-bold">Enter verification code</h1>
         <p className="text-sm text-gray-600 mt-1">
           We sent a 6-digit code to your email.
         </p>
       </div>
       <div className="flex justify-between gap-2">
         {otp.map((digit, i) => (
           <input
             key={i}
             ref={(el) => (inputsRef.current[i] = el)}
             type="text"
             inputMode="numeric"
             maxLength={1}
             value={digit}
             onChange={(e) => handleChange(i, e.target.value)}
             onKeyDown={(e) => handleKeyDown(i, e)}
             className="w-12 h-14 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
           />
         ))}
       </div>
       <button
         type="submit"
         className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700"
       >
         Verify code
       </button>
       <p className="text-sm text-gray-600 text-center">
         Didn't get it?{" "}
         <button type="button" className="text-indigo-600 font-semibold">
           Resend code
         </button>
       </p>
     </form>
   </div>
 );
}

export default Otp