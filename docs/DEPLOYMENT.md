# 🚀 Deployment Guide

This guide covers how to deploy the QR Code Generator to various hosting platforms.

## 🏗️ Build Process

Before deploying to any platform, you need to create a production build:

```bash
# Install dependencies
npm install

# Create production build
npm run build

# Optional: Preview the build locally
npm run preview
```

The build output will be in the `dist/` directory.

## 🌐 Deployment Platforms

### Vercel (Recommended)

Vercel provides excellent support for Vite applications with zero configuration.

#### GitHub Integration

1. **Connect your repository to Vercel:**

   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure settings:**

   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Deploy:**
   - Click "Deploy"
   - Automatic deployments on every push to main branch

#### Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
npx vercel

# For production deployment
npx vercel --prod
```

### Netlify

Netlify offers excellent static site hosting with continuous deployment.

#### Git Integration

1. **Connect repository:**

   - Visit [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your repository

2. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18` (in Environment variables)

#### Manual Deploy

```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### GitHub Pages (Configured)

**✅ This project is already configured for automated GitHub Pages deployment.**

The deployment is triggered **ONLY** by:

- Direct pushes to the `main` branch
- Successfully merged pull requests into `main` branch (from any source branch)
- Manual workflow dispatch

**Important**: Pushes to other branches (`dev`, `feature/*`, etc.) will **NOT** trigger deployment. Only activity on the `main` branch triggers deployment.

#### Setup Instructions

1. **Enable GitHub Pages:**

   - Go to repository Settings → Pages
   - Set Source to "GitHub Actions"

2. **Deploy:**

   ```bash
   git add .
   git commit -m "your changes"
   git push origin main
   ```

3. **Access your site at:**
   ```
   https://YOUR_USERNAME.github.io/qr-code-generator/
   ```

#### Workflow Features

- **Automated CI/CD**: Deploys on every push/merge to main
- **Security**: Uses GitHub's OIDC tokens (no secrets needed)
- **Performance**: Caches dependencies for faster builds
- **Branch Strategy**: Supports both direct push and PR merge workflows

The deployment workflow is located at `.github/workflows/deploy.yml` and includes:

- Node.js 18 environment
- npm dependency caching
- TypeScript compilation
- Vite build process
- Automated artifact upload

### Other Platforms

- **Firebase Hosting**: `firebase deploy` after `firebase init hosting`
- **Cloudflare Pages**: Connect Git repository and set build command to `npm run build`
- **AWS S3**: Use AWS CLI to sync `dist/` folder to S3 bucket

## 🔧 Environment Configuration

### Production Environment Variables

```bash
# Application Info
VITE_APP_TITLE="QR Code Generator"
VITE_APP_VERSION="1.0.0"

# Analytics (Optional)
VITE_GA_TRACKING_ID="your-analytics-id"
```

## 🛡️ Security Considerations

- Always use HTTPS in production
- Configure proper security headers
- Validate Content Security Policy

## 📊 Post-Deployment Checklist

- [ ] Application loads successfully
- [ ] All QR generation types work
- [ ] Color customization functions properly
- [ ] Download functionality works
- [ ] Copy to clipboard works
- [ ] Responsive design on mobile devices
- [ ] Performance metrics are acceptable

## 🆘 Troubleshooting

### Common Issues

1. **Build fails:**

   - Check Node.js version (16+ required)
   - Clear node_modules and reinstall
   - Check for TypeScript errors

2. **QR generation not working:**

   - Verify external API access
   - Check Content Security Policy headers
   - Ensure HTTPS for production

3. **Assets not loading:**
   - Check base path configuration
   - Verify build output directory

For more help, see the [main README](../README.md) or create an issue.

---

**Happy Deploying!** 🚀
