import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import Link from 'next/link';
import { Metadata } from 'next';
import CredentialsSignInForm from './credentials-signin-form';

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { LogoSVG } from '@/components/share/header/logoSVG';

export const metadata: Metadata = {
    title: 'Sign in'
};

const SignInPage = async (props: {
    searchParams: Promise<{ callbackUrl: string }>;
}) => {
    const { callbackUrl } = await props.searchParams;

    const session = await auth(); //server component method to get session

    if (session) {
        return redirect(callbackUrl || '/');
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <Card>
                <CardHeader className="space-y-4">
                    <Link href="/" className="flex-center flex-col gap-1">
                        <LogoSVG />
                    </Link>
                    <CardTitle className="text-center">Sign-in</CardTitle>
                    <CardDescription className="text-center">
                        Sign into your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <CredentialsSignInForm />
                </CardContent>
            </Card>
        </div>
    );
};

export default SignInPage;
