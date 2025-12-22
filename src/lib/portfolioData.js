import { supabase } from '../lib/supabase';

/**
 * Fetches portfolio items from Supabase
 * In production builds, this data is cached at build time
 */
export async function fetchPortfolioItems() {
    try {
        const { data, error } = await supabase
            .from('landing_portfolio_items')
            .select('*')
            .eq('is_published', true)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (err) {
        console.error('Error fetching portfolio items:', err);
        return [];
    }
}

/**
 * Gets portfolio items - uses cached data in production, live API in development
 */
export async function getPortfolioItems() {
    // In production build, use pre-fetched static data
    if (import.meta.env.PROD && window.__PORTFOLIO_DATA__) {
        return window.__PORTFOLIO_DATA__;
    }

    // In development, always fetch fresh data
    return await fetchPortfolioItems();
}
