import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthStore/useAuth';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_API_URL;

function AuthorProfile() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = useAuth((state) => state.currentUser);
  const isHydrated = useAuth((state) => state.isHydrated); // ✅ IMPORTANT
  const navigate = useNavigate();

  // ⛔ BLOCK UI UNTIL USER IS READY (NO FLICKER)
  if (!isHydrated || !currentUser) return null;

  useEffect(() => {
    const userId =
      currentUser._id || currentUser.userId || currentUser.id;

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-6">
      
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              🧠 {currentUser.firstName}'s Workspace
            </h1>

            <p className="text-gray-500 mt-2 text-lg">
              Welcome back,{" "}
              <span className="font-semibold">
                {currentUser.firstName}
              </span>
            </p>
          </div>

          <button 
            onClick={() => navigate('/add-article')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all"
          >
            + New Article
          </button>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex flex-col items-center justify-center mt-20 gap-4">
            <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <p className="text-gray-400 animate-pulse">
              Loading your workspace...
            </p>
          </div>
        ) : (
          <>
            {/* EMPTY */}
            {articles.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm">
                <p className="text-gray-400 text-xl font-medium mb-4">
                  No articles yet.
                </p>
                <button
                  onClick={() => navigate('/add-article')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Create your first article
                </button>
              </div>
            ) : (
              /* GRID */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <div 
                    key={article._id} 
                    className={`bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-gray-100 flex flex-col justify-between transition-all group hover:shadow-xl hover:-translate-y-1 ${
                      article.isArticleActive === false
                        ? "opacity-60 grayscale"
                        : ""
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                          {article.category}
                        </span>

                        {article.isArticleActive === false && (
                          <span className="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded font-bold uppercase">
                            Trash
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                        {article.title}
                      </h3>

                      <p className="text-gray-500 text-sm line-clamp-3 mb-6">
                        {article.content}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      
                      <div className="flex items-center gap-2">
                        {/* ✅ ONLY PROFILE IMAGE (NO INITIALS) */}
                        <img 
                          src={currentUser.profileImageUrl}
                          className="w-9 h-9 rounded-full object-cover shadow-sm" 
                          alt="avatar" 
                        />
                        <span className="text-xs text-gray-400">
                          {article.isArticleActive === false ? "Hidden" : "Live"}
                        </span>
                      </div>

                      <button 
                        onClick={() =>
                          navigate(`/article/${article._id}`, {
                            state: { article },
                          })
                        }
                        className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
                      >
                        View →
                      </button>
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

export default AuthorProfile;

