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
          "Article updated successfully"
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
    <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">

      {/* HEADER */}
      <div className="mb-10">

        <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#f4f4f5] text-sm text-gray-600 mb-5">
          Edit article
        </span>

        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 mb-4">
          Update your story
        </h2>

        <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
          Make changes to your article and save
          the updated version.
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8"
      >

        {/* TITLE */}
        <div>

          <label className="block text-sm font-medium text-gray-700 mb-3">
            Title
          </label>

          <input
            {...register("title", {
              required: true,
            })}
            placeholder="Edit your title"
            className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-200 transition-all"
          />
        </div>

        {/* CATEGORY */}
        <div>

          <label className="block text-sm font-medium text-gray-700 mb-3">
            Category
          </label>

          <select
            {...register("category", {
              required: true,
            })}
            className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 text-gray-900 outline-none focus:ring-2 focus:ring-gray-200 transition-all"
          >
            <option value="Programming">
              Programming
            </option>

            <option value="AI">
              AI
            </option>

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
              placeholder="Enter custom category"
              className="mt-4 w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-200 transition-all"
            />
          )}
        </div>

        {/* CONTENT */}
        <div>

          <label className="block text-sm font-medium text-gray-700 mb-3">
            Content
          </label>

          <textarea
            {...register("content", {
              required: true,
            })}
            rows="12"
            placeholder="Edit your content"
            className="w-full px-5 py-4 rounded-3xl border border-gray-200 bg-white/80 text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-200 resize-none leading-relaxed transition-all"
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col md:flex-row gap-4 pt-2">

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-4 rounded-2xl bg-gray-900 text-white font-medium hover:bg-black transition-all disabled:opacity-60"
          >
            {isSubmitting
              ? "Updating..."
              : "Save changes"}
          </button>

          <button
            type="button"
            onClick={() =>
              setIsEditing(false)
            }
            className="flex-1 py-4 rounded-2xl bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditArticle;