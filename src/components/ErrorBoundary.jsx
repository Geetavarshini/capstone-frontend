import { useRouteError, useNavigate } from "react-router";

function ErrorBoundary() {
  const error = useRouteError();

  const navigate = useNavigate();

  // SAFE ERROR HANDLING
  const status = error?.status || "Error";

  const statusText =
    error?.statusText ||
    "Something unexpected happened";

  const data =
    error?.data ||
    "The page you are looking for could not be found.";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fffaf7] flex items-center justify-center px-6 py-16">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-pink-100 rounded-full blur-3xl opacity-40"></div>

      <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-purple-100 rounded-full blur-3xl opacity-40"></div>

      {/* MAIN CARD */}
      <div className="relative z-10 w-full max-w-3xl">

        <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.05)]">

          {/* TOP SECTION */}
          <div className="px-8 md:px-12 pt-12 text-center">

            <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#f4f4f5] text-sm text-gray-600 mb-8">
              Application error
            </span>

            <h1 className="text-6xl md:text-7xl font-semibold tracking-tight text-gray-900 mb-5">
              {status}
            </h1>

            <h2 className="text-3xl font-semibold tracking-tight text-gray-800 mb-6">
              {statusText}
            </h2>

            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
              {typeof data === "string"
                ? data
                : "Something went wrong while loading this page. Please try again or return home."}
            </p>
          </div>

          {/* IMAGE */}
          <div className="px-8 md:px-12 py-12">

            <div className="overflow-hidden rounded-[28px] border border-white shadow-sm">

              <img
                className="w-full object-cover"
                src="https://media.tenor.com/WqGTNFmFqjkAAAAM/saquontroll-saquonjudge26.gif"
                alt="Error Illustration"
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="px-8 md:px-12 pb-12 flex flex-wrap justify-center gap-4">

            <button
              onClick={() => navigate("/")}
              className="px-8 py-4 rounded-2xl bg-gray-900 text-white font-medium hover:bg-black transition-all"
            >
              Go home
            </button>

            <button
              onClick={() =>
                window.location.reload()
              }
              className="px-8 py-4 rounded-2xl bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;