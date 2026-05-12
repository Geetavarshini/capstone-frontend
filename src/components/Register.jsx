import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router';

const BASE_URL = import.meta.env.VITE_API_URL;

console.log(import.meta.env.VITE_API_URL);

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const [preview, setPreview] =
    useState(null);

  const [fileError, setFileError] =
    useState(null);

  const navigate = useNavigate();

  const onFormSubmit = async (
    newUser
  ) => {
    setLoading(true);

    setError(null);

    const formData = new FormData();

    let {
      role,
      profileImageUrl,
      ...userObj
    } = newUser;

    Object.keys(userObj).forEach(
      (key) => {
        formData.append(
          key,
          userObj[key]
        );
      }
    );

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

    if (
      !file.type.startsWith("image/")
    ) {
      setFileError(
        "Only images allowed"
      );

      return;
    }

    setPreview(
      URL.createObjectURL(file)
    );

    setFileError(null);
  };

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
              Create account
            </span>

            <h1 className="text-5xl font-semibold tracking-tight text-gray-900 mb-4">
              Register
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed">
              Join the platform and start sharing
              your stories and ideas.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-500 p-4 rounded-2xl mb-6 text-sm">
              {error}
            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={handleSubmit(
              onFormSubmit
            )}
            className="space-y-6"
          >

            {/* FIRST NAME */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-3">
                First name
              </label>

              <input
                placeholder="Enter first name"
                {...register(
                  "firstName",
                  {
                    required:
                      "First name required",
                  }
                )}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 outline-none focus:ring-2 focus:ring-gray-200 transition-all"
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

              <label className="block text-sm font-medium text-gray-700 mb-3">
                Last name
              </label>

              <input
                placeholder="Enter last name"
                {...register(
                  "lastName",
                  {
                    required:
                      "Last name required",
                  }
                )}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 outline-none focus:ring-2 focus:ring-gray-200 transition-all"
              />
            </div>

            {/* EMAIL */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-3">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter email"
                {...register("email", {
                  required:
                    "Email required",
                })}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 outline-none focus:ring-2 focus:ring-gray-200 transition-all"
              />
            </div>

            {/* PASSWORD */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-3">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter password"
                {...register(
                  "password",
                  {
                    required:
                      "Password required",
                  }
                )}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 outline-none focus:ring-2 focus:ring-gray-200 transition-all"
              />
            </div>

            {/* ROLE */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-3">
                Role
              </label>

              <select
                {...register("role", {
                  required:
                    "Select role",
                })}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 outline-none focus:ring-2 focus:ring-gray-200 transition-all"
              >
                <option value="">
                  Select role
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

              <label className="block text-sm font-medium text-gray-700 mb-3">
                Profile image
              </label>

              <div className="bg-white/60 border border-gray-200 rounded-3xl p-5">

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
                  className="w-full text-sm text-gray-500"
                />

                {fileError && (
                  <p className="text-red-500 text-sm mt-3">
                    {fileError}
                  </p>
                )}

                {preview && (
                  <div className="flex justify-center mt-6">

                    <img
                      src={preview}
                      alt="preview"
                      className="w-24 h-24 rounded-full object-cover border border-gray-200"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gray-900 text-white font-medium hover:bg-black transition-all disabled:opacity-60"
            >
              {loading
                ? "Creating account..."
                : "Create account"}
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

          {/* LOGIN */}
          <div className="text-center">

            <p className="text-gray-500 text-sm mb-5">
              Already have an account?
            </p>

            <button
              onClick={() =>
                navigate("/login")
              }
              className="px-6 py-3 rounded-2xl bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;