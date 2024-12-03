//src/app/(auth)/login/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import LoginImage from "@/assets/loginImage";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <h1 className="text-center text-3xl font-bold w-full">Login to The Bookstore</h1>
           <h2 className="w-full text-xl">Input may not show on very small screens</h2>
          <div className="space-y-5">
            <LoginForm />
            <Link href="/signup" className="block text-center text-primary hover:underline">
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </div>
        <LoginImage />
      </div>
    </main>
  );
};