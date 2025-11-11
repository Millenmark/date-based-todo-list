# Date-Based Todo List

A modern todo list application that allows you to organize and manage your tasks by date. Built with React Router, TypeScript, and Tailwind CSS.

## Features

- 📅 **Date-based organization** - Group and view todos by specific dates
- 🔄 **Local storage persistence** - Your todos are automatically saved locally
- ⚡ **Modern React** - Built with React 19 and React Router 7
- 🎨 **Tailwind CSS** - Clean, responsive design
- 📱 **Responsive design** - Works on desktop and mobile devices
- 🔒 **TypeScript** - Full type safety and better development experience

## Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

## Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd date-based-todo-list
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Development

Start the development server with hot module replacement:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`

The development server includes:

- Hot Module Replacement (HMR) for instant updates
- TypeScript checking
- Automatic rebuilding on file changes

## Building for Production

Create a production build:

```bash
npm run build
```

This creates an optimized build in the `build/` directory with:

- Minified and optimized JavaScript bundles
- Compressed CSS
- Optimized static assets

## Running in Production

After building, start the production server:

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
├── app/
│   ├── components/          # React components
│   │   ├── date-picker.tsx  # Date selection component
│   │   └── todo-app.tsx     # Main todo application
│   ├── hooks/               # Custom React hooks
│   │   └── use-local-storage-todos.ts
│   ├── routes/              # React Router routes
│   │   └── home.tsx         # Home route
│   ├── app.css             # Global styles
│   └── root.tsx            # App root component
├── public/                 # Static assets
├── package.json           # Project dependencies and scripts
└── README.md             # This file
```

## Technology Stack

- **React 19** - UI library
- **React Router 7** - Routing and navigation
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework

## Local Storage

This application uses browser local storage to persist your todos locally. Your data will remain even after refreshing the page or closing the browser.

## Deployment

### Docker Deployment

Build and run using Docker:

```bash
# Build the Docker image
docker build -t date-based-todo .

# Run the container
docker run -p 3000:3000 date-based-todo
```

The containerized application can be deployed to any platform that supports Docker:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### Traditional Deployment

The built application is production-ready Node.js application. Deploy the output of `npm run build` to your preferred hosting platform.

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.
