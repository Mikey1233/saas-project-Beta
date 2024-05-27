import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import ClientProviders from "@/components/ClientProviders";

import "./globals.css";
import FirebaseAuthProvider from "./FirebaseAuthProvider";
import SubscriptionProvider from "@/SubscriptionProvider";
import {Toaster} from '@/components/ui/toaster'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat with Anyone",
  description: "Chat with Anyone, Anywhere",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProviders>
      <html lang="en">
        <body className="flex flex-col min-h-screen">
          <FirebaseAuthProvider>
            <SubscriptionProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Header />

                {children}
                <Toaster/>
              </ThemeProvider>
            </SubscriptionProvider>
          </FirebaseAuthProvider>
        </body>
      </html>
    </ClientProviders>
  );
}
