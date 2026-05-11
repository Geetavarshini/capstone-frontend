import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../AuthStore/useAuth";

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
    <div className="relative overflow-hidden min-h-screen bg-[#fff7f2] text-gray-900">

      {/* BACKGROUND BLOBS */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute top-40 right-0 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-300 rounded-full blur-3xl opacity-30"></div>

      {/* HERO */}
      <section className="relative z-10 pt-24 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <div>
            <span className="inline-block bg-black text-white px-5 py-2 rounded-full text-sm font-semibold mb-6">
              ✨ Creative Article Platform
            </span>

            <h1 className="text-6xl lg:text-7xl font-black leading-tight mb-6">
              Share your
              <span className="block bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 text-transparent bg-clip-text">
                ideas with the world
              </span>
            </h1>

            <p className="text-lg text-gray-600 max-w-xl mb-10 leading-relaxed">
              Discover inspiring stories, publish your thoughts,
              and connect with a colorful community of creators.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleStartWriting}
                className="px-8 py-4 rounded-2xl bg-black text-white font-bold hover:scale-105 transition-all shadow-xl"
              >
                {isAuthenticated ? "Go to Dashboard" : "Start Writing"}
              </button>

              {!isAuthenticated && (
                <button
                  onClick={() => navigate("/login")}
                  className="px-8 py-4 rounded-2xl bg-white border border-gray-200 font-semibold hover:bg-gray-100 transition"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>

          {/* RIGHT SIDE ARTICLE CARDS */}
          <div className="relative h-[500px] hidden lg:block">

            <div className="absolute top-0 left-10 bg-white p-6 rounded-3xl shadow-2xl w-72 rotate-[-8deg] hover:rotate-0 transition-all">
              <div className="h-40 rounded-2xl bg-gradient-to-r from-pink-400 to-orange-300 mb-4"></div>
              <h3 className="font-bold text-xl mb-2">Travel Stories</h3>
              <p className="text-gray-500 text-sm">
                Explore amazing experiences from around the globe.
              </p>
            </div>

            <div className="absolute top-32 right-0 bg-white p-6 rounded-3xl shadow-2xl w-72 rotate-[8deg] hover:rotate-0 transition-all">
              <div className="h-40 rounded-2xl bg-gradient-to-r from-purple-400 to-indigo-300 mb-4"></div>
              <h3 className="font-bold text-xl mb-2">Tech & AI</h3>
              <p className="text-gray-500 text-sm">
                Read modern ideas shaping the future.
              </p>
            </div>

            <div className="absolute bottom-0 left-24 bg-white p-6 rounded-3xl shadow-2xl w-72 rotate-[-5deg] hover:rotate-0 transition-all">
              <div className="h-40 rounded-2xl bg-gradient-to-r from-yellow-300 to-pink-300 mb-4"></div>
              <h3 className="font-bold text-xl mb-2">Lifestyle</h3>
              <p className="text-gray-500 text-sm">
                Daily inspiration, habits, wellness & creativity.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">
              Why creators love us 💜
            </h2>

            <p className="text-gray-600 text-lg">
              Everything designed for modern storytellers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              {
                icon: "✍️",
                title: "Write Freely",
                desc: "Create beautiful articles with ease."
              },
              {
                icon: "🚀",
                title: "Grow Fast",
                desc: "Reach readers who love your content."
              },
              {
                icon: "🌎",
                title: "Global Community",
                desc: "Connect with writers from everywhere."
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-lg p-10 rounded-[32px] border border-white shadow-xl hover:-translate-y-2 transition-all"
              >
                <div className="text-5xl mb-5">{item.icon}</div>

                <h3 className="text-2xl font-bold mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">

          <div className="bg-black text-white rounded-[40px] p-14 text-center shadow-2xl">

            <h2 className="text-5xl font-black mb-6">
              Your story deserves readers ✨
            </h2>

            <p className="text-gray-300 text-lg mb-10">
              Start writing today and build your creative presence online.
            </p>

            {isAuthenticated ? (
              <button
                onClick={handleStartWriting}
                className="bg-white text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
              >
                Go to Dashboard
              </button>
            ) : (
              <div className="flex justify-center gap-4 flex-wrap">
                <button
                  onClick={() => navigate("/register")}
                  className="bg-white text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
                >
                  Create Account
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="border border-gray-500 px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-black transition"
                >
                  Sign In
                </button>
              </div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;