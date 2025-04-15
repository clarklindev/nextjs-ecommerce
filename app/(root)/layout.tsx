import Header from '@/components/share/header';
import Footer from '@/components/footer';

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen flex-col">
            <Header />
            <main className="main flex-1 wrapper">{children}</main>
            <Footer />
        </div>
    );
}
