# Pudim Bakery

A modern web platform for Padaria Pudim—showcasing delicious cakes and puddings, with a simple yet powerful admin dashboard for product management.

---

![Padaria Pudim Screenshot](https://placehold.co/800x400?text=Padaria+Pudim+Screenshot) <!-- Replace with real screenshot! -->

## Features

- 🏠 **Homepage:** Welcome page with bakery info and contact details.
- 🛒 **Product Catalog:** Browse all available cakes and puddings with images and prices.
- 🔐 **Admin Panel:** Secure dashboard for adding, editing, and deleting products.
- ⚡ **Fast & Responsive:** Built with Next.js App Router for optimal performance.
- 🎨 **Modern UI:** Clean, mobile-first design for a great user experience.
- 🌎 **Portuguese Language:** All customer-facing pages are in PT-BR.

---

## Tech Stack

- [Next.js 14+ (App Router)](https://nextjs.org/)
- [React 18+](https://react.dev/)
- [Prisma ORM](https://www.prisma.io/) + [SQLite](https://www.sqlite.org/)
- TypeScript

---

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-username/pudim-bakery.git
cd pudim-bakery
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and adjust as needed.

### 3. Set Up the Database

```bash
npx prisma migrate dev --name init
```

### 4. Run the App

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
pudim-bakery/
  app/           # Main Next.js app (pages, components, styles)
    admin/       # Admin dashboard (login, layout, product management)
    produtos/    # Product catalog
    globals.css  # Global styles
  lib/           # Prisma client
  prisma/        # Prisma schema and migrations
  ...
```

---

## Usage

- **Homepage:** Presents the bakery and contact info.
- **Products:** `/produtos` — View all products.
- **Admin:** `/admin` — Manage products (requires admin login).

### Default Admin Access

> ⚠️ **Note:** This demo uses a basic password login for admin. For real deployments, secure authentication is strongly recommended!

---

## Contributing

Improvements and PRs are welcome! See [areas for improvement](#areas-for-improvement) below.

---

## Areas for Improvement

- Enhance admin authentication security (e.g., JWT, OAuth)
- Move inline styles to CSS modules or styled-components
- Add automated tests (unit, integration, e2e)
- Improve accessibility (a11y) and error feedback
- Add product categories, search, or filters
- Multi-language support (i18n)
- Deployment setups (Vercel, Docker, etc.)
- ...and more!

---

## License

MIT

---

## 🇧🇷 Seção em Português

Bem-vindo ao site da Padaria Pudim! Veja nossos produtos e gerencie-os facilmente no painel administrativo.

### Como rodar localmente

1. Instale dependências: `npm install`
2. Configure o banco: `npx prisma migrate dev --name init`
3. Rode: `npm run dev`

Acesse `http://localhost:3000` no navegador.