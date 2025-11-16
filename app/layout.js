import "../styles/globals.css";
import Header from "../components/Header";

export const metadata = {
  title: "Student AI Hub",
  description: "Multifunctional AI tools for students",
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
