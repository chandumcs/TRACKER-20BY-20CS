# Render Deployment Guide

This guide explains how to deploy the Oracle-integrated application to Render.

## Quick Setup

### 1. Render Service Configuration

When creating a new Web Service on Render:

- **Build Command**: `npm run build:render`
- **Start Command**: `npm start`
- **Node Version**: 18+ (recommended: 20)

### 2. Environment Variables

Set these environment variables in your Render dashboard:

```bash
NODE_ENV=production
ORACLE_AVAILABLE=false  # Set to true if Oracle Instant Client is available
```

### 3. Oracle Database (Optional)

If you have Oracle database access, add these variables:

```bash
DB_USERNAME=your_oracle_username
DB_PASSWORD=your_oracle_password
DB_HOST=your_oracle_host
DB_PORT=1521
DB_SID=your_oracle_sid
```

## Build Process

The application uses a smart build system that:

1. **Conditionally imports Oracle dependencies** - Only loads during development
2. **Graceful fallback** - Uses mock services when Oracle DB is unavailable
3. **Production-ready** - Builds successfully even without Oracle Instant Client

## How It Works

### Development Mode
- Full Oracle database integration with `oracledb` package
- Real-time fallback to mock services if DB is unavailable
- Hot reload and development features

### Production Mode (Render)
- Oracle dependencies are externalized during build
- Application runs with mock services by default
- Automatically switches to real DB if connection becomes available

## Troubleshooting

### Build Errors

If you encounter `Cannot find package 'oracledb'` errors:

1. Ensure you're using the `build:render` command
2. Verify `vite.config.ts` has the conditional import fix
3. Check that oracledb is externalized in rollup options

### Runtime Issues

- Application will show "Database not available, using mock service" in logs
- This is normal behavior when Oracle DB is not accessible
- All functionality works with mock data
- Users can still register, login, and use all features

## Features Available Without Oracle DB

✅ **Full Application Functionality**
- User registration and authentication
- Daily task tracking and management
- User data management
- Data export capabilities
- Role-based access control

✅ **Production Ready**
- Automatic fallback system
- Error handling and logging
- Session management
- Data persistence (in-memory)

## Migration to Oracle DB

When Oracle database becomes available:

1. Update environment variables with DB credentials
2. Set `ORACLE_AVAILABLE=true`
3. Restart the service
4. Use the Data Migration page to transfer localStorage data

The application will automatically detect and switch to the real database.
