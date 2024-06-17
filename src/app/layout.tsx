import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Navbar from "@/components/navbar";
import QueryProvider from "@/components/query";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hoc from "@/components/ui/hoc";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Newx | Home",
  description: "Newx booking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" type="image/svg+xml" href="/home.png" />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div id="modal"></div>
          <Navbar />
          <QueryProvider>
            <div className="min-h-screen py-1 px-2">
              <Hoc>{children}</Hoc>
            </div>
          </QueryProvider>
        </ThemeProvider>
        <ToastContainer
          theme="colored"
          stacked
          hideProgressBar
          closeOnClick
          draggable
          transition={Zoom}
          pauseOnHover
          position="top-center"
          limit={3}
        />
      </body>
    </html>
  );
}
