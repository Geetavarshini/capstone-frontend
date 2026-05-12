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

  const currentUser = useAuth(
    (state) => state.currentUser
  );

  const [article, setArticle] = useState(
    state?.article || null
  );

  const [isEditing, setIsEditing] =
    useState(false);

  const [commentText, setCommentText] =
    useState("");

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

  const handleToggleStatus = async (
    newStatus
  ) => {
    const action = newStatus
      ? "restore"
      : "delete";

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
          newStatus
            ? "restored"
            : "moved to trash"
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

      toast.success("Comment posted");
    } catch (err) {
      toast.error("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!article)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffaf7]">
        <p className="text-lg text-gray-500">
          Loading article...
        </p>
      </div>
    );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fffaf7] px-6 py-16">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-pink-100 rounded-full blur-3xl opacity-40"></div>

      <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-purple-100 rounded-full blur-3xl opacity-40"></div>

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* ARTICLE CARD */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] overflow-hidden">

          {/* ARTICLE HEADER */}
          <div className="px-8 md:px-12 pt-10 pb-8 border-b border-gray-100">

            <div className="flex flex-wrap items-center gap-3 mb-6">

              <span className="px-4 py-2 rounded-full bg-[#f4f4f5] text-sm text-gray-600">
                {article.category}
              </span>

              {!article.isArticleActive && (
                <span className="px-4 py-2 rounded-full bg-red-50 text-red-500 text-sm">
                  Deleted
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-gray-900 mb-6">
              {article.title}
            </h1>

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-full bg-[#f4f4f5] flex items-center justify-center text-gray-600 font-medium">
                {article.author?.firstName?.charAt(
                  0
                )}
              </div>

              <div>
                <p className="text-gray-900 font-medium">
                  {
                    article.author
                      ?.firstName
                  }{" "}
                  {
                    article.author
                      ?.lastName
                  }
                </p>

                <p className="text-sm text-gray-400">
                  Author
                </p>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="px-8 md:px-12 py-10">

            <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
              {article.content}
            </div>

            {/* AUTHOR ACTIONS */}
            {isAuthor && (
              <div className="flex flex-wrap gap-4 mt-12">

                <button
                  onClick={() =>
                    setIsEditing(true)
                  }
                  className="px-6 py-3 rounded-2xl bg-gray-900 text-white font-medium hover:bg-black transition-all"
                >
                  Edit article
                </button>

                <button
                  onClick={() =>
                    handleToggleStatus(
                      !article.isArticleActive
                    )
                  }
                  className="px-6 py-3 rounded-2xl bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all"
                >
                  {article.isArticleActive
                    ? "Delete"
                    : "Restore"}
                </button>
              </div>
            )}

            {/* EDIT SECTION */}
            {isEditing && (
              <div className="mt-12">
                <EditArticle
                  article={article}
                  setArticle={setArticle}
                  setIsEditing={
                    setIsEditing
                  }
                />
              </div>
            )}

            {/* COMMENTS */}
            <div className="mt-20">

              <div className="mb-8">

                <h2 className="text-3xl font-semibold tracking-tight text-gray-900 mb-3">
                  Comments
                </h2>

                <p className="text-gray-500">
                  Join the conversation and share
                  your thoughts.
                </p>
              </div>

              {/* COMMENT FORM */}
              <form
                onSubmit={handlePostComment}
                className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-[28px] p-6 mb-10"
              >

                <textarea
                  value={commentText}
                  onChange={(e) =>
                    setCommentText(
                      e.target.value
                    )
                  }
                  placeholder="Write a comment..."
                  rows="4"
                  className="w-full rounded-2xl border border-gray-200 bg-white/80 p-5 outline-none focus:ring-2 focus:ring-gray-200 resize-none text-gray-700"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-5 px-6 py-3 rounded-2xl bg-gray-900 text-white font-medium hover:bg-black transition-all disabled:opacity-60"
                >
                  {isSubmitting
                    ? "Posting..."
                    : "Post comment"}
                </button>
              </form>

              {/* COMMENT LIST */}
              {article.comments?.length >
              0 ? (
                <div className="space-y-5">

                  {article.comments.map(
                    (c, idx) => (
                      <div
                        key={idx}
                        className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-[28px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
                      >

                        <div className="flex items-center gap-4 mb-4">

                          <div className="w-11 h-11 rounded-full bg-[#f4f4f5] flex items-center justify-center text-gray-600 font-medium">
                            {c.user?.firstName?.charAt(
                              0
                            ) || "U"}
                          </div>

                          <div>
                            <h3 className="font-medium text-gray-900">
                              {c.user
                                ?.firstName ||
                                "User"}
                            </h3>

                            <p className="text-sm text-gray-400">
                              Community member
                            </p>
                          </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed">
                          {c.comment}
                        </p>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-[28px] p-12 text-center">

                  <h3 className="text-2xl font-medium text-gray-900 mb-3">
                    No comments yet
                  </h3>

                  <p className="text-gray-500">
                    Start the discussion by sharing
                    your thoughts.
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