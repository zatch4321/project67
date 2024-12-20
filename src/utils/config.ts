// Environment configuration with validation
export const config = {
  supabase: {
    url: import.meta.env.PUBLIC_SUPABASE_URL,
    anonKey: import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
  },
} as const;

// Validate required environment variables
const requiredEnvVars = [
  ['PUBLIC_SUPABASE_URL', config.supabase.url],
  ['PUBLIC_SUPABASE_ANON_KEY', config.supabase.anonKey],
] as const;

for (const [name, value] of requiredEnvVars) {
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Please check your .env file.`
    );
  }
}