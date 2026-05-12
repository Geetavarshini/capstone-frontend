import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthStore/useAuth";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_URL;

function AuthorProfile() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = useAuth(
    (state) => state.currentUser
  );

  const isHydrated = useAuth(
    (state) => state.isHydrated
  );

  const navigate = useNavigate();

  // BLOCK UI UNTIL USER READY
  if (!isHydrated || !currentUser) return null;

  useEffect(() => {
    const userId =
      currentUser._id ||
      currentUser.userId ||
      currentUser.id;

    if (!userId) return;

    const getArticles = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${BASE_URL}/author-api/articles/${userId}`,
          { withCredentials: true }
        );

        if (res.data?.payload) {
          setArticles(res.data.payload);
        }
      } catch (err) {
        toast.error("Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, [currentUser]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fffaf7] px-6 py-16">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-pink-100 rounded-full blur-3xl opacity-40"></div>

      <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-purple-100 rounded-full blur-3xl opacity-40"></div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 mb-16">

          <div className="flex items-center gap-6">

            <img
              src={currentUser.profileImageUrl}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover border border-white shadow-sm"
            />

            <div>

              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-white text-sm text-gray-600 mb-5 shadow-sm">
                Author dashboard
              </span>

              <h1 className="text-5xl font-semibold tracking-tight text-gray-900 mb-3">
                {currentUser.firstName}'s articles
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed">
                Write, manage, and publish your
                stories in one place.
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              navigate("/add-article")
            }
            className="px-8 py-4 rounded-2xl bg-gray-900 text-white font-medium hover:bg-black transition-all w-fit"
          >
            New article
          </button>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">

            <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin mb-5"></div>

            <p className="text-gray-500">
              Loading articles...
            </p>
          </div>
        ) : (
          <>
            {/* EMPTY STATE */}
            {articles.length === 0 ? (
              <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] p-16 text-center shadow-[0_10px_40px_rgba(0,0,0,0.05)]">

                <h2 className="text-4xl font-semibold tracking-tight text-gray-900 mb-5">
                  No articles yet
                </h2>

                <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                  Start writing and publish your
                  first article to share your ideas
                  with readers.
                </p>

                <button
                  onClick={() =>
                    navigate("/add-article")
                  }
                  className="px-8 py-4 rounded-2xl bg-gray-900 text-white font-medium hover:bg-black transition-all"
                >
                  Create article
                </button>
              </div>
            ) : (
              <>
                {/* SECTION HEADER */}
                <div className="flex items-center justify-between flex-wrap gap-4 mb-12">

                  <div>

                    <h2 className="text-4xl font-semibold tracking-tight text-gray-900 mb-3">
                      Your articles
                    </h2>

                    <p className="text-gray-500 text-lg">
                      Manage your published content
                    </p>
                  </div>

                  <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl px-6 py-4 shadow-sm">

                    <p className="text-3xl font-semibold text-gray-900">
                      {articles.length}
                    </p>

                    <p className="text-sm text-gray-400">
                      Total articles
                    </p>
                  </div>
                </div>

                {/* ARTICLES GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                  {articles.map((article) => (
                    <div
                      key={article._id}
                      className={`bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all ${
                        article.isArticleActive ===
                        false
                          ? "opacity-60"
                          : ""
                      }`}
                    >

                      <div className="p-7 flex flex-col justify-between h-full">

                        <div>

                          {/* CATEGORY */}
                          <div className="flex items-center justify-between mb-6">

                            <span className="px-4 py-2 rounded-full bg-[#f4f4f5] text-sm text-gray-600">
                              {article.category}
                            </span>

                            {!article.isArticleActive && (
                              <span className="px-3 py-1 rounded-full bg-red-50 text-red-500 text-xs">
                                Hidden
                              </span>
                            )}
                          </div>

                          {/* TITLE */}
                          <h3 className="text-2xl font-semibold tracking-tight text-gray-900 leading-snug mb-4">
                            {article.title}
                          </h3>

                          {/* CONTENT */}
                          <p className="text-gray-500 leading-relaxed line-clamp-4 mb-8">
                            {article.content}
                          </p>
                        </div>

                        {/* FOOTER */}
                        <div className="flex items-center justify-between pt-5 border-t border-gray-100">

                          <div className="flex items-center gap-3">

                            <img
                              src={
                                currentUser.profileImageUrl
                              }
                              alt="avatar"
                              className="w-10 h-10 rounded-full object-cover"
                            />

                            <div>

                              <p className="text-sm font-medium text-gray-800">
                                {
                                  currentUser.firstName
                                }
                              </p>

                              <p className="text-xs text-gray-400">
                                {article.isArticleActive
                                  ? "Published"
                                  : "Hidden"}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              navigate(
                                `/article/${article._id}`,
                                {
                                  state: {
                                    article,
                                  },
                                }
                              )
                            }
                            className="px-5 py-3 rounded-2xl bg-gray-900 text-white text-sm font-medium hover:bg-black transition-all"
                          >
                            Read
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AuthorProfile;