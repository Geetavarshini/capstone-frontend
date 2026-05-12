import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../AuthStore/useAuth";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

function AddArticle() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { category: "General" },
  });

  const selectedCategory = watch("category");

  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const currentUser = useAuth(
    (state) => state.currentUser
  );

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const onArticleSubmit = async (data) => {
    setIsSubmitting(true);

    const finalArticleObj = {
      title: data.title,
      content: data.content,
      category:
        data.category === "Other"
          ? data.customCategory
          : data.category,
      isArticleActive: true,
    };

    try {
      const res = await axios.post(
        `${BASE_URL}/author-api/articles`,
        finalArticleObj,
        { withCredentials: true }
      );

      if (res.status === 201 || res.status === 200) {
        toast.success("Article Published");

        setTimeout(() => {
          navigate("/author-profile");
        }, 150);
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        "Failed to create article";

      toast.error(errorMsg);

      if (err.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fffaf7] px-6 py-20">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-pink-100 rounded-full blur-3xl opacity-40"></div>

      <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-purple-100 rounded-full blur-3xl opacity-40"></div>

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="mb-14">

          <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-white text-sm text-gray-600 mb-6 shadow-sm">
            Create article
          </span>

          <h1 className="text-5xl font-semibold tracking-tight text-gray-900 leading-tight mb-5">
            Share your thoughts
            with the world.
          </h1>

          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            Write and publish stories, ideas, and
            experiences in a calm and elegant space.
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">

          <form
            onSubmit={handleSubmit(onArticleSubmit)}
            className="space-y-8"
          >

            {/* TITLE */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-3">
                Title
              </label>

              <input
                type="text"
                {...register("title", {
                  required: "Title is required",
                })}
                placeholder="Enter article title"
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
              />

              {errors.title && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* CATEGORY */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-3">
                Category
              </label>

              <select
                {...register("category", {
                  required: "Category is required",
                })}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
              >
                <option value="General">
                  General
                </option>

                <option value="Programming">
                  Programming
                </option>

                <option value="Life Stories">
                  Life Stories
                </option>

                <option value="Travel">
                  Travel
                </option>

                <option value="Health">
                  Health
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            {/* CUSTOM CATEGORY */}
            {selectedCategory === "Other" && (
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Custom category
                </label>

                <input
                  type="text"
                  {...register("customCategory", {
                    required: "Enter category",
                  })}
                  placeholder="Enter custom category"
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                />

                {errors.customCategory && (
                  <p className="text-red-500 text-sm mt-2">
                    {
                      errors.customCategory
                        .message
                    }
                  </p>
                )}
              </div>
            )}

            {/* CONTENT */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-3">
                Content
              </label>

              <textarea
                rows="12"
                {...register("content", {
                  required:
                    "Content is required",
                })}
                placeholder="Start writing..."
                className="w-full px-5 py-4 rounded-3xl border border-gray-200 bg-white/80 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none leading-relaxed transition-all"
              />

              {errors.content && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.content.message}
                </p>
              )}
            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 pt-2">

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 rounded-2xl bg-gray-900 text-white font-medium hover:bg-black transition-all"
              >
                {isSubmitting
                  ? "Publishing..."
                  : "Publish article"}
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/author-profile")
                }
                className="px-8 py-4 rounded-2xl bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddArticle;