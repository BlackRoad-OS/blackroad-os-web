# Railway Deployment Guide

This guide provides step-by-step instructions for deploying the BlackRoad OS Web application to Railway.

## Prerequisites

- A [Railway](https://railway.app) account
- This GitHub repository connected to your Railway account
- Access to configure environment variables in Railway

## Quick Start

Railway will automatically detect and deploy this Next.js application using Nixpacks. The configuration is already set up in `railway.json` and `nixpacks.toml`.

## Deployment Steps

### 1. Create a New Project in Railway

1. Log in to your [Railway dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose this repository (`blackroad-os-web`)
5. Railway will automatically detect the project configuration

### 2. Configure Environment Variables

Navigate to your project's **Variables** section in Railway and add the following environment variables. Use `railway.env.example` as a reference.

#### Required Environment Variables

```bash
# Node Environment
NODE_ENV=production

# BlackRoad OS Configuration
OS_ROOT=https://blackroad.systems
SERVICE_BASE_URL=https://your-railway-app.up.railway.app
CORE_API_URL=https://core.blackroad.systems
PUBLIC_WEB_URL=https://your-railway-app.up.railway.app
PUBLIC_CONSOLE_URL=https://console.blackroad.systems
PUBLIC_DOCS_URL=https://docs.blackroad.systems

# Client-side Environment Variables (embedded at build time)
NEXT_PUBLIC_OS_ROOT=https://blackroad.systems
NEXT_PUBLIC_SERVICE_ID=web
NEXT_PUBLIC_SERVICE_NAME=BlackRoad OS – Web
NEXT_PUBLIC_CONSOLE_URL=https://console.blackroad.systems
NEXT_PUBLIC_DOCS_URL=https://docs.blackroad.systems
NEXT_PUBLIC_CORE_API_URL=https://core.blackroad.systems
NEXT_PUBLIC_PUBLIC_API_URL=https://api.blackroad.systems
```

**Important Notes:**
- Replace `https://your-railway-app.up.railway.app` with your actual Railway deployment URL
- You can find your Railway URL in the **Settings** → **Domains** section
- Railway automatically sets the `PORT` environment variable - **do not** manually configure it

### 3. Deploy

After configuring environment variables:

1. Railway will automatically trigger a deployment
2. The build process will:
   - Install dependencies with `npm ci`
   - Build the Next.js application with `npm run build`
   - Start the server with `npm start`

3. Monitor the deployment in the **Deployments** tab

### 4. Verify Deployment

Once deployed, verify the application is running correctly:

1. Visit your Railway URL
2. Check the health endpoint: `https://your-app.up.railway.app/api/health`
   - Expected response: `{"status":"ok","service":"web"}`
3. Verify the status page loads: `https://your-app.up.railway.app/status`

## Configuration Details

### Railway Configuration (`railway.json`)

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/api/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

**Key Features:**
- **Builder**: Nixpacks (optimized for Node.js)
- **Health Check**: `/api/health` endpoint checked every 100 seconds
- **Restart Policy**: Automatic restart on failure (max 10 retries)

### Build Configuration (`nixpacks.toml`)

```toml
[phases.setup]
nixPkgs = ['nodejs-18_x']

[phases.install]
cmds = ['npm ci']

[phases.build]
cmds = ['npm run build']

[start]
cmd = 'npm start'
```

**Build Phases:**
1. **Setup**: Uses Node.js 18.x
2. **Install**: Clean install dependencies
3. **Build**: Build Next.js production bundle
4. **Start**: Launch the production server

### Start Command

The application starts with:
```bash
next start -H 0.0.0.0 -p $PORT
```

- `-H 0.0.0.0`: Binds to all network interfaces (required for Railway)
- `-p $PORT`: Uses Railway's automatically assigned port

## Available Endpoints

After deployment, your application will have the following endpoints:

- `/` - Main landing page
- `/api/health` - Health check endpoint
- `/api/status` - System status API
- `/api/info` - Service metadata
- `/api/version` - Version information
- `/api/debug-env` - Environment diagnostics (safe, no secrets)
- `/status` - Status dashboard page
- `/console` - Console redirect page
- `/settings` - Settings redirect page

## Troubleshooting

### Build Failures

**Issue**: Build fails with "Missing required environment variable"
**Solution**: Ensure all required environment variables (especially `NEXT_PUBLIC_*` variables) are set in Railway before deployment, as they're needed at build time.

**Issue**: TypeScript or ESLint errors during build
**Solution**: Run `npm run lint` and `npm run build` locally to identify and fix issues before deploying.

### Health Check Failures

**Issue**: Railway shows service as unhealthy
**Solution**: 
- Verify the application is binding to `0.0.0.0` (already configured)
- Check that `PORT` environment variable is not manually set (Railway sets this automatically)
- Review deployment logs for startup errors

### Runtime Errors

**Issue**: Application crashes after deployment
**Solution**:
- Check Railway logs in the **Deployments** tab
- Verify all environment variables are correctly set
- Ensure `NODE_ENV=production` is set

## Custom Domain (Optional)

To use a custom domain:

1. Go to **Settings** → **Domains** in your Railway project
2. Click **"Add Domain"**
3. Enter your custom domain
4. Configure DNS records as instructed by Railway
5. Update environment variables to use your custom domain:
   - `SERVICE_BASE_URL`
   - `PUBLIC_WEB_URL`

## Monitoring

Railway provides built-in monitoring:

- **Logs**: View application logs in the **Deployments** tab
- **Metrics**: CPU, memory, and network usage in the **Metrics** tab
- **Health**: Automatic health checks via `/api/health`

## Support

For issues specific to:
- **Railway Platform**: See [Railway Docs](https://docs.railway.app)
- **Application Issues**: Create an issue in this repository
- **BlackRoad OS**: Visit [BlackRoad Documentation](https://docs.blackroad.systems)

## Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Railway Documentation](https://docs.railway.app)
- [Nixpacks Documentation](https://nixpacks.com)
