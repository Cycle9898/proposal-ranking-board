# Proposal Ranking Boards

A website created with Next.JS which allows you to create boards to ask questions, to a community for example, and make suggestions in return to answer it. In addition, a voting system for propositions is put in place.

The results are paginated (boards and proposals) to avoid having too many entries per page. A search bar is present to filter propositions and boards.

This project uses React components which are reusable.

The data is saved in a PostgreSQL database and Prisma is used to interact with it.

## Getting Started

### Prerequisites

This project uses the following tech stack:

-   [Node.js](https://nodejs.org/en)
-   [PostgreSQL](https://www.postgresql.org/) to host a ProgreSQL database locally or [Neon](https://neon.tech/) for a cloud hosted one
-   [PNPM](https://pnpm.io/)

Please make sure you have the latest versions.

### Instructions

1. Create the database locally or online
2. Set 'DATABASE_URL' variable in a .env file accordingly
3. Clone the repo onto your computer
4. Open a terminal in the cloned project folder
5. Run the following commands:

```bash
# Install dependencies
pnpm install

# Start local dev server with automatic restart on changes
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment variables

It is possible to modify some back-end app settings with environment variables.

Create or modify the .env file in the project root folder and add in it environment variables.

Here is the used ones :

### DATABASE_URL

Modify the URL of the database hosting platform (can be locally or cloud hosted).
