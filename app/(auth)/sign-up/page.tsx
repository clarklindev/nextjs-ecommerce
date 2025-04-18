import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { APP_NAME } from '@/lib/constants';
import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import SignUpForm from './sign-up-form';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { LogoSVG } from '@/components/share/header/logoSVG';

export const metadata: Metadata = {
    title: 'Sign up'
};

const SignUpPage = async (props: {
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
                    <CardTitle className="text-center">
                        create account
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your information to sign up
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <SignUpForm />
                </CardContent>
            </Card>
        </div>
    );
};

export default SignUpPage;
