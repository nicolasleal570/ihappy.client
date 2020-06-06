import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
	render(): JSX.Element {
		return (
			<html lang="en">
				<Head>
					<meta charSet="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<meta name="description" content="Online psychologist provider" />
					<meta name="theme-color" content="#805AD5" />
					<meta name="msapplication-TileColor" content="#805AD5" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
					<meta name="twitter:card" content="summary" />
					<meta name="twitter:title" content="Online psychologist provider" />
					<meta name="twitter:description" content="Online psychologist provider" />
					<meta name="og:title" content="Online psychologist provider" />
					<meta name="og:description" content="Online psychologist provider" />
					{/* <meta name="og:url" content="https://currency-converter.now.sh" /> */}
					<meta name="og:site_name" content="Online psychologist provider" />
					<meta name="og:type" content="website" />
					<link rel="manifest" href="/manifest.json" />
					<link rel="icon" href="/favicon.png" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<link rel="apple-touch-icon" sizes="180x180" href="example/apple-icon-180.jpg" />
					<link rel="apple-touch-icon" sizes="167x167" href="example/apple-icon-167.jpg" />
					<link rel="apple-touch-icon" sizes="152x152" href="example/apple-icon-152.jpg" />
					<link rel="apple-touch-icon" sizes="120x120" href="example/apple-icon-120.jpg" />

					<meta name="apple-mobile-web-app-capable" content="yes" />

					<link rel="apple-touch-startup-image" href="example/apple-splash-2048-2732.jpg"
						media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
					<link rel="apple-touch-startup-image" href="example/apple-splash-2732-2048.jpg"
						media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
					<link rel="apple-touch-startup-image" href="example/apple-splash-1668-2388.jpg"
						media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
					<link rel="apple-touch-startup-image" href="example/apple-splash-2388-1668.jpg"
						media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
					<link rel="apple-touch-startup-image" href="example/apple-splash-1668-2224.jpg"
						media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
					<link rel="apple-touch-startup-image" href="example/apple-splash-2224-1668.jpg"
						media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
					<link rel="apple-touch-startup-image" href="example/apple-splash-1536-2048.jpg"
						media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
					<link rel="apple-touch-startup-image" href="example/apple-splash-2048-1536.jpg"
						media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
					<link rel="apple-touch-startup-image" href="example/apple-splash-1242-2688.jpg"
						media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
					<link rel="apple-touch-startup-image" href="example/apple-splash-2688-1242.jpg"
						media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
					<link rel="apple-touch-startup-image" href="example/apple-splash-1125-2436.jpg"
						media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
					<link rel="apple-touch-startup-image" href="example/apple-splash-2436-1125.jpg"
						media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
					<link rel="apple-touch-startup-image" href="example/apple-splash-828-1792.jpg"
						media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
					<link rel="apple-touch-startup-image" href="example/apple-splash-1792-828.jpg"
						media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
					<link rel="apple-touch-startup-image" href="example/apple-splash-1242-2208.jpg"
						media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
					<link rel="apple-touch-startup-image" href="example/apple-splash-2208-1242.jpg"
						media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
					<link rel="apple-touch-startup-image" href="example/apple-splash-750-1334.jpg"
						media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
					<link rel="apple-touch-startup-image" href="example/apple-splash-1334-750.jpg"
						media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
					<link rel="apple-touch-startup-image" href="example/apple-splash-640-1136.jpg"
						media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
					<link rel="apple-touch-startup-image" href="example/apple-splash-1136-640.jpg"
						media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}
