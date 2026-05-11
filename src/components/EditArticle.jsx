import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_URL;

function EditArticle({
  article,
  setArticle,
  setIsEditing,
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: article?.title,
      category: article?.category,
      content: article?.content,
    },
  });

  const selectedCategory = watch("category");

  const onSubmit = async (data) => {
    const finalData = {
      articleId: article._id,

      title: data.title,

      category:
        data.category === "Other"
          ? data.customCategory
          : data.category,

      content: data.content,
    };

    try {
      const res = await axios.put(
        `${BASE_URL}/author-api/articles`,
        finalData,
        { withCredentials: true }
      );

      if (res.data.payload) {
        setArticle(res.data.payload);

        setIsEditing(false);

        toast.success(
          "🎉 Article Updated Successfully"
        );
      }
    } catch (err) {
      console.error("Update Error:", err);

      toast.error(
        err.response?.data?.message ||
          "Update failed"
      );
    }
  };

  return (
    <div className="relative overflow-hidden">

      {/* COLOR BLOBS */}
      <div className="absolute top-0 left-0 w-52 h-52 bg-pink-300 rounded-full blur-3xl opacity-20"></div>

      <div className="absolute bottom-0 right-0 w-60 h-60 bg-purple-300 rounded-full blur-3xl opacity-20"></div>

      {/* MAIN CARD */}
      <div className="relative z-10 bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[40px] shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 p-8 text-white">

          <div className="inline-block bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-sm font-semibold mb-5">
            ✨ Creative Editing Mode
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-3">
            Edit Your Story
          </h2>

          <p className="text-white/90 text-lg">
            Refine your ideas and make your article
            even better.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 md:p-10 space-y-8"
        >

          {/* TITLE */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              ✍️ Article Title
            </label>

            <input
              {...register("title", {
                required: true,
              })}
              placeholder="Edit your title..."
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all text-lg"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              🏷️ Category
            </label>

            <select
              {...register("category", {
                required: true,
              })}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all text-lg"
            >
              <option value="Programming">
                Programming
              </option>

              <option value="AI">AI</option>

              <option value="Lifestyle">
                Lifestyle
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

            {/* CUSTOM CATEGORY */}
            {selectedCategory === "Other" && (
              <input
                {...register("customCategory", {
                  required: true,
                })}
                placeholder="Enter custom category..."
                className="mt-4 w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all text-lg"
              />
            )}
          </div>

          {/* CONTENT */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              📖 Story Content
            </label>

            <textarea
              {...register("content", {
                required: true,
              })}
              rows="12"
              placeholder="Edit your content..."
              className="w-full px-5 py-4 rounded-3xl border border-gray-200 bg-white/80 outline-none focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 resize-none transition-all text-lg leading-relaxed"
            />
          </div>

          {/* WRITING TIPS */}
          <div className="bg-gradient-to-r from-pink-100 via-orange-100 to-purple-100 rounded-3xl p-6 border border-white">

            <h3 className="font-black text-xl mb-4">
              💡 Pro Writing Tips
            </h3>

            <div className="space-y-2 text-gray-700">
              <p>• Make your introduction stronger</p>
              <p>• Use shorter readable paragraphs</p>
              <p>• Add emotional storytelling</p>
              <p>• Keep the ending memorable</p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col md:flex-row gap-4 pt-2">

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-5 rounded-3xl bg-black text-white text-lg font-bold hover:scale-[1.02] hover:shadow-2xl transition-all disabled:opacity-60"
            >
              {isSubmitting
                ? "Updating..."
                : "💾 Save Changes"}
            </button>

            <button
              type="button"
              onClick={() =>
                setIsEditing(false)
              }
              className="flex-1 py-5 rounded-3xl bg-white border border-gray-200 text-gray-700 text-lg font-bold hover:bg-gray-100 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditArticle;