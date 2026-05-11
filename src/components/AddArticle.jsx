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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentUser = useAuth((state) => state.currentUser);

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
        toast.success("🎉 Article Published!");

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
    <div className="relative min-h-screen overflow-hidden bg-[#fff7f2] flex items-center justify-center px-6 py-20">

      {/* BACKGROUND BLOBS */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30"></div>

      <div className="absolute top-40 right-0 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>

      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-300 rounded-full blur-3xl opacity-30"></div>

      {/* MAIN CARD */}
      <div className="relative z-10 w-full max-w-3xl">

        <div className="bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[40px] shadow-2xl overflow-hidden">

          {/* TOP HEADER */}
          <div className="bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 p-10 text-white">

            <div className="inline-block bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-sm font-semibold mb-6">
              ✨ Creative Writing Space
            </div>

            <h1 className="text-5xl font-black mb-4 leading-tight">
              Create Your Story
            </h1>

            <p className="text-white/90 text-lg max-w-xl">
              Share your thoughts, experiences, and creativity
              with readers around the world.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onArticleSubmit)}
            className="p-8 md:p-10 space-y-8"
          >

            {/* TITLE */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                ✍️ Article Title
              </label>

              <input
                type="text"
                {...register("title", {
                  required: "Title is required",
                })}
                placeholder="Enter a catchy title..."
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 focus:outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all text-lg"
              />

              {errors.title && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                🏷️ Select Category
              </label>

              <select
                {...register("category", {
                  required: "Category is required",
                })}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all text-lg"
              >
                <option value="General">General</option>
                <option value="Programming">Programming</option>
                <option value="Life Stories">Life Stories</option>
                <option value="Travel">Travel</option>
                <option value="Health">Health</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* CUSTOM CATEGORY */}
            {selectedCategory === "Other" && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  🎨 Custom Category
                </label>

                <input
                  type="text"
                  {...register("customCategory", {
                    required: "Enter category",
                  })}
                  placeholder="Type your custom category..."
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all text-lg"
                />

                {errors.customCategory && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.customCategory.message}
                  </p>
                )}
              </div>
            )}

            {/* CONTENT */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                📖 Your Story
              </label>

              <textarea
                rows="10"
                {...register("content", {
                  required: "Content is required",
                })}
                placeholder="Start writing something amazing..."
                className="w-full px-5 py-4 rounded-3xl border border-gray-200 bg-white/80 focus:outline-none focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 resize-none transition-all text-lg leading-relaxed"
              />

              {errors.content && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.content.message}
                </p>
              )}
            </div>

            {/* WRITING TIPS */}
            <div className="bg-gradient-to-r from-pink-100 via-orange-100 to-purple-100 rounded-3xl p-6 border border-white">

              <h3 className="font-bold text-lg mb-3">
                💡 Writing Tips
              </h3>

              <ul className="space-y-2 text-gray-700">
                <li>• Use an eye-catching title</li>
                <li>• Keep paragraphs short and readable</li>
                <li>• Tell authentic stories</li>
                <li>• Add emotion and personality</li>
              </ul>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 rounded-3xl bg-black text-white text-lg font-bold hover:scale-[1.02] hover:shadow-2xl transition-all disabled:opacity-60"
            >
              {isSubmitting
                ? "Publishing..."
                : "🚀 Publish Article"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddArticle;