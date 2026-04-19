import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../AuthStore/useAuth';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onTouched'
  });

  const login = useAuth((state) => state.login);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const currentUser = useAuth((state) => state.currentUser);
  const error = useAuth((state) => state.error);
  const loading = useAuth((state) => state.loading);
  const navigate = useNavigate();

  const onLoginSubmit = async (userCredObj) => {
    console.log("USER DATA:", useAuth.getState().currentUser);
    await login(userCredObj);
    if (!useAuth.getState().error) {
  const user = useAuth.getState().currentUser;

  toast.success("Logged in Successfully");

  if (user?.role === "USER") {
    navigate("/user-profile");
  } else if (user?.role === "AUTHOR") {
    navigate("/author-profile");
  }
}
  }

  useEffect(() => {
  if (isAuthenticated && currentUser?.role) {
    if (currentUser.role === "USER") {
      navigate("/user-profile");
    } else if (currentUser.role === "AUTHOR") {
      navigate("/author-profile");
    }
  }
}, [isAuthenticated, currentUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4">
      
      <div className="w-full max-w-sm bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-gray-100">
        
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900">
          🔐 Welcome Back
        </h2>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-4">
          
          {/* Email */}
          <div>
            <input 
              type="email" 
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email"
                }
              })} 
              placeholder="Email address" 
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                errors.email
                  ? "border-red-400 focus:ring-2 focus:ring-red-300"
                  : "border-gray-200 focus:ring-2 focus:ring-blue-400"
              }`} 
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input 
              type="password" 
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Minimum 4 characters"
                }
              })} 
              placeholder="Password" 
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                errors.password
                  ? "border-red-400 focus:ring-2 focus:ring-red-300"
                  : "border-gray-200 focus:ring-2 focus:ring-blue-400"
              }`} 
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <p className="text-right text-xs text-gray-400 hover:text-blue-500 cursor-pointer">
            Forgot password?
          </p>

          {/* Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:scale-[1.02] hover:shadow-lg transition-all disabled:bg-gray-300"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>

        {/* Bottom text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span 
            onClick={() => navigate("/register")} 
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;

