import QueryProvider from "@/components/QueryProvider";
import { Toaster } from "react-hot-toast";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <div className="w-full h-screen flex items-center justify-center padding-container">
        {children}
      </div>
      <Toaster />
    </QueryProvider>
  );
}
