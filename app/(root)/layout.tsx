export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
     <div className="flex h-screen flex-col">
        <div className="main flex-1 wrapper">
            {children}
        </div>
     </div>
    );
  }