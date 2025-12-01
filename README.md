# AÇAIMAR Admin Interface

Vue 3 admin interface for managing the AÇAIMAR project.

## 🚀 Getting Started

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Development

```bash
npm run dev
```

The admin interface will be available at `http://localhost:5174`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
admin/
├── src/
│   ├── components/      # Reusable Vue components
│   ├── pages/           # Page components
│   ├── services/        # API service layer
│   ├── stores/          # Pinia state management
│   ├── router/          # Vue Router configuration
│   ├── App.vue          # Root component
│   ├── main.js          # Entry point
│   └── style.css        # Global styles
├── index.html
├── vite.config.js
└── package.json
```

## 🔐 Authentication

The admin interface uses JWT authentication:

- **Login**: `/login` - Authenticate with email and password
- **Protected Routes**: All admin routes require authentication
- **Admin Routes**: Some routes require admin role

## 📡 API Integration

The admin interface connects to the Azure Functions API:

- Base URL: Configured in `src/services/api.js`
- Default: `http://localhost:7071/api` (development)
- Set `VITE_API_URL` environment variable for production

## 🎨 Features

- ✅ User authentication (JWT)
- ✅ Protected routes
- ✅ Role-based access control
- ✅ Dashboard with statistics
- ✅ Metas management (CRUD)
- ✅ Responsive design

## 🔧 Configuration

Create a `.env` file for environment variables:

```env
VITE_API_URL=http://localhost:7071/api
```

## 📦 Technologies

- Vue 3 (Composition API)
- Vue Router 4
- Pinia (State Management)
- Axios (HTTP Client)
- Vite (Build Tool)
