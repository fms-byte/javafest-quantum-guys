"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthProvider } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
}

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { isAuthenticated, forgotPassword } = useAuthProvider();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/feed");
    }
  }, [isAuthenticated, router]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitted(true);
    const response = await forgotPassword(data.email);
    if (response.success) {
      setIsSuccess(true);
    }
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Forgot your password?
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>
          {!isSubmitted && !isSuccess ? (
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    type="email"
                    className={`appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                      errors.email ? "border-red-400" : ""
                    }`}
                    placeholder="Email address"
                    {...register("email", {
                      required: "Email address is required",
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Send reset link
                </button>
              </div>
            </form>
          ) : (
            isSuccess && (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Reset link sent
                    </h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>
                        We've sent a password reset link to your email address.
                        Please check your inbox and follow the instructions to
                        reset your password.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
          <div className="text-center">
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Return to login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
