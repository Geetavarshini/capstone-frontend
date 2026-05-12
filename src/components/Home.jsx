import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../AuthStore/useAuth';
import { PenSquare, Compass, Users } from 'lucide-react';

function Home() {
  const navigate = useNavigate();

  const isAuthenticated = useAuth(
    (state) => state.isAuthenticated
  );

  const currentUser = useAuth(
    (state) => state.currentUser
  );

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
    <div className="relative overflow-hidden min-h-screen bg-[#faf7f5]">

      {/* SOFT BACKGROUND */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-100 rounded-full blur-3xl opacity-40"></div>

      <div className="absolute top-40 right-0 w-[450px] h-[450px] bg-purple-100 rounded-full blur-3xl opacity-40"></div>

      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-orange-100 rounded-full blur-3xl opacity-30"></div>

      {/* HERO */}
      <section className="relative z-10 pt-28 pb-24 px-6">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}
          <div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-white/60 shadow-sm mb-8">

              <div className="w-2 h-2 rounded-full bg-rose-400"></div>

              <span className="text-sm text-gray-600 font-medium">
                A modern space for thoughtful writing
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-gray-900 leading-[1.05] mb-8">

              Share stories
              <br />

              that people
              <br />

              remember.
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed max-w-xl mb-10">

              Publish articles, explore ideas,
              and connect with readers in a calm,
              beautifully designed writing space.
            </p>

            <div className="flex flex-wrap gap-4">

              <button
                onClick={handleStartWriting}
                className="px-8 py-4 rounded-2xl bg-gray-900 text-white font-medium hover:shadow-xl transition-all"
              >
                {isAuthenticated
                  ? "Open Dashboard"
                  : "Start Writing"}
              </button>

              {!isAuthenticated && (
                <button
                  onClick={() =>
                    navigate("/login")
                  }
                  className="px-8 py-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200 text-gray-700 font-medium hover:bg-white transition-all"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative hidden lg:block">

            <div className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-[36px] shadow-2xl p-8 rotate-[-4deg]">

              <div className="h-52 rounded-[28px] bg-gradient-to-br from-[#fdf2f8] via-[#faf5ff] to-[#fff7ed] mb-6"></div>

              <div className="space-y-4">

                <div className="w-24 h-3 rounded-full bg-gray-200"></div>

                <h3 className="text-2xl font-semibold text-gray-900 leading-snug">
                  The beauty of quiet,
                  thoughtful writing
                </h3>

                <p className="text-gray-500 leading-relaxed">
                  Create meaningful stories and
                  share ideas in a calm modern
                  editorial experience.
                </p>
              </div>
            </div>

            <div className="absolute -bottom-10 -left-10 bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl px-6 py-5">

              <p className="text-sm text-gray-500 mb-1">
                Community Writers
              </p>

              <h4 className="text-2xl font-semibold text-gray-900">
                12K+
              </h4>
            </div>

            <div className="absolute -top-10 right-0 bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl px-6 py-5">

              <p className="text-sm text-gray-500 mb-1">
                Articles Published
              </p>

              <h4 className="text-2xl font-semibold text-gray-900">
                48K+
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 py-24 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-5">
              Designed for modern storytelling
            </h2>

            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              A minimal, distraction-free platform
              for writers and readers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              {
                icon: <PenSquare className="w-5 h-5" />,
                title: "Write Freely",
                desc: "Create articles in a clean and focused environment."
              },
              {
                icon: <Compass className="w-5 h-5" />,
                title: "Discover Ideas",
                desc: "Explore thoughtful stories from different creators."
              },
              {
                icon: <Users className="w-5 h-5" />,
                title: "Build Community",
                desc: "Connect with readers who value meaningful content."
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-[32px] p-8 shadow-lg hover:shadow-2xl transition-all"
              >

                <div className="w-11 h-11 rounded-2xl bg-[#f8f5f2] flex items-center justify-center text-gray-700 mb-6">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
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

          <div className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-[40px] shadow-2xl px-10 py-16 text-center">

            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-6">
              Start sharing your ideas today
            </h2>

            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
              Join a growing community of writers,
              thinkers, and curious readers.
            </p>

            {isAuthenticated && currentUser ? (
              <button
                onClick={handleStartWriting}
                className="px-8 py-4 rounded-2xl bg-gray-900 text-white font-medium hover:shadow-xl transition-all"
              >
                Open Dashboard
              </button>
            ) : (
              <div className="flex justify-center gap-4 flex-wrap">

                <button
                  onClick={() =>
                    navigate("/register")
                  }
                  className="px-8 py-4 rounded-2xl bg-gray-900 text-white font-medium hover:shadow-xl transition-all"
                >
                  Create Account
                </button>

                <button
                  onClick={() =>
                    navigate("/login")
                  }
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