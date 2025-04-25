'use client';

import { productDefaultValues } from '@/lib/constants';
import { insertProductSchema, updateProductSchema } from '@/lib/validators';
import { Product } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Form } from '../ui/form';

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
                <div className="flex flex-col gap-5 md:Flex-row">
                    {/* Name */}
                    {/* slug */}
                </div>
                <div className="flex flex-col gap-5 md:Flex-row">
                    {/* category */}
                    {/* brand */}
                </div>
                <div className="flex flex-col gap-5 md:Flex-row">
                    {/* price */}
                    {/* stock */}
                </div>
                <div className="upload-field flex flex-col gap-5 md:Flex-row">
                    {/* images */}
                </div>
                <div className="upload-field">{/* isFeatured */}</div>
                <div>{/* description */}</div>
                <div>{/* submit */}</div>
            </form>
        </Form>
    );
};

export default ProductForm;
