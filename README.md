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

## Vercel Storage

-   serverless oostgres -> neon
    -   choose region
    -   choose plan
    -   choose name

## prisma

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

## prisma models/schema

-   https://www.prisma.io/docs/orm/prisma-schema/data-model/models

-   prisma/schema.prisma
-   run locally

### step1 - generate prisma client

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
