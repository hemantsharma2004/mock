'use client';
import { useAuth, RedirectToSignIn } from "@clerk/nextjs";
import Header from "./_components/Header";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }) {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <div>
      <Header />

      <div className="mx-5 md:mx-20 lg:mx-36">
        {children}

        <Toaster position="top-right" />
      </div>

    </div>
  );
}
