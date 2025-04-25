'use server';
import { prisma } from '@/db/prisma';
// import { convertToPlainObject } from '../utils';
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from '../constants';
import { formatError } from '../utils';
import { revalidatePath } from 'next/cache';

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

//get all products
export async function getAllProducts({
    query,
    limit = PAGE_SIZE,
    page,
    category
}: {
    query: string;
    limit?: number;
    page: number;
    category?: string;
}) {
    const data = await prisma.product.findMany({
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
