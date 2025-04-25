'use client';

import { productDefaultValues } from '@/lib/constants';
import { insertProductSchema, updateProductSchema } from '@/lib/validators';
import { Product } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../ui/form';
import slugify from 'slugify';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

const ProductForm = ({
    type,
    product,
    productId
}: {
    type: 'Create' | 'Update';
    product?: Product;
    productId?: string;
}) => {
    const router = useRouter();

    type ProductFormValues =
        | z.infer<typeof insertProductSchema>
        | z.infer<typeof updateProductSchema>;

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(
            type === 'Update' ? updateProductSchema : insertProductSchema
        ),

        defaultValues:
            product && type === 'Update' ? product : productDefaultValues
    });

    return (
        <Form {...form}>
            <form className="space-y-8">
                <div className="flex flex-col gap-5 md:flex-row">
                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({
                            field
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof insertProductSchema>,
                                'name'
                            >;
                        }) => (
                            <FormItem className="w-full flex flex-col items-start">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="enter product name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* slug */}
                    <FormField
                        control={form.control}
                        name="slug"
                        render={({
                            field
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof insertProductSchema>,
                                'slug'
                            >;
                        }) => (
                            <FormItem className="w-full">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            placeholder="enter slug"
                                            {...field}
                                        />
                                        <Button
                                            type="button"
                                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 mt-2"
                                            onClick={() => {
                                                form.setValue(
                                                    'slug',
                                                    slugify(
                                                        form.getValues('name'),
                                                        {
                                                            lower: true
                                                        }
                                                    )
                                                );
                                            }}
                                        >
                                            Generate
                                        </Button>
                                    </div>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-5 md:flex-row">
                    {/* category */}
                    <FormField
                        control={form.control}
                        name="category"
                        render={({
                            field
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof insertProductSchema>,
                                'category'
                            >;
                        }) => (
                            <FormItem className="w-full">
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="enter category"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* brand */}
                    <FormField
                        control={form.control}
                        name="brand"
                        render={({
                            field
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof insertProductSchema>,
                                'brand'
                            >;
                        }) => (
                            <FormItem className="w-full">
                                <FormLabel>Brand</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="enter brand"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-5 md:flex-row">
                    {/* price */}
                    <FormField
                        control={form.control}
                        name="price"
                        render={({
                            field
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof insertProductSchema>,
                                'price'
                            >;
                        }) => (
                            <FormItem className="w-full">
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="enter price"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* stock */}
                    <FormField
                        control={form.control}
                        name="stock"
                        render={({
                            field
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof insertProductSchema>,
                                'stock'
                            >;
                        }) => (
                            <FormItem className="w-full">
                                <FormLabel>Stock</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="enter stock"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/*description */}
                    <div>
                        <Textarea></Textarea>
                    </div>
                </div>
                <div className="upload-field flex flex-col gap-5 md:flex-row">
                    {/* images */}
                </div>
                <div className="upload-field">{/* isFeatured */}</div>
                <div>
                    {/* description */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({
                            field
                        }: {
                            field: ControllerRenderProps<
                                z.infer<typeof insertProductSchema>,
                                'description'
                            >;
                        }) => (
                            <FormItem className="w-full">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="resize-none"
                                        placeholder="enter product description"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div>
                    {/* submit */}
                    <Button
                        type="submit"
                        size="lg"
                        disabled={form.formState.isSubmitting}
                        className="button col-span-2 w-full"
                    >
                        {form.formState.isSubmitting
                            ? 'submitting'
                            : `${type} Product`}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default ProductForm;
