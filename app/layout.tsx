import "./globals.css";
import Header from "../components/Header";
import AuthProvider from "../components/AuthProvider";

export const metadata = {
  title: "Route Right - AI Learning Roadmaps",
  description: "Create personalized learning roadmaps powered by AI"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-gray-900">
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

