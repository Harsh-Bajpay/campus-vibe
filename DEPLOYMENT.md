# Deployment Guide for Campus Vibe

## Deploying to Vercel (Recommended)

Vercel is the easiest way to deploy your Campus Vibe application. Here's how:

### Method 1: Deploy via Vercel Dashboard

1. **Push your code to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up or log in with your GitHub account

3. **Import your project**
   - Click "Add New..." → "Project"
   - Find and select your `campus-vibe` repository
   - Vercel will automatically detect it's a Next.js project

4. **Configure (optional)**
   - Project name: campus-vibe (or your preferred name)
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: ./
   - No environment variables needed for MVP

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for the build to complete
   - You'll get a live URL like `campus-vibe-xyz.vercel.app`

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
cd /path/to/campus-vibe
vercel

# For production deployment
vercel --prod
```

### Automatic Deployments

Once connected, Vercel will automatically:
- Deploy every push to your main branch
- Create preview deployments for pull requests
- Run build checks before deployment

## Deploying to Other Platforms

### Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"

### Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your campus-vibe repository
4. Railway will auto-detect Next.js and deploy

### Self-Hosting

```bash
# Build the application
npm run build

# Start the production server
npm start

# Or use PM2 for process management
npm install -g pm2
pm2 start npm --name "campus-vibe" -- start
```

## Environment Variables (for future features)

When you add backend features, create a `.env.local` file:

```env
# Database (example with Supabase)
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Authentication (example with NextAuth)
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-secret-key
```

Remember to add these in your Vercel dashboard under:
**Project Settings → Environment Variables**

## Troubleshooting

### Build fails
- Check that all dependencies are in `package.json`
- Ensure `npm run build` works locally
- Check build logs for specific errors

### 404 errors
- Verify `app/page.js` exists
- Check `next.config.mjs` configuration
- Clear Vercel cache and redeploy

### Styling issues
- Ensure Tailwind CSS is properly configured
- Check that `globals.css` imports are correct
- Verify `postcss.config.js` exists

## Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All cards display properly
- [ ] Buttons are clickable (even if non-functional in MVP)
- [ ] Mobile responsive design works
- [ ] Share the URL with your team/judges

## Custom Domain (Optional)

To add a custom domain in Vercel:
1. Go to Project Settings → Domains
2. Add your domain (e.g., campusvibe.com)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (5-60 minutes)

---

**Your Campus Vibe app is now live!** 🎉
