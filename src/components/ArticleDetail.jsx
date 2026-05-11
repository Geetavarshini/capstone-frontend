import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../AuthStore/useAuth";
import { toast } from "react-hot-toast";
import axios from "axios";
import EditArticle from "./EditArticle";

const BASE_URL = import.meta.env.VITE_API_URL;

function ArticleDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const currentUser = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(
    state?.article || null
  );

  const [isEditing, setIsEditing] = useState(false);

  const [commentText, setCommentText] = useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

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

    if (
      !window.confirm(
        `Are you sure you want to ${action} this article?`
      )
    )
      return;

    try {
      await axios.patch(
        `${BASE_URL}/author-api/articles/${article._id}/status`,
        { isArticleActive: newStatus },
        { withCredentials: true }
      );

      setArticle((prev) => ({
        ...prev,
        isArticleActive: newStatus,
      }));

      toast.success(
        `Article ${
          newStatus ? "restored" : "moved to trash"
        }`
      );
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

      toast.success("💬 Comment posted");
    } catch (err) {
      toast.error("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!article)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff7f2]">
        <p className="text-2xl font-bold">
          Loading article...
        </p>
      </div>
    );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fff7f2] py-14 px-4">

      {/* BACKGROUND BLOBS */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30"></div>

      <div className="absolute top-40 right-0 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>

      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-300 rounded-full blur-3xl opacity-30"></div>

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* ARTICLE CARD */}
        <div className="bg-white/70 backdrop-blur-2xl rounded-[40px] border border-white/50 shadow-2xl overflow-hidden">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 p-10 text-white">

            <div className="flex flex-wrap gap-3 items-center mb-6">

              <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                {article.category}
              </span>

              {!article.isArticleActive && (
                <span className="bg-red-500 px-4 py-2 rounded-full text-sm font-bold">
                  Deleted
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-5">
              {article.title}
            </h1>

            <p className="text-white/90 text-lg">
              ✍️ By {article.author?.firstName}{" "}
              {article.author?.lastName}
            </p>
          </div>

          {/* CONTENT */}
          <div className="p-8 md:p-10">

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line text-lg">
              {article.content}
            </div>

            {/* AUTHOR ACTIONS */}
            {isAuthor && (
              <div className="flex flex-wrap gap-4 mt-10">

                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 rounded-2xl bg-black text-white font-bold hover:scale-105 transition-all shadow-lg"
                >
                  ✏️ Edit Article
                </button>

                <button
                  onClick={() =>
                    handleToggleStatus(
                      !article.isArticleActive
                    )
                  }
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold hover:scale-105 transition-all shadow-lg"
                >
                  {article.isArticleActive
                    ? "🗑️ Delete"
                    : "♻️ Restore"}
                </button>
              </div>
            )}

            {/* EDIT MODE */}
            {isEditing && (
              <div className="mt-10 bg-gradient-to-r from-pink-50 via-orange-50 to-purple-50 rounded-[32px] p-6">
                <EditArticle
                  article={article}
                  setArticle={setArticle}
                  setIsEditing={setIsEditing}
                />
              </div>
            )}

            {/* COMMENTS SECTION */}
            <div className="mt-16">

              <div className="flex items-center gap-3 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-2xl text-white shadow-lg">
                  💬
                </div>

                <div>
                  <h2 className="text-4xl font-black text-gray-900">
                    Comments
                  </h2>

                  <p className="text-gray-500">
                    Join the conversation
                  </p>
                </div>
              </div>

              {/* COMMENT FORM */}
              <form
                onSubmit={handlePostComment}
                className="bg-gradient-to-r from-pink-50 via-orange-50 to-purple-50 rounded-[32px] p-6 mb-10 border border-white shadow-lg"
              >

                <textarea
                  value={commentText}
                  onChange={(e) =>
                    setCommentText(e.target.value)
                  }
                  placeholder="Share your thoughts..."
                  rows="4"
                  className="w-full rounded-3xl border border-white bg-white/80 p-5 outline-none focus:ring-4 focus:ring-pink-200 resize-none text-lg"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-5 px-8 py-4 rounded-2xl bg-black text-white font-bold hover:scale-105 transition-all shadow-xl disabled:opacity-60"
                >
                  {isSubmitting
                    ? "Posting..."
                    : "🚀 Post Comment"}
                </button>
              </form>

              {/* COMMENT LIST */}
              {article.comments?.length > 0 ? (
                <div className="space-y-6">

                  {article.comments.map((c, idx) => (
                    <div
                      key={idx}
                      className="bg-white/80 backdrop-blur-xl rounded-[28px] p-6 border border-white shadow-lg hover:-translate-y-1 transition-all"
                    >

                      <div className="flex items-center gap-4 mb-4">

                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg">
                          {c.user?.firstName?.charAt(0) ||
                            "U"}
                        </div>

                        <div>
                          <h3 className="font-bold text-gray-900">
                            {c.user?.firstName || "User"}
                          </h3>

                          <p className="text-sm text-gray-400">
                            Community Member
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-700 leading-relaxed">
                        {c.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/70 rounded-[28px] p-10 text-center border border-white shadow-lg">
                  <div className="text-6xl mb-4">✨</div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    No comments yet
                  </h3>

                  <p className="text-gray-500">
                    Be the first one to start the
                    discussion.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;