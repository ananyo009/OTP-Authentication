import { AuthContext } from "../service/auth.context";
import { useContext } from "react";
import { login,register,verifyOtp } from "../service/auth.api.js";

export const useAuth = () => {
    const { user, setUser, loading, setLoading } = useContext(AuthContext);

    const handleLogin = async (username, password) => {
        // Simulate API call
        setLoading(true);
        const response = await login(username, password);
        setUser(response.user);
        setLoading(false);
    };

    const handleregister = async (username, email, password) => {
        setLoading(true);
        const response = await register(username, email, password);
        setUser(response.user);
        setLoading(false);
    }

    const handleVerifyOtp = async ( otp, email ) => {
        setLoading(true);
        const response = await verifyOtp( otp, email );
        setUser(response.user);
        setLoading(false);
    }

    return { user, handleLogin, handleregister, handleVerifyOtp, loading, setLoading };
}