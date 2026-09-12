# StockPilot - Web Application

React + TypeScript + Tailwind CSS Frontend for StockPilot Inventory & Sales Management System

## Features

- 🔐 User Authentication (JWT)
- 📦 Inventory Management
- 💳 Point of Sale
- 📊 Analytics & Reports
- ⚠️ Low-Stock Alerts
- 🎨 Beautiful UI with Tailwind CSS
- 📱 Responsive Design
- ♿ Accessible Components

## Technology Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite 8
- **Package Manager**: pnpm
- **Backend API**: ASP.NET Core 8.0 (https://github.com/vamshikreddy7-debug/StockPilot-Backend)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (npm install -g pnpm)
- Backend API running on https://localhost:5001

### Installation

1. Clone the repository
```bash
git clone https://github.com/vamshikreddy7-debug/UXDesignForStockPilot.git
cd UXDesignForStockPilot
```

2. Install dependencies
```bash
pnpm install
```

3. Create `.env.local` file (copy from `.env.example`)
```bash
VITE_API_URL=https://localhost:5001/api
```

4. Start development server
```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
pnpm build
pnpm preview
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── screens/         # Page components
├── services/        # API service layer
├── App.tsx          # Main app component
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Key Screens

- **Onboarding**: User registration and login
- **Dashboard**: Sales metrics and analytics
- **Inventory**: Product management
- **Sales**: Point of sale interface
- **Alerts**: Low-stock notifications
- **Reports**: Advanced analytics
- **Settings**: User profile and preferences
- **Billing**: Subscription management

## API Integration

The frontend communicates with the backend API via the service layer in `src/services/`:

- `authService` - User authentication
- `inventoryService` - Inventory CRUD operations
- `salesService` - Sales transactions
- `reportService` - Analytics and reports

## Authentication

JWT tokens are stored in localStorage and automatically sent with every API request.

```typescript
// Login
const response = await authService.login(email, password);
localStorage.setItem('token', response.token);

// Logout
localStorage.removeItem('token');
```

## Styling

The app uses Tailwind CSS v4 with CSS variables for theming:

- `--background` - Main background
- `--foreground` - Main text color
- `--card` - Card background
- `--accent` - Primary accent color
- `--border` - Border color
- `--muted-foreground` - Muted text
- etc.

## Error Handling

API errors are caught and displayed to users with appropriate messages. Invalid tokens automatically redirect to login.

## Development Tips

- Use `pnpm dev` for hot module reloading
- Check browser console for detailed error messages
- Verify backend API is running before starting frontend
- Use Swagger UI at https://localhost:5001/swagger to test API endpoints

## Building for Android

The same React codebase can be wrapped with React Native or Capacitor for Android:

```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add android
pnpm build
npx cap sync
```

## Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN pnpm install
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "preview"]
```

## Performance

- Code splitting with Vite
- Lazy loading of route components
- Optimized bundle size (minified + gzipped)
- Service worker ready (PWA)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Support

For issues and feature requests, please open an issue on GitHub.

## Backend Repository

https://github.com/vamshikreddy7-debug/StockPilot-Backend
