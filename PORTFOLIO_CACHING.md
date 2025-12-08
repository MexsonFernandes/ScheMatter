# Portfolio Data Caching Strategy

## Overview
The portfolio section uses a smart caching strategy to minimize API calls in production while maintaining fresh data during development.

## How It Works

### Development Mode (`npm run dev`)
- ✅ Fetches portfolio data from Supabase API on every page load
- ✅ Always shows the latest data from your admin panel
- ✅ No caching - perfect for testing and content updates

### Production Build (`npm run build`)
1. **Pre-build Step**: Runs `scripts/prebuild.js`
   - Fetches all published portfolio items from Supabase
   - Saves to `src/data/portfolio-cache.json`
   - This file is committed to your build

2. **Build Step**: Vite bundles the application
   - The cached JSON is imported as a static module
   - No runtime API calls needed

3. **Runtime**: Portfolio section checks environment
   - In production: Uses cached data (instant load, zero API calls)
   - Fallback: If cache missing, fetches from API

## Benefits

✅ **Zero API Calls in Production** - Saves on Supabase usage
✅ **Instant Page Load** - No waiting for API responses
✅ **SEO Friendly** - Content is available immediately
✅ **Cost Effective** - Reduces database queries
✅ **Fresh in Dev** - Always see latest changes while developing

## Usage

### Development
```bash
npm run dev
```
Portfolio data is fetched from API on every load.

### Production Build
```bash
npm run build
```
This automatically:
1. Runs `prebuild` to cache portfolio data
2. Builds the app with cached data included

### Manual Cache Update
If you need to update the cache without rebuilding:
```bash
npm run prebuild
```

## When to Rebuild

You should rebuild and redeploy when:
- ✅ Adding new portfolio items
- ✅ Updating existing portfolio content
- ✅ Changing portfolio images or descriptions
- ✅ Publishing/unpublishing items

## File Structure

```
landing-page/
├── scripts/
│   └── prebuild.js          # Fetches and caches data
├── src/
│   ├── data/
│   │   └── portfolio-cache.json  # Generated cache file
│   ├── lib/
│   │   └── portfolioData.js      # Data fetching utilities
│   └── components/
│       └── sections/
│           └── PortfolioSection.jsx  # Uses cached/live data
```

## Environment Variables Required

Ensure these are set in your `.env` file:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Troubleshooting

### Cache not working in production?
- Ensure `npm run prebuild` ran successfully
- Check that `src/data/portfolio-cache.json` exists
- Verify the file is included in your build

### Seeing old data in production?
- Run `npm run build` again to refresh the cache
- Deploy the new build

### API calls still happening in production?
- Check browser console for warnings
- Verify `import.meta.env.PROD` is true in production
- Ensure cache file was imported correctly
