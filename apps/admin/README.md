# Admin Portal - Sport App

The Admin Portal is a dedicated internal application for managing the Sport App platform. It equips administrators with the necessary tools to efficiently oversee football matches, broadcast live events, and configure platform settings.

## 🎯 Features

- **Match Management**: Create, update, edit, and organize upcoming and live football matches.
- **Live Event Tracking**: Log and broadcast real-time events (e.g., goals, cards, substitutions) to automatically update the main web app via WebSocket integration.
- **Platform Analytics**: Monitor platform statistics, usage metrics, and match interactions.
- **Secure Access**: Protected routes with role-based authentication and secure session management.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v15)
- **UI Components**: Shared `@sport/ui` components based on [Radix UI](https://www.radix-ui.com/).
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Forms & Data Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/v5)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

Because this application is part of a Turborepo workspace, it is recommended to run installation and core commands from the root directory. However, you can also operate it individually.

1. Navigate to the admin directory:

   ```bash
   cd apps/admin
   ```

2. Start the development server (assuming dependencies are already installed):
   ```bash
   npm run dev
   ```
   The admin portal will be available at `http://localhost:3001`.

## 📦 Scripts

- `npm run dev`: Starts the development server on port 3001.
- `npm run build`: Generates an optimized production build.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to identify code quality issues.
