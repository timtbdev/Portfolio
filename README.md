<p align="center">
  Simple and minimal portfolio website
</p>

# 💁‍♂️ Introduction

An open source application built using the new router, server components and everything new in Next.js 13.

> **Warning**
> This app is still in progress.

## 👨‍💻 Frontend - [Homepage](https://timtb.dev)

  <img width="1069" alt="Screenshot 2023-05-16 at 3 20 27 PM" src="https://github.com/timtbdev/Portfolio/assets/25026241/cbe64e2a-26ce-49b0-9d82-a60d9901e120">

## 🧰 Backend - [Dashboard](https://timtb.dev/dashboard)

  <img width="1256" alt="Screenshot 2023-05-16 at 3 19 46 PM" src="https://github.com/timtbdev/Portfolio/assets/25026241/45549bc7-045a-4b25-a475-5caf9031939e">

## 🪜 Project structure

````bash
📦 root
├── 🗂️ app                     # NextJs 13 app router directory
│ ├── 🗂️ admin                 # Admin functionality for creating and editing projects and blog posts
│ ├── 🗂️ api                   # CRUD api projects and blog posts (Github API is used)
│ └── 🗂️ blog                  # Blog functionality
│ └── 🗂️ components            # Blog UI components
├── 🗂️ configs                 # Configs
├── 🗂️ lib                     # Utilities
├── 🗂️ posts                   # Blog posts in markdown
├── 🗂️ public                  # Static files for images
├── 🗂️ styles                  # CSS
├── 📝 contentlayer.config.ts  # Contentlayer config
└── 📝 next.config.js          # configuration related to Next.js
```

## 📊 Google Lighthouse performance statistics


## 📚 Features

- New `/app` dir,
- Routing, Layouts, Nested Layouts and Layout Groups
- Data Fetching, Caching and Mutation
- Loading UI
- Route handlers
- Metadata files
- Server and Client Components
- API Routes and Middlewares
- Authentication using [NextAuth.js](https://next-auth.js.org/)
- ORM using [Prisma](https://www.prisma.io/)
- Database on [Vercel/Postgres](https://vercel.com/docs/storage/vercel-postgres/)
- Open Graph Image Generation using [Vercel/Og](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation)
- Image Upload using [ReactDropZone](https://react-dropzone.js.org/) and [Cloud Storage for Firebase](https://firebase.google.com/products/storage)
- UI Components built using [Radix UI](https://www.radix-ui.com/) and [Headless UI](https://headlessui.com/), [Shadcn UI](https://ui.shadcn.com/)
- Pages and blogs are using [MDX](https://mdxjs.com/) and [Contentlayer](https://www.contentlayer.dev/)
- Styled using [Tailwind CSS](https://tailwindcss.com/)
- Icons using [Heroicons](https://heroicons.com/) and [Lucide](https://lucide.dev/)
- Validations using [Zod](https://www.zod.dev)
- Written in [TypeScript](https://www.typescriptlang.org/)

## ⌨️ Code Quality

- [TypeScript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)

## 🙏 Credits

- [Taxonomy](https://github.com/shadcn/taxonomy)
- [Shadcn/UI](https://github.com/shadcn/ui)
- [HeadlessUI](https://headlessui.com)
- [TailwindUI](https://tailwindui.com)
- [UploadThing](https://uploadthing.com/)

## 📈 Miscellaneous

- [Vercel Analytics](https://vercel.com/analytics)

## ⚙️ Running Locally

1. Install dependencies using pnpm:

```sh
pnpm install
````

2. Copy `.env.example` to `.env.local` and update the variables.

```sh
cp .env.example .env.local
```

3. Start the development server:

```sh
pnpm dev
```

## 🙇 Author

- Tim ([@timtbdev](https://twitter.com/timtbdev))

## License

Licensed under the [MIT license](https://github.com/shadcn/taxonomy/blob/main/LICENSE.md).
