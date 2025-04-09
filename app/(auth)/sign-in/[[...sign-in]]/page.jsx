import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 via-white to-blue-100 overflow-hidden px-4">

      {/* 🔵 Blurry aesthetic background circles */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-300 rounded-full opacity-30 blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 -right-20 w-96 h-96 bg-blue-300 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-pink-300 rounded-full opacity-10 blur-3xl animate-pulse delay-2000"></div>

      {/* Content Card */}
      <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-purple-200">
        <div className="text-center mb-6">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-purple-100 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">Welcome to Mockly AI</h1>
          <p className="mt-2 text-sm text-gray-600">Log in to start practicing smarter, with AI ✨</p>
        </div>
        <SignIn />
        <p className="mt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Mockly AI. All rights reserved.
        </p>
      </div>
    </div>
  );
}
