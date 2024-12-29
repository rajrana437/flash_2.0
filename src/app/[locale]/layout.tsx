import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing, Locale } from "@/i18n/routing"; // Import the Locale type
import localFont from "next/font/local"; // Importing the local font package
import "../globals.css"; // Assuming you still want to use the global styles
import Header from "../components/Header";

// Import the Geist fonts
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Define the Params type as a promise
type Params = { locale: Locale };

type Props = {
  children: React.ReactNode;
  params: Promise<Params>; // Ensure params is treated as a Promise
};

export async function generateStaticParams() {
  // Generate params for all locales
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const resolvedParams = await params; // Await the resolved params
  const { locale } = resolvedParams;

  // Validate the locale
  if (!routing.locales.includes(locale)) {
    notFound(); // Handle invalid locale by returning 404
  }

  // Fetch the messages for the locale
  const messages = await getMessages({ locale }); // Pass an object with locale

  return (
    <NextIntlClientProvider messages={messages}>
      {/* <Header /> */}
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
