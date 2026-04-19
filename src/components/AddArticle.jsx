import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../AuthStore/useAuth';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

function AddArticle() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { category: "General" }
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
      category: data.category === "Other" ? data.customCategory : data.category,
      isArticleActive: true
    };

    try {
      const res = await axios.post(
        `${BASE_URL}/author-api/articles`,
        finalArticleObj,
        { withCredentials: true }
      );

      if (res.status === 201 || res.status === 200) {
        toast.success("Article Published!");
        setTimeout(() => {
          navigate("/author-profile");
        }, 150);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to create article";
      toast.error(errorMsg);
      if (err.response?.status === 401) navigate("/login");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-6">
      
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-8">
        
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
          ✍️ Create New Story
        </h2>

        <form onSubmit={handleSubmit(onArticleSubmit)} className="space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
              Title
            </label>
            <input 
              type="text" 
              {...register("title", { required: "Title is required" })} 
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-300"
              placeholder="Enter a powerful title..."
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
              Category
            </label>
            <select 
              {...register("category", { required: "Category is required" })} 
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="General">General</option>
              <option value="Programming">Programming</option>
              <option value="Life Stories">Life Stories</option>
              <option value="Travel">Travel</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Custom Category */}
          {selectedCategory === "Other" && (
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                Custom Category
              </label>
              <input 
                type="text" 
                {...register("customCategory", { required: "Enter category" })} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Type your category..."
              />
              {errors.customCategory && (
                <p className="text-red-500 text-xs mt-1">{errors.customCategory.message}</p>
              )}
            </div>
          )}

          {/* Content */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
              Content
            </label>
            <textarea 
              {...register("content", { required: "Content is required" })} 
              rows="8"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all"
              placeholder="Start writing your story..."
            />
            {errors.content && (
              <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>
            )}
          </div>

          {/* Button */}
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold tracking-wide hover:scale-[1.02] hover:shadow-lg transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Publishing...' : '🚀 Publish Article'}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddArticle;

