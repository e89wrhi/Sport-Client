interface SearchResultLayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout({ children }: SearchResultLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
    </div>
  );
}
