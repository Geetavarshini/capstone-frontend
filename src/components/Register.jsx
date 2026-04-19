
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

    formData.append("profileImageUrl", profileImageUrl?.[0]);

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
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (res.status === 201 || res.status === 200) {
        navigate("/login");
      }

    } catch (err) {
      const msg =
        err.response?.data?.error ||   // 🔥 important (duplicate email etc.)
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4">

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-gray-100">

        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900">
          🚀 Create Account
        </h2>

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">

          {/* FIRST NAME */}
          <input
            placeholder="First Name"
            {...register("firstName", { required: "First name required" })}
            className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}

          {/* LAST NAME */}
          <input
            placeholder="Last Name"
            {...register("lastName", { required: "Last name required" })}
            className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email required" })}
            className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password required" })}
            className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* ROLE */}
          <select
            {...register("role", { required: "Select role" })}
            className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Role</option>
            <option value="USER">User</option>
            <option value="AUTHOR">Author</option>
          </select>

          {/* IMAGE */}
          <div>
            <input
              type="file"
              {...register("profileImageUrl", { required: "Image required" })}
              onChange={handleImagePreview}
              className="w-full text-sm"
            />
            {fileError && <p className="text-red-500 text-xs">{fileError}</p>}

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-16 h-16 rounded-full mt-2 object-cover"
              />
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:scale-[1.02] hover:shadow-lg transition-all disabled:bg-gray-300"
          >
            {loading ? "Creating..." : "Register"}
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;

