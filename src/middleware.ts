import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware({
  locales: routing.locales, // Use the locales from your routing configuration
  defaultLocale: 'en', // Set your preferred default locale (replace with 'de', 'fr', or 'es' if needed)
  // Other optional configuration options...
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|fr)/:path*'],
};