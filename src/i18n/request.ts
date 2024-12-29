import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.locales[0]; // Default to the first locale
  }

  return {
    locale: locale, // Wrap `locale` inside an object with the `locale` key
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});