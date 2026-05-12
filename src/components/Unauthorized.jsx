import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

const Unauthorized = ({ delay = 5000 }) => {
  console.log("unauthorized");

  const navigate = useNavigate();

  const location = useLocation();

  // Get redirectTo from state
  const redirectTo =
    location.state?.redirectTo ||
    "/login";

  console.log("redirect", redirectTo);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(redirectTo, {
        replace: true,
      });
    }, delay);

    return () =>
      clearTimeout(timer);
  }, [
    navigate,
    redirectTo,
    delay
  ]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fffaf7] flex items-center justify-center px-6 py-16">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-pink-100 rounded-full blur-3xl opacity-40"></div>

      <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-purple-100 rounded-full blur-3xl opacity-40"></div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-2xl">

        <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] p-10 md:p-14 shadow-[0_10px_40px_rgba(0,0,0,0.05)] text-center">

          <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#f4f4f5] text-sm text-gray-600 mb-8">
            Access restricted
          </span>

          <h1 className="text-6xl font-semibold tracking-tight text-gray-900 mb-5">
            403
          </h1>

          <h2 className="text-3xl font-semibold tracking-tight text-gray-800 mb-6">
            Unauthorized access
          </h2>

          <p className="text-lg text-gray-500 leading-relaxed max-w-xl mx-auto mb-10">
            You don’t have permission to
            access this page. You’ll be
            redirected shortly.
          </p>

          {/* LOADER */}
          <div className="flex justify-center mb-8">

            <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-700 rounded-full animate-spin"></div>
          </div>

          {/* BUTTON */}
          <button
            onClick={() =>
              navigate(redirectTo, {
                replace: true,
              })
            }
            className="px-8 py-4 rounded-2xl bg-gray-900 text-white font-medium hover:bg-black transition-all"
          >
            Go now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;