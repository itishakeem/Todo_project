import type { Metadata } from "next";
import "@/styles/globals.css";
import { AuthProvider } from "@/lib/auth-context";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "TaskFlow - Organize Your Life",
  description: "A beautiful, modern todo application designed to help you stay productive and organized",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 min-h-screen">
        <AuthProvider>
          <Navbar />
          <div className="pt-16">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
