import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.push("/profile");
    }
  }, [sessionStatus, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res.error) {
      setError(res.error);
    } else {
      router.push("/profile");
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/profile" });
  };

  if (sessionStatus === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 text-white mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 20a8 8 0 008-8h4c0 6.627-5.373 12-12 12v-4z"
            ></path>
          </svg>
          <p className="mt-4 text-white text-lg font-semibold">
            Loading, please wait...
          </p>
        </div>
      </div>
    );
  }

  return (
    sessionStatus !== "authenticated" && (
      <>
        <Navbar />
        <div className="text-white min-h-[80vh] flex flex-col justify-center items-center px-5 py-4 bg-gradient-radial from-black via-[#000] to-[#63e]">
          <div className="flex justify-center items-center text-center py-1">
            <Link href="/">
              <span className="text-white text-3xl font-semibold hover:text-white transition duration-300">
                <span className="text-blue-400">&lt;</span>
                New
                <span className="text-blue-400">Fashion/&gt;</span>
              </span>
            </Link>
          </div>
          <div className="sm:mx-auto sm:w-full sm:max-w-md md:max-w-lg">
            <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Log in your account
            </h2>
          </div>
          <div className="flex flex-col md:flex-row justify-center md:justify-around w-full max-w-[90vw] h-auto md:h-[60vh] items-center mt-6 md:space-x-6">
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-lg inline-flex h-10 w-full md:w-64 items-center justify-center gap-2 p-3 text-sm hover:bg-blue-300 outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                <img
                  src="https://www.svgrepo.com/show/512317/github-142.svg"
                  alt="GitHub"
                  className="h-[20px] w-[20px]"
                />
                Continue with GitHub
              </button>

              <button
                onClick={handleGoogleLogin}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-lg inline-flex h-10 w-full md:w-64 items-center justify-center gap-2 p-3 text-sm hover:bg-blue-300 outline-none focus:ring-2 focus:ring-[#33398b] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-[20px] w-[20px]"
                />
                Continue with Google
              </button>

              <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-lg inline-flex h-10 w-full md:w-64 items-center justify-center gap-2 p-3 text-sm hover:bg-blue-300 outline-none focus:ring-2 focus:ring-[#000] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                <img
                  src="https://www.svgrepo.com/show/512317/github-142.svg"
                  alt="GitHub"
                  className="h-[20px] w-[20px]"
                />
                Continue with Email
              </button>
            </div>
            <div className="w-full md:w-auto mt-4 md:mt-0">
              <div className="mx-auto w-full max-w-sm lg:w-96">
                <div className="mt-3">
                  <div>
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-6 rounded-md bg-white/20 backdrop-blur-[10px] py-5 px-4 shadow dark:bg-white/10 dark:ring-1 dark:ring-inset dark:ring-white/20"
                    >
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-white"
                        >
                          Email
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 bg-white/10 placeholder:text-white/40 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-white"
                          >
                            Password
                          </label>
                          <div className="text-sm">
                            <Link
                              href="#"
                              className="font-semibold text-indigo-600 hover:text-indigo-500"
                            >
                              Forgot password?
                            </Link>
                          </div>
                        </div>
                        <div className="mt-2">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 bg-white/10 placeholder:text-white/40 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Log in
                        </button>
                      </div>
                      {error && <p className="text-red-500">{error}</p>}
                    </form>
                  </div>
                  <p className="mt-10 text-center text-sm text-white">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/signup"
                      className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  );
};

export default Login;
