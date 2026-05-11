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
    <div className="relative min-h-screen overflow-hidden bg-[#fff7f2] p-6 md:p-10">

      {/* BACKGROUND BLOBS */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30"></div>

      <div className="absolute top-40 right-0 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>

      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-300 rounded-full blur-3xl opacity-30"></div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HERO HEADER */}
        <div className="bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 rounded-[40px] p-8 md:p-12 shadow-2xl text-white mb-12">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            {/* LEFT */}
            <div className="flex items-center gap-6">

              <img
                src={currentUser.profileImageUrl}
                alt="profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-2xl"
              />

              <div>
                <div className="inline-block bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-sm font-semibold mb-4">
                  ✨ Creative Workspace
                </div>

                <h1 className="text-4xl md:text-5xl font-black mb-2">
                  {currentUser.firstName}'s Studio
                </h1>

                <p className="text-white/90 text-lg">
                  Write, manage, and publish your
                  creative stories.
                </p>
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={() =>
                navigate("/add-article")
              }
              className="bg-black text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-2xl"
            >
              ✍️ New Article
            </button>
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex flex-col items-center justify-center mt-24">

            <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mb-6"></div>

            <p className="text-xl font-semibold text-gray-500 animate-pulse">
              Loading your creative space...
            </p>
          </div>
        ) : (
          <>
            {/* EMPTY STATE */}
            {articles.length === 0 ? (
              <div className="bg-white/70 backdrop-blur-xl rounded-[40px] p-16 text-center border border-white shadow-2xl">

                <div className="text-8xl mb-6">
                  ✨
                </div>

                <h2 className="text-4xl font-black text-gray-900 mb-4">
                  No stories yet
                </h2>

                <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
                  Start your writing journey and
                  share your first amazing article
                  with the world.
                </p>

                <button
                  onClick={() =>
                    navigate("/add-article")
                  }
                  className="bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-2xl"
                >
                  🚀 Create First Article
                </button>
              </div>
            ) : (
              <>
                {/* SECTION TITLE */}
                <div className="flex items-center justify-between mb-10 flex-wrap gap-4">

                  <div>
                    <h2 className="text-5xl font-black text-gray-900 mb-2">
                      📚 Your Articles
                    </h2>

                    <p className="text-gray-500 text-lg">
                      Manage and explore your
                      published content
                    </p>
                  </div>

                  <div className="bg-white/70 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-lg border border-white">
                    <span className="text-3xl font-black text-gray-900">
                      {articles.length}
                    </span>

                    <p className="text-gray-500 text-sm">
                      Total Articles
                    </p>
                  </div>
                </div>

                {/* ARTICLES GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                  {articles.map((article, idx) => (
                    <div
                      key={article._id}
                      className={`group relative overflow-hidden rounded-[36px] bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 ${
                        article.isArticleActive ===
                        false
                          ? "opacity-60 grayscale"
                          : ""
                      }`}
                    >

                      {/* TOP GRADIENT */}
                      <div
                        className={`h-3 ${
                          idx % 3 === 0
                            ? "bg-gradient-to-r from-pink-500 to-orange-400"
                            : idx % 3 === 1
                            ? "bg-gradient-to-r from-purple-500 to-indigo-400"
                            : "bg-gradient-to-r from-yellow-400 to-pink-400"
                        }`}
                      ></div>

                      <div className="p-7 flex flex-col justify-between h-full">

                        <div>

                          {/* CATEGORY */}
                          <div className="flex justify-between items-center mb-6">

                            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 text-xs font-bold uppercase tracking-wide text-purple-700">
                              {article.category}
                            </span>

                            {!article.isArticleActive && (
                              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
                                Trash
                              </span>
                            )}
                          </div>

                          {/* TITLE */}
                          <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-pink-600 transition">
                            {article.title}
                          </h3>

                          {/* CONTENT */}
                          <p className="text-gray-600 leading-relaxed line-clamp-4 mb-8">
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
                              className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-md"
                            />

                            <div>
                              <p className="font-semibold text-sm text-gray-800">
                                {
                                  currentUser.firstName
                                }
                              </p>

                              <p className="text-xs text-gray-400">
                                {article.isArticleActive
                                  ? "🟢 Live"
                                  : "⚫ Hidden"}
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
                            className="bg-black text-white px-5 py-3 rounded-2xl font-bold hover:scale-105 transition-all shadow-lg"
                          >
                            Read →
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