import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

const quicksand = Quicksand({
	weight: ['400', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-quicksand',
	preload: true,
	fallback: ['system-ui', 'arial'],
})

export const metadata: Metadata = {
	title: "Wolfey's Portfolio",
	description: 'Web developer that makes various stuff.',
	openGraph: {
		title: "Wolfey's Portfolio",
		description: 'Web developer that makes various stuff.',
		url: 'https://wufler.vercel.app',
		images: [
			{
				url: 'https://wolfey.s-ul.eu/qBXULLBu',
				width: 1280,
				height: 720,
				alt: 'silly fox with tongue out',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={quicksand.variable}>
				{children}
				<Toaster position="bottom-left" />
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	)
}
