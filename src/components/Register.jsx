import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router';

const BASE_URL = import.meta.env.VITE_API_URL;
console.log(import.meta.env.VITE_API_URL);

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileError, setFileError] = useState(null);

  const navigate = useNavigate();

  const onFormSubmit = async (newUser) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();

    let { role, profileImageUrl, ...userObj } = newUser;

    Object.keys(userObj).forEach((key) => {
      formData.append(key, userObj[key]);
    });

    formData.append(
      "profileImageUrl",
      profileImageUrl?.[0]
    );

    try {
      let url =
        role === "AUTHOR"
          ? `${BASE_URL}/author-api/users`
          : `${BASE_URL}/user-api/users`;

      const res = await axios.post(
        url,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      if (
        res.status === 201 ||
        res.status === 200
      ) {
        navigate("/login");
      }
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Registration failed";

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleImagePreview = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFileError("Only images allowed");
      return;
    }

    setPreview(URL.createObjectURL(file));

    setFileError(null);
  };

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
              ✨ Join The Community
            </div>

            <h2 className="text-5xl font-black mb-4">
              Register
            </h2>

            <p className="text-white/90 text-lg">
              Start sharing your creativity today
            </p>
          </div>

          {/* FORM */}
          <div className="p-8">

            {/* ERROR */}
            {error && (
              <div className="bg-red-100 border border-red-200 text-red-600 p-4 rounded-2xl mb-6 text-sm">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit(onFormSubmit)}
              className="space-y-5"
            >

              {/* FIRST NAME */}
              <div>

                <label className="block text-sm font-bold text-gray-700 mb-3">
                  👤 First Name
                </label>

                <input
                  placeholder="Enter first name..."
                  {...register("firstName", {
                    required:
                      "First name required",
                  })}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all text-lg"
                />

                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-2">
                    {
                      errors.firstName
                        .message
                    }
                  </p>
                )}
              </div>

              {/* LAST NAME */}
              <div>

                <label className="block text-sm font-bold text-gray-700 mb-3">
                  👤 Last Name
                </label>

                <input
                  placeholder="Enter last name..."
                  {...register("lastName", {
                    required:
                      "Last name required",
                  })}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all text-lg"
                />

              </div>

              {/* EMAIL */}
              <div>

                <label className="block text-sm font-bold text-gray-700 mb-3">
                  📧 Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter email..."
                  {...register("email", {
                    required:
                      "Email required",
                  })}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all text-lg"
                />

              </div>

              {/* PASSWORD */}
              <div>

                <label className="block text-sm font-bold text-gray-700 mb-3">
                  🔒 Password
                </label>

                <input
                  type="password"
                  placeholder="Enter password..."
                  {...register("password", {
                    required:
                      "Password required",
                  })}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 outline-none focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all text-lg"
                />

              </div>

              {/* ROLE */}
              <div>

                <label className="block text-sm font-bold text-gray-700 mb-3">
                  ✨ Select Role
                </label>

                <select
                  {...register("role", {
                    required:
                      "Select role",
                  })}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all text-lg"
                >
                  <option value="">
                    Select Role
                  </option>

                  <option value="USER">
                    User
                  </option>

                  <option value="AUTHOR">
                    Author
                  </option>
                </select>

              </div>

              {/* IMAGE */}
              <div>

                <label className="block text-sm font-bold text-gray-700 mb-3">
                  🖼️ Profile Image
                </label>

                <div className="bg-gradient-to-r from-pink-50 via-orange-50 to-purple-50 border border-white rounded-3xl p-5">

                  <input
                    type="file"
                    {...register(
                      "profileImageUrl",
                      {
                        required:
                          "Image required",
                      }
                    )}
                    onChange={
                      handleImagePreview
                    }
                    className="w-full text-sm"
                  />

                  {fileError && (
                    <p className="text-red-500 text-sm mt-3">
                      {fileError}
                    </p>
                  )}

                  {preview && (
                    <div className="flex justify-center mt-5">

                      <img
                        src={preview}
                        alt="preview"
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-3xl bg-black text-white text-lg font-bold hover:scale-[1.02] hover:shadow-2xl transition-all disabled:opacity-60"
              >
                {loading
                  ? "Creating..."
                  : "🚀 Create Account"}
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

            {/* LOGIN TEXT */}
            <div className="text-center">

              <p className="text-gray-500 text-sm mb-4">
                Already have an account?
              </p>

              <button
                onClick={() =>
                  navigate("/login")
                }
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 text-white font-bold hover:scale-105 transition-all shadow-xl"
              >
                🔐 Login
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;