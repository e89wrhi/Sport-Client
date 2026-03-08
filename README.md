# Sport App

Sport App is a modern web platform designed to showcase real-time football matches, enable user voting, and leverage AI for match predictions. This project is built as a monorepo using [Turborepo](https://turbo.build/) and serves as a frontend showcase for a .NET backend enhanced with Microsoft Extensions AI.

## 🌟 Features

- **Real-time Match Updates**: Stay up to date with live football match events and scores.
- **User Engagement**: Users can vote on match outcomes and interact with community sentiment.
- **AI Predictions**: Integrated AI to forecast match outcomes.
- **Admin Management**: A dedicated admin portal to manage matches, events, and platform data.
- **Modern Tech Stack**: Built with Next.js 15, React 19, Tailwind CSS v4, and TypeScript.

## 🏗️ Architecture

This repository is structured as a monorepo containing multiple applications and shared packages:

### Applications
- **`apps/web`**: The main user-facing application where users can discover matches, vote, and see AI predictions.
- **`apps/admin`**: The administrative portal for managing the platform's content, including matches and live events.

### Shared Packages
- **`packages/ui`**: Shared UI components built with React, Radix UI, and Tailwind CSS.
- **`packages/lib`**: Shared utilities, type definitions, and configurations.
- **`packages/typescript-config`**: Shared `tsconfig.json` bases across the workspace.

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) package manager

### Installation

1. Clone the repository and navigate into it:
   ```bash
   git clone <repository-url>
   cd Sport-Client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development servers for all applications, run the following command from the root directory:

```bash
npm run dev
```

This will run `apps/admin` internally on port `3001` and `apps/web` on port `3000`.

### Build

To build all apps and packages within the monorepo:

```bash
npm run build
```

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management & Fetching**: [TanStack React Query](https://tanstack.com/query/latest)
- **Tooling**: [Turborepo](https://turbo.build/), ESLint, Prettier

## 🔗 Backend API
This frontend connects to a robust backend built with [.NET](https://dotnet.microsoft.com/) and utilizes Microsoft Extensions AI to deliver reliable, real-time data and intelligent functional features.
