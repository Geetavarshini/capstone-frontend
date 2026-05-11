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
    await login(userCredObj);

    // get updated state AFTER login
    const state = useAuth.getState();
    const user = state.currentUser;

    console.log("AFTER LOGIN USER:", user);

    if (!state.error && user) {
      toast.success("Logged in Successfully");

      const role = user?.role?.toUpperCase();

      if (role === "USER") {
        navigate("/user-profile");
      } else if (role === "AUTHOR") {
        navigate("/author-profile");
      } else {
        console.log("Role missing or invalid:", role);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated && currentUser?.role) {
      const role = currentUser.role.toUpperCase();

      if (role === "USER") {
        navigate("/user-profile");
      } else if (role === "AUTHOR") {
        navigate("/author-profile");
      }
    }
  }, [isAuthenticated, currentUser, navigate]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fff7f2] flex items-center justify-center px-6 py-16">

      {/* BACKGROUND BLOBS */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30"></div>

      <div className="absolute top-40 right-0 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>

      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-300 rounded-full blur-3xl opacity-30"></div>

      {/* MAIN CARD */}
      <div className="relative z-10 w-full max-w-md">

        <div className="bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[40px] shadow-2xl overflow-hidden">

          {/* TOP HEADER */}
          <div className="bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 p-10 text-white text-center">

            <div className="inline-block bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-sm font-semibold mb-6">
              ✨ Welcome Back
            </div>

            <h2 className="text-5xl font-black mb-4">
              Login
            </h2>

            <p className="text-white/90 text-lg">
              Continue your creative journey
            </p>
          </div>

          {/* FORM SECTION */}
          <div className="p-8">

            {/* ERROR */}
            {error && (
              <div className="bg-red-100 border border-red-200 text-red-600 text-sm p-4 rounded-2xl mb-6">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit(onLoginSubmit)}
              className="space-y-6"
            >

              {/* EMAIL */}
              <div>

                <label className="block text-sm font-bold text-gray-700 mb-3">
                  📧 Email Address
                </label>

                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Enter a valid email"
                    }
                  })}
                  placeholder="Enter your email..."
                  className={`w-full px-5 py-4 rounded-2xl border bg-white/80 outline-none transition-all text-lg ${
                    errors.email
                      ? "border-red-400 focus:ring-4 focus:ring-red-200"
                      : "border-gray-200 focus:ring-4 focus:ring-pink-200 focus:border-pink-400"
                  }`}
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>

                <label className="block text-sm font-bold text-gray-700 mb-3">
                  🔒 Password
                </label>

                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 4,
                      message: "Minimum 4 characters"
                    }
                  })}
                  placeholder="Enter your password..."
                  className={`w-full px-5 py-4 rounded-2xl border bg-white/80 outline-none transition-all text-lg ${
                    errors.password
                      ? "border-red-400 focus:ring-4 focus:ring-red-200"
                      : "border-gray-200 focus:ring-4 focus:ring-purple-200 focus:border-purple-400"
                  }`}
                />

                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* FORGOT PASSWORD */}
              <p className="text-right text-sm text-gray-400 hover:text-pink-500 cursor-pointer transition">
                Forgot password?
              </p>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-3xl bg-black text-white text-lg font-bold hover:scale-[1.02] hover:shadow-2xl transition-all disabled:opacity-60"
              >
                {loading
                  ? "Authenticating..."
                  : "🚀 Login"}
              </button>

            </form>

            {/* DIVIDER */}
            <div className="flex items-center gap-4 my-8">

              <div className="flex-1 h-px bg-gray-200"></div>

              <span className="text-gray-400 text-sm">
                OR
              </span>

              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* REGISTER TEXT */}
            <div className="text-center">

              <p className="text-gray-500 text-sm mb-4">
                Don’t have an account yet?
              </p>

              <button
                onClick={() => navigate("/register")}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 text-white font-bold hover:scale-105 transition-all shadow-xl"
              >
                ✨ Create Account
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;