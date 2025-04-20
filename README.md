    ```sh

npx shadcn@latest init

````

```sh
npx shadcn@latest add button
````

```sh
pnpm i lucide-react
```

-   Next Themes

```sh
pnpm i next-themes
```

-   Dropdown menu

```sh
npx shadcn@latest add dropdown-menu
```

-   Sheet

```sh
npx shadcn@latest add sheet
```

-   card

```sh
npx shadcn@latest add card
```

## 04. The environment

-   prettier
-   eslint (microsoft)
-   prisma (prisma)
-   simple react snippets (burke holland)
-   javascript es6 (charalampos karypidis)
-   markdown preview enhanced (yiyi wang)

## 19. PostgreSQL & Prisma Setup

### Vercel Storage

-   serverless oostgres -> neon
    -   choose region
    -   choose plan
    -   choose name

### prisma

-   vscode extension: `prisma`

```sh
pnpm i -D prisma @prisma/client
```

### create a schema file

```sh
npx prisma init
```

-   IT ADDS TO .env
    DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
-   replace with vercel storage -> neon generated DATABASE_URL string

## 20. Prisma Models & Migrations

### prisma models/schema

-   https://www.prisma.io/docs/orm/prisma-schema/data-model/models

-   prisma/schema.prisma

```prisma
model Product {
  id String @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name String
  slug String @unique(map: "product_slug_idx")
  category String
  images String[]
  brand String
  description String
  stock Int
  price Decimal @default(0) @db.Decimal(12,2)
  rating Decimal @default(0) @db.Decimal(3,2)
  numReviews Int @default(0)
  isFeatured Boolean @default(false)
  banner String?
  createdAt DateTime @default(now()) @db.Timestamp(6)
}
```

### step1 - generate prisma client

-   @6min

```sh
npx prisma generate
```

### step2 - migration

-   add to db the `Product` table
-   run migration: here we called it 'init'
-   creates db and runs it

```sh
npx prisma migrate dev --name init
```

### step3 - check the db

```sh
npx prisma studio
```

-   Prisma Studio is up on http://localhost:5555

## 21. Seed Sample data

-   db/seed.ts

```sh
npx tsx ./db/seed
```

## 23. Zod Validation & Type Inference

-   @ 2min50sec install zod

```sh
npm i zod
```

-   validation schemas (lib/validators.ts)

```ts
import { z } from 'zod';
import { formatNumberWithDecimal } from './utils';

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
    images: z.array(z.string()).min(1, 'product must have at least one image'),
    isFeatured: z.boolean(),
    banner: z.string().nullable(), //nullable -> optional
    price: currency
});
```

-   type/index.ts
-   bring in the types from insertProductSchema with
    `z.infer<typeof insertProductSchema>`

```ts
import { z } from 'zod';
import { insertProductSchema } from '@/lib/validators';

export type Product = z.infer<typeof insertProductSchema> & {
    id: string;
    rating: string;
    createdAt: Date;
};
```

### use `import { Product } from '@/types';`

-   components/share/product/product-card.tsx

```ts
import { Product } from '@/types';

const ProductCard = ({ product }: { product: Product }) => {
    //...
};
```

-   components/share/product/product-list.tsx

```ts
import ProductCard from './product-card';
import { Product } from '@/types';

const ProductList = ({
    data,
    title,
    limit
}: {
    data: Product[];
    title: string;
    limit?: number;
}) => {
    const limitedData = limit ? data.slice(0, limit) : data;

    return (
        <div className="my-10">
            <h2 className="h2-bold mb-4">{title}</h2>
            {data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {limitedData.map((product: Product, index: number) => (
                        <ProductCard key={product.slug} product={product} />
                    ))}
                </div>
            ) : (
                <div>
                    <p>no products found</p>
                </div>
            )}
        </div>
    );
};

export default ProductList;
```

-   then in app/(root)/page.tsx

```ts
'use server';
import { PrismaClient } from '@/lib/generated/prisma';
// import { convertToPlainObject } from '../utils';
import { LATEST_PRODUCTS_LIMIT } from '../contants';

//get latest products
export async function getLatestProducts() {
    const prisma = new PrismaClient();

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
```

## 24. serverless environment config

```sh
npm i @neondatabase/serverless @prisma/adapter-neon ws
```

```sh
npm i -D @types/ws bufferutil
```

-   `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../lib/generated/prisma"
  previewFeatures = ["driverAdapters"]
}
```

-   whenever we edit this file, we need to regenerate the client

```sh
npx prisma generate
```

25. product details page

-   TODO: create action that will get slug from url and fetch data depending on
    slug
-   lib/actions/product.actions.ts

```ts
export async function getProductBySlug(slug: string) {
    return await prisma.product.findFirst({
        where: { slug: slug }
    });
}
```

-   install shadcn badge

```sh
npx shadcn@latest add badge
```

26. product images component

-   components/shared/product/

---

# Section 4 - Authentication with Next Auth

## 29. intro

-   https://authjs.dev/getting-started/adapters/prisma

## 30. User related models

-   copy from models ->
    https://authjs.dev/getting-started/adapters/prisma#schema -> PostgreSQL

```prisma
//prisma/schema-postgres.prisma

model User {}

model Account {}

model Session {}

model VerificationToken{}
```

-   because we added new models we have to regenerate our prisma client

```sh
npx prisma generate
```

```sh
npx prisma migrate dev --name add_user_based_tables
```

```sh
npx prisma studio
```

## 31. seed user data

-   seed sample data with users `db/sample-data.ts`
-   password should be hashed

```sh
npm i bcrypt-ts-edge
```

```ts
//db/sample-data.ts
import { hashSync } from 'bcrypt-ts-edge';

const sampleData = {
    users: [
        {
            name: 'John',
            email: 'admin@example.com',
            password: hashSync('123456', 10),
            role: 'admin'
        },
        {
            name: 'Jane',
            email: 'user@example.com',
            password: hashSync('123456', 10),
            role: 'user'
        }
    ],
```

```ts
//db/seed.ts
import { PrismaClient } from '@prisma/client';
import sampleData from './sample-data';

async function main() {
    const prisma = new PrismaClient();
    await prisma.product.deleteMany();
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.verificationToken.deleteMany();
    await prisma.user.deleteMany();

    await prisma.product.createMany({ data: sampleData.products });
    await prisma.user.createMany({ data: sampleData.users });

    console.log('Database seeded successfully');
}

main();
```

## seed database

```sh
npx tsx ./db/seed
```

```sh
npx prisma studio
```

## 32. Next Auth setup

-   generate a secret to sign JWT / session
-   lessons use credentials provider (email/password)
-   lessons use next-auth v5 (beta)

## older docs (this is following course lessons)

-   [next-auth.js](https://next-auth.js.org/configuration/options#nextauth_secret)

## authentication

### credentials

-   https://authjs.dev/getting-started/authentication/credentials

---

## Connections

### providers

-   https://authjs.dev/getting-started/providers/credentials

### adapter

-   https://authjs.dev/getting-started/adapters/prisma

-   note we using next-auth v5

```sh
npm i next-auth@beta
```

```sh
npm i @auth/prisma-adapter
```

### generate secret

```sh
openssl rand -base64 32
```

-   set as NEXTAUTH_SECRET

-   env variables we need to add.

    -   NEXTAUTH_SECRET=
    -   NEXTAUTH_URL="http://localhost:3000"
    -   NEXTAUTH_URL_INTERNAL="http://localhost:3000"

---

## newer docs

-   [auth.js](https://authjs.dev/getting-started/installation?framework=Next.js)

```sh
npm i next-auth@beta
```

### generate secret

```sh
npx auth secret
```

## 33. Next Auth Catch all Api Route

-   `app/api/auth/[...nextauth]/route.ts`

## 36. Credentials Sign in form

```sh
npx shadcn@latest add label input
```

## 37. Hook Up Sign In Form

-   hooks useActionState / useFormStatus

-   login with credentials db/sample-data.ts
-   see session: `http://localhost:3000/api/auth/session`

## 38. Callback URL redirect

<img
src='exercise_files/38-callbackUrl-redirect.png'
alt='38-callbackUrl-redirect.png'
width=600
/>

-   if user has the callback url, should redirect user to that page

-   https://www.udemy.com/course/nextjs-ecommerce-course/learn/lecture/47560379#questions/22871887

-   signIn() function handles the redirect to callbackUrl internally, IF you
    pass it in
-   signIn() (from NextAuth) -> Detects callbackUrl and redirects
-   Official Docs Confirm:
-   signIn() will redirect to the URL specified by callbackUrl if no redirect:
    false is provided. (From NextAuth.js documentation)
-   The redirect to callbackUrl is built into NextAuth’s signIn() behavior.

## 39. User Button & Sign out

-   we copy the env variables to vercel

```
NEXTAUTH_SECRET="3GFiN8N4oF5YWgyq11/8DCUZsLjIfs3aTrsZKKCZVX4=" # Added by `npx auth`. Read more: https://cli.authjs.dev
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
```

-   note: vercel build errors happen if you do not add prefix `https://` or
    `http://`

-   TODO: add the logged-in User button
-   TODO: ability to sign out

-   components/shared/header/user-button.tsx
-   put in components/shared/header/menu.tsx

---

# Section 05. Add To Cart

## 46. add to cart component

-   Toast Component

```sh
npx shadcn@latest add toast
```

## 47. session cart ID cookie

-   TODO: when we come to the site, it'll create this session cart ID, and
    generate a cookie (UUID value)
-   then can use that in our action later to connect the user to their cart
    (whether logged in or not)

-   auth.ts
-   authorized() -> invoked when a user needs authorization using middleware
-   setup middleware (function that runs between request/response) to use auth
    function, which will run on every request

## 48. get item from cart

-   to add an item to cart,

    -   we have to get user
    -   get product that we are adding from db

-   if not logged in, user id will be `undefined`

```
┌─────────────────┬────────────────────────────────────────┐
│ (index)         │ Values                                 │
├─────────────────┼────────────────────────────────────────┤
│ session cart id │ '3e2807b9-3c42-4442-8c15-4f940c7f7ee7' │
│ user id         │ '7f1047c6-75b1-4b36-aa83-3082fea16653' │
└─────────────────┴────────────────────────────────────────┘
```

### using the cart

-   if they're logged in (there is a userId) -> we can get the cart by that...
-   if they're not logged in -> get cart by sessionCartId and cookie

```ts
//lib/actions/cart.actions.ts

export async function getMyCart() {
    //check for the cart cookie
    const sessionCartId = (await cookies()).get('sessionCartId')?.value;
    if (!sessionCartId) {
        throw new Error('Cart sessioin not found');
    }

    //get session and user id
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    //get user cart from database
    const cart = await prisma.cart.findFirst({
        where: userId ? { userId: userId } : { sessionCartId: sessionCartId }
    });
}
```

## 49. Price Calc & Add To Database

## 50. Handle Quantity & Multiple Products

-   adding same product should update quantity and not add new item to cart

## 51. Remove Cart Action

## 52. Dynamic Cart Button

## 53. Smooth UI With useTransition Hook

---

# Section 06. Cart & Shipping Pages

## 54. Section Intro

<img
src='exercise_files/54-shopping-cart.png'
alt='54-shopping-cart.png'
width=600
/>

<img
src='exercise_files/54-shipping-address.png'
alt='54-shipping-address.png'
width=600
/>

## 55. Cart Page

## 56. ShadCN UI Table

```sh
npx shadcn@latest add table
```

## 57. Subtotal Card

## 58. Shipping Address Zod Schema & Page

-   user enters address
-   if users data is in database, it will be pre-populated
-   `react-hook-form` package

## 59. Shipping Address & Form

```sh
npm i react-hook-form @hookform/resolvers
```

-   https://ui.shadcn.com/docs/components/form#create-a-form-schema
-   https://ui.shadcn.com/docs/components/form#build-your-form

```sh
npx shadcn@latest add form
```

## 60. Update User Address

## 61. Checkout Steps Component

-   form steps

1. user login
2. shipping address
3. payment method
4. place order

## 62. persist session cart

## 63. Protecting Paths

-   https://authjs.dev/getting-started/session-management/protecting
-   https://www.udemy.com/course/nextjs-ecommerce-course/learn/lecture/47571607#questions/22806241/
