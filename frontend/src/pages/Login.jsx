// frontend/src/pages/Login.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import toast from "react-hot-toast"; // Ensure you have this

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  const handleGoogleLogin = () => {
    toast.error("Google Login is currently disabled in Developer Mode.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0B0C15]">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />

      <div className="w-full max-w-md p-8 rounded-2xl glass-card relative z-10 mx-4 border border-white/10 bg-[#151725]/60 backdrop-blur-xl">
        
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-xl bg-white/5 border border-white/10 mb-4">
            <img src="/logo-removebg-preview.png" alt="Logo" className="w-10 h-10 object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 text-sm mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-400 transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                className="input-field pl-10 bg-[#0B0C15]/50 border-white/10 focus:border-indigo-500"
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Password</label>
                {/* FORGOT PASSWORD LINK */}
                <Link to="/forgot-password" className="text-xs text-indigo-400 hover:text-indigo-300">
                    Forgot Password?
                </Link>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-400 transition-colors">
                <Lock size={18} />
              </div>
              <input
                type="password"
                className="input-field pl-10 bg-[#0B0C15]/50 border-white/10 focus:border-indigo-500"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button type="submit" className="w-full btn-primary-glow py-3 flex items-center justify-center gap-2 group" disabled={isLoggingIn}>
            {isLoggingIn ? <Loader2 className="animate-spin" /> : "Sign In"}
          </button>
        </form>

       {/* GOOGLE SIGN IN SECTION */}
<div className="mt-6">
    <div className="relative">
        <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#191b2b] text-gray-500">Or continue with</span>
        </div>
    </div>

    <button 
        type="button" // Important so it doesn't submit the form
        onClick={handleGoogleLogin}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-white text-gray-900 py-2.5 rounded-xl font-medium hover:bg-gray-100 transition"
    >
        {/* CORRECTED SVG - Removed duplicate 'fill' attributes */}
        <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Google
    </button>
</div>
</div>
    </div>
  );
}