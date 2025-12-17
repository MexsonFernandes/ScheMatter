import fs from 'fs';
import path from 'path';
import { loadEnv } from 'vite';

/**
 * Pre-build script to fetch and cache portfolio data
 * Run this before building for production
 */
async function prebuild() {
    console.log('🔄 Fetching portfolio data from Supabase...');

    try {
        const env = loadEnv(process.env.NODE_ENV, process.cwd());
        // Dynamically import supabase (ESM)
        const { createClient } = await import('@supabase/supabase-js');

        const supabaseUrl = env.VITE_SUPABASE_URL;
        const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
            throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables');
        }

        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        const { data, error } = await supabase
            .from('landing_portfolio_items')
            .select('*')
            .eq('is_published', true)
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Write to a JSON file that will be imported at build time
        const outputPath = path.join(process.cwd(), 'src', 'data', 'portfolio-cache.json');
        const outputDir = path.dirname(outputPath);

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

        console.log(`✅ Successfully cached ${data.length} portfolio items to ${outputPath}`);
    } catch (error) {
        console.error('❌ Error during prebuild:', error.message);
        process.exit(1);
    }
}

prebuild();
