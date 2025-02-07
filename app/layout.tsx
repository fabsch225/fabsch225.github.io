import Providers from '@components/Providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-us">
      <head>
        <meta charSet="utf-8" />
        <title>Fabian Schuller Portfolio</title>
        <style>{`
          html, body {
              -ms-overflow-style: none; /* IE and Edge */
              scrollbar-width: none;    /* Firefox */
              overflow: -moz-scrollbars-none; /* Old Firefox */
              
              &::-webkit-scrollbar {    /* Chrome, Safari and Opera */
                display: none;
                width: 0;
                height: 0;
              }
            }
        `}</style>
      </head>
      <body className="theme-light">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
