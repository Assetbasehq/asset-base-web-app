
````
# Asset Base Web App

A modern web application built with **React 19**, **Vite 7**, **Tailwind CSS 4**, and **Bun**. The app leverages modern UI primitives from **Radix UI**, form handling via **React Hook Form**, and icons from **Lucide**. This project follows best practices for performance, DX, and accessibility.

## 🔧 Tech Stack

- **React 19**
- **Vite 7**
- **Tailwind CSS 4**
- **Radix UI** (Label, Separator, Slot)
- **Lucide Icons**
- **React Hook Form**
- **ShadCN-inspired styling** (`class-variance-authority`, `tailwind-merge`)
- **Sonner** for toasts
- **TypeScript** (strict-mode)
- **Bun** as the package manager

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (Ensure Bun is installed: `bun --version`)

### Installation

```bash
bun install
```
````

### Development

```bash
bun run dev
```

### Build for Production

```bash
bun run build
```

### Preview Production Build

```bash
bun run preview
```

### Linting

```bash
bun run lint
```

---

## 🗂️ Project Structure

```
.
├── src/                  # App source code
│   ├── components/       # Shared components
│   ├── pages/            # Route-level components
│   ├── assets/           # Static assets
│   ├── hooks/            # Custom hooks
│   └── lib/              # Utilities and helpers
├── public/               # Static public files
├── tailwind.config.js    # Tailwind config
├── tsconfig.json         # TypeScript config
└── bun.lockb             # Bun lockfile
```

---

## ✨ Features

- ⚡ Fast builds with Vite and Bun
- 🎨 Fully styled using TailwindCSS 4
- ✅ Forms with validation using `react-hook-form`
- 💅 Styled with `class-variance-authority` + `tailwind-merge`
- 🔔 Elegant toast notifications via `sonner`
- 🧠 Modular architecture inspired by ShadCN UI

---

## 🧪 Testing (Coming Soon)

Unit and integration testing setup will be added soon.

---

## 📜 License

This project is **private** and not licensed for public or commercial use unless otherwise specified.

---

## 📍 Notes

- Using Bun over npm or pnpm means blazing fast installs and script runs.
- Remember to periodically update dependencies:

  ```bash
  bun update
  ```

---

## 🙌 Acknowledgments

- [ShadCN UI](https://ui.shadcn.dev/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)

```

```
