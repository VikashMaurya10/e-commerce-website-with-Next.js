import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { inter, raleway, roboto } from "./font";
import "./globals.css";
import { AuthProvider } from "../context/auth-provider";

export const metadata = {
  title: "Ecommerce website | shop Now",
  description: "This is a store of product",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${raleway.variable} ${inter.variable} `}
      >
        <AuthProvider>
          <Header />
          <main className="min-h-[85vh] font-robo">{children}</main>
          <Footer />
          <ToastContainer autoClose={2000} pauseOnHover />
        </AuthProvider>
      </body>
    </html>
  );
}
