import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../AuthStore/useAuth';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched'
  });

  const login = useAuth(
    (state) => state.login
  );

  const isAuthenticated = useAuth(
    (state) => state.isAuthenticated
  );

  const currentUser = useAuth(
    (state) => state.currentUser
  );

  const error = useAuth(
    (state) => state.error
  );

  const loading = useAuth(
    (state) => state.loading
  );

  const navigate = useNavigate();

  const onLoginSubmit = async (
    userCredObj
  ) => {
    await login(userCredObj);

    // get updated state AFTER login
    const state = useAuth.getState();

    const user = state.currentUser;

    console.log(
      "AFTER LOGIN USER:",
      user
    );

    if (!state.error && user) {
      toast.success(
        "Logged in Successfully"
      );

      const role =
        user?.role?.toUpperCase();

      if (role === "USER") {
        navigate("/user-profile");
      } else if (role === "AUTHOR") {
        navigate("/author-profile");
      } else {
        console.log(
          "Role missing or invalid:",
          role
        );
      }
    }
  };

  useEffect(() => {
    if (
      isAuthenticated &&
      currentUser?.role
    ) {
      const role =
        currentUser.role.toUpperCase();

      if (role === "USER") {
        navigate("/user-profile");
      } else if (role === "AUTHOR") {
        navigate("/author-profile");
      }
    }
  }, [
    isAuthenticated,
    currentUser,
    navigate
  ]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fffaf7] flex items-center justify-center px-6 py-16">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-pink-100 rounded-full blur-3xl opacity-40"></div>

      <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-purple-100 rounded-full blur-3xl opacity-40"></div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md">

        <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">

          {/* HEADER */}
          <div className="mb-10">

            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-gray-200 text-sm text-gray-600 mb-6">
              Welcome back
            </span>

            <h1 className="text-5xl font-semibold tracking-tight text-gray-900 mb-4">
              Login
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed">
              Continue reading and sharing stories.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-500 text-sm p-4 rounded-2xl mb-6">
              {error}
            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={handleSubmit(
              onLoginSubmit
            )}
            className="space-y-6"
          >

            {/* EMAIL */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-3">
                Email
              </label>

              <input
                type="email"
                {...register("email", {
                  required:
                    "Email is required",
                  pattern: {
                    value:
                      /^\S+@\S+$/i,
                    message:
                      "Enter a valid email"
                  }
                })}
                placeholder="Enter your email"
                className={`w-full px-5 py-4 rounded-2xl border bg-white/80 outline-none transition-all ${
                  errors.email
                    ? "border-red-300 focus:ring-2 focus:ring-red-100"
                    : "border-gray-200 focus:ring-2 focus:ring-gray-200"
                }`}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {
                    errors.email
                      .message
                  }
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-3">
                Password
              </label>

              <input
                type="password"
                {...register("password", {
                  required:
                    "Password is required",
                  minLength: {
                    value: 4,
                    message:
                      "Minimum 4 characters"
                  }
                })}
                placeholder="Enter your password"
                className={`w-full px-5 py-4 rounded-2xl border bg-white/80 outline-none transition-all ${
                  errors.password
                    ? "border-red-300 focus:ring-2 focus:ring-red-100"
                    : "border-gray-200 focus:ring-2 focus:ring-gray-200"
                }`}
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {
                    errors.password
                      .message
                  }
                </p>
              )}
            </div>

            {/* FORGOT PASSWORD */}
            <p className="text-right text-sm text-gray-400 hover:text-gray-700 cursor-pointer transition">
              Forgot password?
            </p>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gray-900 text-white font-medium hover:bg-black transition-all disabled:opacity-60"
            >
              {loading
                ? "Authenticating..."
                : "Login"}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-8">

            <div className="flex-1 h-px bg-gray-200"></div>

            <span className="text-gray-400 text-sm">
              or
            </span>

            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* REGISTER */}
          <div className="text-center">

            <p className="text-gray-500 text-sm mb-5">
              Don’t have an account?
            </p>

            <button
              onClick={() =>
                navigate("/register")
              }
              className="px-6 py-3 rounded-2xl bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all"
            >
              Create account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;