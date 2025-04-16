'use server';
import { prisma } from '@/db/prisma';
// import { convertToPlainObject } from '../utils';
import { LATEST_PRODUCTS_LIMIT } from '../contants';

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
