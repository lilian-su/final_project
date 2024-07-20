import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./_utils/auth-context"; // Import AuthContextProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lilian Huh - Final Project",
  description: "CPRG-306",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
