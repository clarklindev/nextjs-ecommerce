import { z } from 'zod';
import { formatNumberWithDecimal } from './utils';
import { PAYMENT_METHODS } from './constants';

//schemas for inserting products
const currency = z
    .string()
    .refine(
        (value) =>
            /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
        'price must have exactly two decimal places'
    );

export const insertProductSchema = z.object({
    name: z.string().min(3, 'name must be at least 3 characters'),
    slug: z.string().min(3, 'slug must be at least 3 characters'),
    category: z.string().min(3, 'category must be at least 3 characters'),
    brand: z.string().min(3, 'brand must be at least 3 characters'),
    description: z.string().min(3, 'description must be at least 3 characters'),
    stock: z.coerce.number(), //convert to number
    // images: z.array(z.string()).min(1, 'product must have at least one image'),
    // isFeatured: z.boolean(),
    // banner: z.string().nullable(), //nullable -> optional
    price: currency
});

//schema for updating products
export const updateProductSchema = insertProductSchema.extend({
    id: z.string().min(1, 'id is required')
});

//schema for signing users in
export const signInFormSchema = z.object({
    email: z.string().email('invalid email address'),
    password: z.string().min(6, 'password must be atleast 6 characters')
});

// schema for signing up a user
export const signUpFormSchema = z
    .object({
        name: z.string().min(3, 'name must be atleast 3 characters'),
        email: z.string().email('invalid email address'),
        password: z.string().min(6, 'password must be atleast 6 characters'),
        confirmPassword: z
            .string()
            .min(6, 'confirm password must be atleast 6 characters')
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords dont match',
        path: ['confirmPassword'] //show message in this field
    });

//Cart Schemas
export const cartItemSchema = z.object({
    productId: z.string().min(1, 'product is required'),
    name: z.string().min(1, 'name is required'),
    slug: z.string().min(1, 'slug is required'),
    qty: z.number().int().nonnegative('quantity must be a positive numebr'),
    image: z.string().min(1, 'image is required'),
    price: currency
});

export const insertCartSchema = z.object({
    items: z.array(cartItemSchema),
    itemsPrice: currency,
    totalPrice: currency,
    shippingPrice: currency,
    taxPrice: currency,
    sessionCartId: z.string().min(1, 'session cart id is required'),
    userId: z.string().optional().nullable()
});

//schema for shipping address
export const shippingAddressSchema = z.object({
    fullName: z.string().min(3, 'Name must be atleast 3 characters'),
    streetAddress: z.string().min(3, 'Address must be atleast 3 characters'),
    city: z.string().min(3, 'City must be atleast 3 characters'),
    postalCode: z.string().min(3, 'Postal Code must be atleast 3 characters'),
    country: z.string().min(3, 'Country must be atleast 3 characters'),
    lat: z.number().optional(),
    lng: z.number().optional()
});

//schema for payment method
export const paymentMethodSchema = z
    .object({
        type: z.string().min(1, 'Payment method is required')
    })
    .refine((data) => PAYMENT_METHODS.includes(data.type), {
        path: ['type'],
        message: 'Invalid payment method'
    });

//schema for inserting order
export const insertOrderSchema = z.object({
    userId: z.string().min(1, 'User is required'),
    itemsPrice: currency,
    shippingPrice: currency,
    taxPrice: currency,
    totalPrice: currency,
    paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
        message: 'invalid payment method'
    }),
    shippingAddress: shippingAddressSchema
});

//schema for inserting order item
export const insertOrderItemSchema = z.object({
    productId: z.string(),
    slug: z.string(),
    image: z.string(),
    name: z.string(),
    price: currency,
    qty: z.number()
});

export const paymentResultSchema = z.object({
    id: z.string(),
    status: z.string(),
    email_address: z.string(),
    pricePaid: z.string()
});

//schema for updating user profile
export const updateProfileSchema = z.object({
    name: z.string().min(3, 'Name must be atleast 3 characters'),
    email: z.string().min(3, 'email must be atleast 3 characters')
});
