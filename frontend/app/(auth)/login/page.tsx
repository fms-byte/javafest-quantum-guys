"use client";
import Link from "next/link";
import { useAuthProvider } from "@/lib/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HashLoader } from "react-spinners";

interface FormData {
  username: string;
  password: string;
}

export default function LoginPage() {
  const { loading, login, isAuthenticated, checkAuth } = useAuthProvider();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggingIn(true);
    if (isAuthenticated) {
      router.push("/feed");
    }
    setIsLoggingIn(false);
  }, [isAuthenticated, router]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen mx-auto">
        <HashLoader color="#6366F1" size={50} />
      </div>
    );
  }

  const onSubmit = async (data: FormData) => {
    setIsLoggingIn(true);
    try {
      await login(data.username, data.password);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      {isLoggingIn ? (
        <div className="flex items-center justify-center h-screen mx-auto">
          <HashLoader color="#6366F1" size={50} />
        </div>
      ) : (
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 rounded-md shadow-md p-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Log in to your account
                </h2>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-6"
              >
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md -space-y-px">
                  <div className="mb-4">
                    <label htmlFor="email-address" className="sr-only">
                      Username or Email
                    </label>
                    <input
                      id="username"
                      type="username"
                      className={`appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                        errors.username ? "border-red-400" : ""
                      }`}
                      placeholder="Username or Email"
                      {...register("username", {
                        required: "Username or Email is required",
                      })}
                    />
                    {errors.username && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.username.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className={`appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                        errors.password ? "border-red-400" : ""
                      }`}
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message:
                            "Password must be at least 6 characters long",
                        },
                      })}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <div className="text-sm">
                    <Link
                      href="/forgot-password"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? "Logging in..." : "Log in"}
                  </button>
                </div>
              </form>
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
