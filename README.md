```sh
npx shadcn@latest init
```

```sh
npx shadcn@latest add button
```

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
