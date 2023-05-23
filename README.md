# React Table

This repository contains the code for the React Table task.

## Project Setup

Before you can run the project, make sure you have the following prerequisites installed:

- Node.js (v16 or higher)
- npm or pnpm (Package Manager)

To set up the project, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run the following command to install the project dependencies:

### `pnpm install`

## Available Scripts

In the project directory, you can run the following scripts:

### `pnpm dev`

Runs the backend server and Vite in parallel. This script starts the Express server defined in `api/server.js` and the Vite development server.

### `pnpm build`

Builds the project for production. This script runs the TypeScript compiler (`tsc`) to compile the TypeScript code and then uses Vite to build the project.

### `pnpm run serve`

Serves the production build of the project. This script starts a server to serve the optimized and bundled production build generated by Vite.
