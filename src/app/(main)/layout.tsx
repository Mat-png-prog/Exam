//src/app/(main)/layout.tsx

import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SessionProvider from "./SessionProvider";
import { validateRequest } from "../auth";


export const metadata: Metadata = {
  title: {
    template: "The BookStore |  %s",
    default: "The BookStore"
  },
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, session } = await validateRequest();
  const userCount = user ? 1 : 0;

  return (
    <SessionProvider value={{ user, session: session || undefined, userCount }}>
      <html lang="en">
      <body className="bg">
        <Navbar/>
        {children}
      </body>
    </html>
  </SessionProvider>
  );
}

