//src/app/(main)/layout.tsx

import type { Metadata } from "next";
import Navbar from "./Navbar";
import SessionProvider from "./SessionProvider";
import { validateRequest } from "../auth";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateRequest();

  if (!session.user) redirect("/login");

  return (
    <SessionProvider value={session}>
      <html lang="en">
      <body className="bg">
        <Navbar/>
        {children}
      </body>
    </html>
  </SessionProvider>
  );
}