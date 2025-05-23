'use client';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUpDefaultValues } from '@/lib/constants';
import { signUpUser } from '@/lib/actions/user.actions';
import { useSearchParams } from 'next/navigation';

const SignUpForm = () => {
    const [data, action] = useActionState(signUpUser, {
        success: false,
        message: ''
    });

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const SignUpButton = () => {
        const { pending } = useFormStatus();

        return (
            <Button
                disabled={pending}
                className="w-full cursor-pointer"
                variant="default"
            >
                {pending ? 'Submitting' : 'sign up'}
            </Button>
        );
    };

    return (
        <form action={action}>
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <div className="space-y-6">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        className="mt-2"
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        defaultValue={signUpDefaultValues.name}
                    />
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        className="mt-2"
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        defaultValue={signUpDefaultValues.email}
                    />
                </div>
                <div>
                    <Label htmlFor="password">password</Label>
                    <Input
                        className="mt-2"
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="password"
                        defaultValue={signUpDefaultValues.password}
                    />
                </div>
                <div>
                    <Label htmlFor="confirmPassword">confirm password</Label>
                    <Input
                        className="mt-2"
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        autoComplete="password"
                        defaultValue={signUpDefaultValues.confirmPassword}
                    />
                </div>
                <div>
                    <SignUpButton />
                </div>

                {data && !data.success && (
                    <div className="text-center text-destructive">
                        {data.message}
                    </div>
                )}
                <div className="text-sm text-center text-muted-foreground">
                    already have an account?{' '}
                    <Link href="/sign-in" target="_self" className="link">
                        Sign in
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default SignUpForm;
