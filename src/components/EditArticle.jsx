import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_API_URL;

function EditArticle({ article, setArticle, setIsEditing }) {
  const { register, handleSubmit, watch, formState: { isSubmitting } } = useForm({
    defaultValues: {
      title: article?.title,
      category: article?.category,
      content: article?.content
    }
  });

  const selectedCategory = watch("category");

  const onSubmit = async (data) => {
    const finalData = {
      articleId: article._id, 
      title: data.title,
      category: data.category === "Other" ? data.customCategory : data.category,
      content: data.content
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
        toast.success("Article Updated Successfully");
      }
    } catch (err) {
      console.error("Update Error:", err);
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-6">
      
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-8">
        
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            ✏️ Edit Story
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Update your article and save changes
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* TITLE */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
              Title
            </label>
            <input 
              {...register("title", { required: true })} 
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Edit your title..."
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
              Category
            </label>
            <select 
              {...register("category", { required: true })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="Programming">Programming</option>
              <option value="AI">AI</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Other">Other</option>
            </select>

            {selectedCategory === "Other" && (
              <input 
                {...register("customCategory", { required: true })} 
                placeholder="Enter custom category..."
                className="mt-3 w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            )}
          </div>

          {/* CONTENT */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
              Content
            </label>
            <textarea 
              {...register("content", { required: true })} 
              rows="10"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
              placeholder="Edit your content..."
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 pt-4">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:scale-[1.02] hover:shadow-lg transition-all disabled:bg-gray-300"
            >
              {isSubmitting ? "Updating..." : "💾 Save Changes"}
            </button>
            
            <button 
              type="button" 
              onClick={() => setIsEditing(false)} 
              className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-semibold hover:bg-gray-200 transition-all"
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

