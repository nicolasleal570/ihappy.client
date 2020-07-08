import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="description" content="Online psychologist provider" />
          <meta name="theme-color" content="#805AD5" />
          <meta name="msapplication-TileColor" content="#805AD5" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="Online psychologist provider" />
          <meta
            name="twitter:description"
            content="Online psychologist provider"
          />
          <meta name="og:title" content="Online psychologist provider" />
          <meta name="og:description" content="Online psychologist provider" />
          {/* <meta name="og:url" content="https://currency-converter.now.sh" /> */}
          <meta name="og:site_name" content="Online psychologist provider" />
          <meta name="og:type" content="website" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.png" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/example/apple-icon-180x180-dunplab-manifest-6808.png"
          />
          
          <meta name="apple-mobile-web-app-capable" content="yes" />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
