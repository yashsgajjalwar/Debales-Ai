# [Debales AI Assignment](https://debales-ai.vercel.app/)

This is a real-time user footfall application built with Next.js, featuring user authentication and WebSocket communication.

**Deployed Application:** [https://debales-ai.vercel.app/](https://debales-ai.vercel.app/)

## Features

- **Real-time Chat:** Engage in live conversations using Socket.IO.
- **User Authentication:** Secure login and session management powered by NextAuth.js.
- **Modern UI:** Built with Tailwind CSS and Shadcn UI components.
- **TypeScript:** Type safety throughout the application.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Real-time Communication:** [Socket.IO](https://socket.io/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm, yarn, or pnpm

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/SaranshBangar/debales_ai.git ./
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the necessary environment variables (e.g., `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, database connection strings if applicable). Refer to the NextAuth.js documentation for required variables.

    ```env
    NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
    NEXTAUTH_SECRET=your_nextauth_secret_key
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Contact

For questions or feedback, please reach out to [Saransh Bangar](https://www.saransh-bangar.xyz/)
