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
import CredentialsSignInForm from './credentials-signin-form';
export const metadata: Metadata = {
    title: 'Sign in'
};

const SignInPage = () => {
    return (
        <div className="w-full max-w-md mx-auto">
            <Card>
                <CardHeader className="space-y-4">
                    <Link href="/" className="flex-center flex-col gap-1">
                        <Image
                            src="/images/mankind.svg"
                            width={60}
                            height={60}
                            alt={`${APP_NAME} logo`}
                            priority={true}
                        />
                        <Image
                            src="/images/logo.svg"
                            width={100}
                            height={100}
                            alt={`${APP_NAME} logo text`}
                            priority={true}
                        />
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
