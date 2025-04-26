'use server';
import { prisma } from '@/db/prisma';
// import { convertToPlainObject } from '../utils';
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from '../constants';
import { convertToPlainObject, formatError } from '../utils';
import { revalidatePath } from 'next/cache';
import { insertProductSchema, updateProductSchema } from '../validators';
import { z } from 'zod';

//get latest products
export async function getLatestProducts() {
    const data = await prisma.product.findMany({
        take: LATEST_PRODUCTS_LIMIT,
        orderBy: { createdAt: 'desc' }
    });

    return data.map((product) => {
        return {
            ...product,
            price: product.price.toString(),
            rating: product.rating.toString()
        };
    });

    // return convertToPlainObject(data);
}

//get single product by its slug
export async function getProductBySlug(slug: string) {
    return await prisma.product.findFirst({
        where: { slug: slug }
    });
}

//get single product by its id
export async function getProductById(productId: string) {
    const data = await prisma.product.findFirst({
        where: { id: productId }
    });

    return convertToPlainObject(data);
}

//get all products
export async function getAllProducts({
    // query,
    limit = PAGE_SIZE,
    page
}: // category
{
    query: string;
    limit?: number;
    page: number;
    category?: string;
}) {
    const data = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit
    });

    const dataCount = await prisma.product.count();

    return {
        data,
        totalPages: Math.ceil(dataCount / limit)
    };
}

// deelte a product
export async function deleteProduct(id: string) {
    try {
        const productExists = await prisma.product.findFirst({
            where: { id }
        });

        if (!productExists) {
            throw new Error('product not found');
        }

        await prisma.product.delete({ where: { id } });
        revalidatePath('/admin/products');

        return {
            success: true,
            message: 'product deleted successfully'
        };
    } catch (error) {
        return { success: false, message: formatError(error) };
    }
}

//create a product
export async function createProduct(data: z.infer<typeof insertProductSchema>) {
    try {
        const product = insertProductSchema.parse(data);
        await prisma.product.create({ data: product });

        revalidatePath('/admin/products');
        return {
            success: true,
            message: 'product created successfully'
        };
    } catch (error) {
        return { success: false, message: formatError(error) };
    }
}

//update a product
export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
    try {
        const product = updateProductSchema.parse(data);
        const productExists = await prisma.product.findFirst({
            where: { id: product.id }
        });

        if (!productExists) {
            throw new Error('Product not found');
        }
        await prisma.product.update({
            where: { id: product.id },
            data: product
        });

        revalidatePath('/admin/products');
        return {
            success: true,
            message: 'product updated successfully'
        };
    } catch (error) {
        return { success: false, message: formatError(error) };
    }
}
