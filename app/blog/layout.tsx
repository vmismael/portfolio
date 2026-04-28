import { TopNav } from "@/components/nav/TopNav";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      {children}
    </>
  );
}
