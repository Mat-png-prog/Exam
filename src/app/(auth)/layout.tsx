//src/app/(auth)/layout.tsx
import { Metadata } from "next";
import { validateRequest } from "../auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: {
    template: "The BookStore | Auth | %s",
    default: "Auth |The BookStore"
  },
};
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (user) redirect("/");

  return <>{children}</>;
}