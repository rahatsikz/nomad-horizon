import { AuthLayoutCard } from "@/components/ui/Cards";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthLayoutCard>{children}</AuthLayoutCard>;
}
