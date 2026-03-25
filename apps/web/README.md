# Web App - Sport App

The Web App is the primary user-facing application of the Sport App ecosystem. It delivers an interactive and dynamic platform for users to discover football matches, participate in voting, and access AI-driven match predictions.

## 🌟 Key Features

- **Match Discovery**: Seamlessly browse upcoming, live, and past football matches with comprehensive statistics.
- **Real-time Updates**: Experience live events, score changes, and match updates in real-time without needing to refresh the page.
- **Community Voting**: Cast votes on predicted match outcomes and observe live community sentiments.
- **AI Predictions**: View informed predictions for match outcomes, powered by Microsoft Extensions AI on the backend.
- **Responsive Layout**: A modern, mobile-first interface optimized for desktops, tablets, and smartphones.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v15)
- **UI & Styling**: [Tailwind CSS v4](https://tailwindcss.com/) bundled with `@sport/ui` shared components.
- **Animations**: Fluid page and component transitions using Framer Motion (`motion`).
- **State Management**: [TanStack Query](https://tanstack.com/query/v5) for optimized server-state synchronization.
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) for secure and flexible user login.
- **Internationalization**: `next-i18next` and `next-intl` for robust multi-language support.

## 🚀 Getting Started

This project is integrated within the Sport App monorepo.

1. Navigate to the web application directory:

   ```bash
   cd apps/web
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   The web application will be accessible at `http://localhost:3000`.

## 📦 Scripts

- `npm run dev`: Starts the Next.js development server on port 3000.
- `npm run build`: Builds the application for production deployment.
- `npm run start`: Runs the compiled Next.js production server.
- `npm run lint`: Runs static code analysis to enforce quality standard rules.
