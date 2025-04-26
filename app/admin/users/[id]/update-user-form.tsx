'use client';

import { insertProductSchema, updateUserSchema } from '@/lib/validators';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { USER_ROLES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { updateUser } from '@/lib/actions/user.actions';

const UpdateUserForm = ({
    user
}: {
    user: z.infer<typeof updateUserSchema>;
}) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof updateUserSchema>>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: user
    });

    const onSubmit = async (values: z.infer<typeof updateUserSchema>) => {
        try {
            const res = await updateUser({
                ...values,
                id: user.id
            });

            if (!res.success) {
                toast.error(res.message);
            }
            toast.success(res.message);
            form.reset();
            router.push('/admin/users');
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    return (
        <Form {...form}>
            <form
                method="POST"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                {/* email */}
                <div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({
                            field
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof updateUserSchema>,
                                'email'
                            >;
                        }) => (
                            <FormItem className="w-full flex flex-col items-start">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={true}
                                        placeholder="enter user email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {/* name */}
                <div>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({
                            field
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof updateUserSchema>,
                                'name'
                            >;
                        }) => (
                            <FormItem className="w-full flex flex-col items-start">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="enter user name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {/* role */}
                <div className="w-full">
                    <FormField
                        control={form.control}
                        name="role"
                        render={({
                            field
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof updateUserSchema>,
                                'role'
                            >;
                        }) => (
                            <FormItem className="w-full flex flex-col items-start">
                                <FormLabel>Role</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value.toString()}
                                >
                                    <FormControl className="w-full">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {USER_ROLES.map((role) => (
                                            <SelectItem key={role} value={role}>
                                                {role.charAt(0).toUpperCase() +
                                                    role.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex-between">
                    <Button
                        type="submit"
                        className="w-full cursor-pointer"
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting
                            ? 'Submitting'
                            : 'Update user'}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default UpdateUserForm;
