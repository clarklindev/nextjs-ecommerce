'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { ShippingAddress } from '@/types';
import { shippingAddressSchema } from '@/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, ControllerRenderProps, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { shippingAddressDefaultValues } from '@/lib/constants';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ArrowRight, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { updateUserAddress } from '@/lib/actions/user.actions';

const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof shippingAddressSchema>>({
        resolver: zodResolver(shippingAddressSchema),
        defaultValues: address || shippingAddressDefaultValues,
        mode: 'onChange'
    });

    const [isPending, startTransition] = useTransition();

    const onSubmit: SubmitHandler<
        z.infer<typeof shippingAddressSchema>
    > = async (values) => {
        startTransition(async () => {
            const res = await updateUserAddress(values);

            if (!res.success) {
                toast.error(res.message);
                return;
            }

            router.push('/payment-method');
        });
    };

    return (
        <>
            <div className="max-w-md mx-auto space-y-4">
                <h1 className="h2-bold mt-4">Shipping address</h1>
                <p className="text-sm text-muted-foreground">
                    please enter an address for shipping
                </p>
                <Form {...form}>
                    <form
                        method="post"
                        className="space-y-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        {/* fullname */}
                        <div className="flex flex-col md:flex-row gap-5">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({
                                    field
                                }: {
                                    field: ControllerRenderProps<
                                        z.infer<typeof shippingAddressSchema>,
                                        'fullName'
                                    >;
                                }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Full name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter full name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/*address*/}
                        <div className="flex flex-col md:flex-row gap-5">
                            <FormField
                                control={form.control}
                                name="streetAddress"
                                render={({
                                    field
                                }: {
                                    field: ControllerRenderProps<
                                        z.infer<typeof shippingAddressSchema>,
                                        'streetAddress'
                                    >;
                                }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter address"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/*city*/}
                        <div className="flex flex-col md:flex-row gap-5">
                            <FormField
                                control={form.control}
                                name="city"
                                render={({
                                    field
                                }: {
                                    field: ControllerRenderProps<
                                        z.infer<typeof shippingAddressSchema>,
                                        'city'
                                    >;
                                }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter city"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/*postal code*/}
                        <div className="flex flex-col md:flex-row gap-5">
                            <FormField
                                control={form.control}
                                name="postalCode"
                                render={({
                                    field
                                }: {
                                    field: ControllerRenderProps<
                                        z.infer<typeof shippingAddressSchema>,
                                        'postalCode'
                                    >;
                                }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Postal code</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter Postal code"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/*country*/}
                        <div className="flex flex-col md:flex-row gap-5">
                            <FormField
                                control={form.control}
                                name="country"
                                render={({
                                    field
                                }: {
                                    field: ControllerRenderProps<
                                        z.infer<typeof shippingAddressSchema>,
                                        'country'
                                    >;
                                }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Country</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter country"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex-gap-2">
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="cursor-pointer"
                            >
                                {isPending ? (
                                    <Loader className="w-4 h-4 animate-spin" />
                                ) : (
                                    <ArrowRight className="w-4 h-4" />
                                )}{' '}
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    );
};

export default ShippingAddressForm;
