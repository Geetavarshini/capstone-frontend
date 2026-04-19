
import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthStore/useAuth';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

function UserProfile() {
  const currentUser = useAuth((state) => state.currentUser);
  const isHydrated = useAuth((state) => state.isHydrated); // ✅ IMPORTANT

  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // ⛔ BLOCK UI UNTIL USER IS READY (NO FLICKER / NO EMPTY NAME)
  if (!isHydrated || !currentUser) return null;

  const fetchArticles = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${BASE_URL}/user-api/articles`,
        { withCredentials: true }
      );

      if (res.data?.payload) {
        setArticles(res.data.payload);
      }
    } catch (err) {
      toast.error("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleReadMore = (article) => {
    navigate(`/article/${article._id}`, { state: { article } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-6">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">
            📚 {currentUser.firstName}'s Dashboard
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Welcome back, <span className="font-semibold">{currentUser.firstName}</span>
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex flex-col items-center justify-center mt-20 gap-4">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <p className="text-gray-400">Loading articles...</p>
          </div>
        ) : (
          <>
            {/* EMPTY STATE */}
            {articles.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <p className="text-gray-400 text-lg">
                  No articles available
                </p>
              </div>
            ) : (

              /* ARTICLES GRID */
              <div className="grid gap-6 md:grid-cols-2">
                {articles.map((article) => (
                  <div
                    key={article._id}
                    className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
                    onClick={() => handleReadMore(article)}
                  >
                    <span className="text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wide">
                      {article.category}
                    </span>

                    <h2 className="text-xl font-semibold text-gray-900 mt-3 mb-2">
                      {article.title}
                    </h2>

                    <p className="text-gray-500 text-sm line-clamp-3 mb-4">
                      {article.content}
                    </p>

                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>
                        {article.author?.firstName}
                      </span>
                      <span className="text-blue-600 font-semibold">
                        Read →
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            )}
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfile;

