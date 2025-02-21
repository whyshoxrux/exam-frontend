import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./storeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "E-Commerce",
  description: "E-Commerce shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable}  antialiased`}>
        <StoreProvider>
          <Navbar />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
