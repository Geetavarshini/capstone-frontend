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
    <div className="relative overflow-hidden min-h-screen bg-[#fffaf7] text-gray-900">

      {/* SOFT BACKGROUND */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-100 rounded-full blur-3xl opacity-40"></div>

      <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-purple-100 rounded-full blur-3xl opacity-40"></div>

      {/* HERO */}
      <section className="relative z-10 px-6 pt-28 pb-24">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}
          <div>

            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-white text-sm text-gray-600 mb-8 shadow-sm">
              Creative publishing platform
            </span>

            <h1 className="text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-gray-900 mb-8">
              Share stories,
              ideas, and moments
              that matter.
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed max-w-xl mb-10">
              A calm space for writers and readers to
              discover thoughtful articles, meaningful
              ideas, and creative perspectives.
            </p>

            <div className="flex flex-wrap gap-4">

              <button
                onClick={handleStartWriting}
                className="px-8 py-4 rounded-2xl bg-gray-900 text-white font-medium hover:bg-black transition-all shadow-sm"
              >
                {isAuthenticated
                  ? "Go to Dashboard"
                  : "Start Writing"}
              </button>

              {!isAuthenticated && (
                <button
                  onClick={() => navigate("/login")}
                  className="px-8 py-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200 text-gray-700 font-medium hover:bg-white transition-all"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden lg:block relative h-[520px]">

            {/* CARD 1 */}
            <div className="absolute top-0 left-0 w-72 bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">

              <div className="h-44 rounded-3xl bg-[#f8e8e8] mb-5"></div>

              <span className="text-xs text-gray-400 uppercase tracking-[0.2em]">
                Travel
              </span>

              <h3 className="text-xl font-semibold text-gray-900 mt-3 mb-3">
                Quiet mornings in Kyoto
              </h3>

              <p className="text-gray-500 leading-relaxed text-sm">
                Reflections on slow travel, silence,
                and finding beauty in small moments.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="absolute top-24 right-0 w-72 bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">

              <div className="h-44 rounded-3xl bg-[#ece8f8] mb-5"></div>

              <span className="text-xs text-gray-400 uppercase tracking-[0.2em]">
                Technology
              </span>

              <h3 className="text-xl font-semibold text-gray-900 mt-3 mb-3">
                Designing for calm experiences
              </h3>

              <p className="text-gray-500 leading-relaxed text-sm">
                Why modern products should feel
                softer, quieter, and more human.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="absolute bottom-0 left-24 w-72 bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">

              <div className="h-44 rounded-3xl bg-[#f6eddc] mb-5"></div>

              <span className="text-xs text-gray-400 uppercase tracking-[0.2em]">
                Lifestyle
              </span>

              <h3 className="text-xl font-semibold text-gray-900 mt-3 mb-3">
                Building mindful routines
              </h3>

              <p className="text-gray-500 leading-relaxed text-sm">
                Simple daily habits that help create
                clarity, focus, and creativity.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 px-6 py-24">

        <div className="max-w-7xl mx-auto">

          <div className="mb-16">

            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 mb-4">
              Built for thoughtful storytelling
            </h2>

            <p className="text-gray-500 text-lg max-w-2xl">
              Everything you need to write, publish,
              and explore articles in a calm,
              distraction-free experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              {
                title: "Clean writing experience",
                desc: "Focus on your words with a simple and elegant editor."
              },
              {
                title: "Discover meaningful stories",
                desc: "Explore articles from writers across different topics and interests."
              },
              {
                title: "Built for creators",
                desc: "Manage and publish your content with ease."
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all"
              >

                <div className="w-12 h-12 rounded-2xl bg-[#f4f4f5] mb-6"></div>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 pb-24">

        <div className="max-w-5xl mx-auto">

          <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[40px] p-14 text-center shadow-[0_10px_40px_rgba(0,0,0,0.05)]">

            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 mb-5">
              Start sharing your perspective
            </h2>

            <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Write about your experiences, ideas,
              creativity, and thoughts in a space
              designed for modern storytelling.
            </p>

            {isAuthenticated ? (
              <button
                onClick={handleStartWriting}
                className="px-8 py-4 rounded-2xl bg-gray-900 text-white font-medium hover:bg-black transition-all"
              >
                Go to Dashboard
              </button>
            ) : (
              <div className="flex justify-center gap-4 flex-wrap">

                <button
                  onClick={() => navigate("/register")}
                  className="px-8 py-4 rounded-2xl bg-gray-900 text-white font-medium hover:bg-black transition-all"
                >
                  Create Account
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="px-8 py-4 rounded-2xl bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all"
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