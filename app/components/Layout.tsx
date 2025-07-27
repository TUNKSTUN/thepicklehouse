import React from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen h-dvh z-50 flex flex-col ">
      <Navbar />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
}
