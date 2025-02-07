import Providers from '@components/Providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-us">
      <head>
        <meta charSet="utf-8" />
        <title>Fabian Schuller Portfolio</title>
      </head>
      <body className="theme-light">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
