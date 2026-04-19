import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../AuthStore/useAuth';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import EditArticle from './EditArticle';

const BASE_URL = import.meta.env.VITE_API_URL;

function ArticleDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const currentUser = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(state?.article || null);
  const [isEditing, setIsEditing] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (state?.article) {
      setArticle(state.article);
    }
  }, [state]);

  const isAuthor =
    currentUser?._id === article?.author?._id ||
    currentUser?.id === article?.author?._id;

  const handleToggleStatus = async (newStatus) => {
    const action = newStatus ? "restore" : "delete";
    if (!window.confirm(`Are you sure you want to ${action} this article?`)) return;
    
    try {
      await axios.patch(
        `${BASE_URL}/author-api/articles/${article._id}/status`,
        { isArticleActive: newStatus },
        { withCredentials: true }
      );

      setArticle(prev => ({ ...prev, isArticleActive: newStatus }));
      toast.success(`Article ${newStatus ? "restored" : "moved to trash"}`);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setIsSubmitting(true);

    try {
      const commentBody = {
        user: currentUser._id,
        articleId: article._id,
        comment: commentText,
      };

      const res = await axios.post(
        `${BASE_URL}/user-api/articles`,
        commentBody,
        { withCredentials: true }
      );

      setArticle(res.data.payload);
      setCommentText("");
      toast.success("Comment posted");
    } catch (err) {
      toast.error("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!article) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-10 px-4">
      
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        
        {/* HEADER */}
        <div className="mb-6">
          <span className="text-xs font-bold bg-blue-100 text-blue-600 px-3 py-1 rounded-full uppercase tracking-wide">
            {article.category}
          </span>

          <h1 className="text-4xl font-extrabold text-gray-900 mt-4 leading-tight">
            {article.title}
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            By {article.author?.firstName} {article.author?.lastName}
          </p>
        </div>

        {/* CONTENT */}
        <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-line mb-10">
          {article.content}
        </div>

        {/* AUTHOR ACTIONS */}
        {isAuthor && (
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Edit
            </button>

            <button
              onClick={() => handleToggleStatus(!article.isArticleActive)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              {article.isArticleActive ? "Delete" : "Restore"}
            </button>
          </div>
        )}

        {/* EDIT MODE */}
        {isEditing && (
          <EditArticle
            article={article}
            setArticle={setArticle}
            setIsEditing={setIsEditing}
          />
        )}

        {/* COMMENTS */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments</h2>

          {/* COMMENT FORM */}
          <form onSubmit={handlePostComment} className="mb-6">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {isSubmitting ? "Posting..." : "Post Comment"}
            </button>
          </form>

          {/* COMMENT LIST */}
          {article.comments?.length > 0 ? (
            <div className="space-y-4">
              {article.comments.map((c, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm font-semibold text-gray-700">
                    {c.user?.firstName || "User"}
                  </p>
                  <p className="text-gray-600 text-sm">{c.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;

