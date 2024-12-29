import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

// routing.ts
export const routing = {
  locales: ["en", "fr"] as const, // The 'as const' makes this a tuple of literal types
};

export type Locale = (typeof routing.locales)[number]; // Create a type for valid locales


// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);