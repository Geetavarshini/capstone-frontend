import { useRouteError, useNavigate } from "react-router";

function ErrorBoundary() {
  const error = useRouteError();

  const navigate = useNavigate();

  // SAFE ERROR HANDLING
  const status = error?.status || "Oops";

  const statusText =
    error?.statusText ||
    "Something unexpected happened";

  const data =
    error?.data ||
    "The page you are looking for vanished into the creative universe.";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fff7f2] flex items-center justify-center px-6 py-16">

      {/* BACKGROUND BLOBS */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30"></div>

      <div className="absolute top-40 right-0 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>

      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-300 rounded-full blur-3xl opacity-30"></div>

      {/* MAIN CARD */}
      <div className="relative z-10 w-full max-w-4xl">

        <div className="bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[40px] shadow-2xl overflow-hidden">

          {/* TOP GRADIENT */}
          <div className="bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 p-8 md:p-10 text-white text-center">

            <div className="inline-block bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-sm font-semibold mb-6">
              🚨 Application Error
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-4">
              {status}
            </h1>

            <p className="text-xl text-white/90">
              Oops... this page took a wrong turn.
            </p>
          </div>

          {/* CONTENT */}
          <div className="p-8 md:p-12 text-center">

            {/* GIF */}
            <div className="relative mb-10">

              <img
                className="mx-auto rounded-[32px] w-full max-w-xl shadow-2xl border-4 border-white"
                src="https://media.tenor.com/WqGTNFmFqjkAAAAM/saquontroll-saquonjudge26.gif"
                alt="Error Illustration"
              />

              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-2 rounded-full font-black tracking-widest shadow-xl">
                {status}
              </div>
            </div>

            {/* ERROR TEXT */}
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              {statusText}
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              {typeof data === "string"
                ? data
                : "Something broke while loading this page. Don’t worry — your stories are still safe."}
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap justify-center gap-4">

              <button
                onClick={() => navigate("/")}
                className="px-8 py-4 rounded-2xl bg-black text-white font-bold text-lg hover:scale-105 transition-all shadow-2xl"
              >
                🏠 Go Home
              </button>

              <button
                onClick={() => window.location.reload()}
                className="px-8 py-4 rounded-2xl bg-white border border-gray-200 text-gray-700 font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
              >
                🔄 Try Again
              </button>
            </div>

            {/* EXTRA MESSAGE */}
            <div className="mt-12 bg-gradient-to-r from-pink-100 via-orange-100 to-purple-100 rounded-[28px] p-6 border border-white">

              <h3 className="text-2xl font-black text-gray-900 mb-3">
                ✨ Creative systems can fail too
              </h3>

              <p className="text-gray-700 leading-relaxed">
                Even the best platforms hit unexpected
                issues sometimes. Refresh the page or
                head back home to continue exploring
                amazing stories.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;