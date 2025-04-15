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
