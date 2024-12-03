//src/app/(auth)/signup/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import SignUpForm from "./SignupForm";
import SignupImage from "@/assets/signupImage";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2 font-georgia">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Sign up to The Bookstore</h1>
            <h2 className="w-full text-xl">Input may not show on very small screens and use arrows to scroll</h2>
            <p className="text-muted-foreground">
              A place where even <span className="italic">you</span> can find a book.
            </p>
          </div>
          <div className="space-y-5">
            <SignUpForm />
            <Link href="/login" className="block text-center hover:underline">
              Already have an account? Log in
            </Link>
          </div>
        </div>
        <div className="relative flex items-center justify-center md:w-1/2">
          <div className="absolute top-0 left-0 w-full h-full bg-brown-500 transform rotate-90">
            <div className="absolute top-0 left-0 w-16 h-16 bg-white rounded-full"></div>
          </div>
          <SignupImage />
        </div>
      </div>
    </main>
  );
}
