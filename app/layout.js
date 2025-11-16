import "../styles/globals.css";
import Header from "../components/Header";

export const metadata = {
  title: "StudentNeedy - AI Tools for Students",
  description: "Multifunctional AI tools for students",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {/* <main className="min-h-screen container mx-auto p-6"> */}
          {children}
        {/* </main> */}
      </body>
    </html>
  );
}
