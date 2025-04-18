'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogoSVG } from '@/components/share/header/logoSVG';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <LogoSVG />
            <div className="p-6 w-1/3 rounded-lg shadow-md text-center">
                <h1 className="text-3xl font-bold mb-4">Not found</h1>
                <p className="text-destructive">
                    Could not find requested page
                </p>
                <Button asChild variant="outline" className="mt-4 ml-2">
                    <Link href="/">back to home</Link>
                </Button>
            </div>
        </div>
    );
};

export default NotFoundPage;
