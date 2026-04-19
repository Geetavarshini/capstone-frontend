
import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../AuthStore/useAuth';

function Home() {
  const navigate = useNavigate();
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const currentUser = useAuth((state) => state.currentUser);

  
  const handleStartWriting = () => {
    if (!isAuthenticated || !currentUser) {
      navigate("/register");
      return;
    }

    if (currentUser?.role === "AUTHOR") {
      navigate("/author-profile");
    } else {
      navigate("/user-profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">

      {/* HERO */}
      <section className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <span className="inline-block text-sm font-semibold text-blue-600 bg-blue-100 px-4 py-1 rounded-full mb-6">
              A space for real voices
            </span>

            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-8">
              Write. Read. <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Connect.
              </span>
            </h1>

            <p className="text-lg text-gray-500 mb-10 max-w-xl">
              Share your stories, ideas, and insights with readers who care about meaningful content.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleStartWriting}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:scale-105 hover:shadow-lg transition-all"
              >
                {isAuthenticated ? "Go to Dashboard" : "Get Started"}
              </button>

              {!isAuthenticated && (
                <button
                  onClick={() => navigate("/login")}
                  className="px-8 py-3 bg-white border border-gray-200 text-gray-900 font-semibold rounded-xl hover:bg-gray-50 transition"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Built for creators & readers
          </h2>
          <p className="text-gray-500 mb-12">
            Everything you need to write and explore content.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Author Dashboard",
                desc: "Write and manage articles easily.",
                color: "blue"
              },
              {
                title: "Secure System",
                desc: "Protected with authentication and roles.",
                color: "purple"
              },
              {
                title: "Community",
                desc: "Engage through comments and reading.",
                color: "green"
              }
            ].map((f, i) => (
              <div key={i} className="bg-white/70 backdrop-blur-md p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition">
                <div className={`w-10 h-10 bg-${f.color}-100 text-${f.color}-600 rounded-lg flex items-center justify-center mb-4`}>
                  ⭐
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">How it works</h2>
          <p className="text-gray-500 mb-12">Start in 3 simple steps</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Create an account",
              "Explore or write content",
              "Engage with the community"
            ].map((step, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border">
                <span className="text-blue-600 font-bold text-xl">0{i+1}</span>
                <h3 className="font-semibold mt-2">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Ready to share your story?
          </h2>

          {isAuthenticated && currentUser ? (
            <>
              <p className="text-gray-500 mb-6">
                Welcome back, {currentUser?.firstName}
              </p>
              <button
                onClick={handleStartWriting}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Go to Dashboard
              </button>
            </>
          ) : (
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => navigate("/register")}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Create Account
              </button>
              <button
                onClick={() => navigate("/login")}
                className="bg-white border px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

export default Home;

