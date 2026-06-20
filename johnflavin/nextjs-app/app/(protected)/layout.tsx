export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <div className="main--inner">{children}</div>;
}
