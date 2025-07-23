import React from "react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
// import ScrollToTopButton from "~/Components/ScrollToTop";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="min-h-screen z-20 w-screen overflow-hidden flex flex-col bg-background bg-black">
        <div>
          <Navbar />
        </div>
        <main className="flex-grow">{children}</main>
        <div>
          <Footer />
        </div>
        {/* <ScrollToTopButton /> */}
      </div>
    </>
  );
}
