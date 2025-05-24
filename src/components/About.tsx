'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
	ArrowLeft,
	ArrowRight,
	X,
	Maximize,
	Minimize,
	AtSign,
	Copy,
	Check,
} from 'lucide-react'
import {
	HTML5,
	TypeScript,
	ReactIcon,
	Nextjs,
	TailwindCSS,
	PostgreSQL,
	Prisma,
	CSSNew,
	JavaScript,
	ShadcnUI,
	Nodejs,
	Neon,
	Git,
	GitHub,
	Vercel,
	NPM,
	PNPM,
	Motion,
	Docker,
	Figma,
	Cursor,
	VisualStudioCode,
	Discord,
	BetterAuth,
} from './ui/icons'
import Finland from './ui/icons/finland'
import Image from 'next/image'

const getTagIcon = (name: string) => {
	const tag = name.toLowerCase()
	if (tag.includes('next') || tag.includes('next.js')) return <Nextjs />
	if (tag.includes('react')) return <ReactIcon />
	if (tag.includes('css')) return <CSSNew />
	if (tag.includes('html')) return <HTML5 />
	if (tag.includes('typescript') || tag.includes('ts')) return <TypeScript />
	if (tag.includes('javascript') || tag.includes('js')) return <JavaScript />
	if (tag.includes('tailwind')) return <TailwindCSS />
	if (tag.includes('node') || tag.includes('nodejs')) return <Nodejs />
	if (tag.includes('postgres') || tag.includes('postgresql'))
		return <PostgreSQL />
	if (tag.includes('prisma')) return <Prisma />
	if (tag.includes('docker')) return <Docker />
	if (tag.includes('git')) return <Git />
	if (tag.includes('github')) return <GitHub />
	if (tag.includes('vercel')) return <Vercel />
	if (tag.includes('motion')) return <Motion />
	if (tag.includes('better-auth')) return <BetterAuth />
	if (tag.includes('html')) return <HTML5 />
	if (tag.includes('npm')) return <NPM />
	if (tag.includes('pnpm')) return <PNPM />
	if (tag.includes('neon')) return <Neon />
	if (tag.includes('shadcn')) return <ShadcnUI />

	return null
}

export default function About({
	onClose,
	builds,
	isFullscreen,
	onFullscreenChange,
	isMuted,
}: {
	onClose?: () => void
	builds: Build[]
	isFullscreen?: boolean
	onFullscreenChange?: (state: boolean) => void
	isMuted?: boolean
}) {
	const [selectedPage, setSelectedPage] = useState(0)
	const [slideDirection, setSlideDirection] = useState(0)
	const [nextSound, setNextSound] = useState<HTMLAudioElement | null>(null)
	const [openSound, setOpenSound] = useState<HTMLAudioElement | null>(null)
	const [moveSound, setMoveSound] = useState<HTMLAudioElement | null>(null)
	const [localFullscreen, setLocalFullscreen] = useState(false)
	const [isDiscordCopied, setIsDiscordCopied] = useState(false)

	useEffect(() => {
		if (isFullscreen !== undefined) {
			setLocalFullscreen(isFullscreen)
		}
	}, [isFullscreen])

	useEffect(() => {
		const handleResize = () => {
			const isLargeScreen = window.innerWidth >= 1024
			if (!isLargeScreen && !localFullscreen) {
				setLocalFullscreen(true)
				onFullscreenChange?.(true)
			}
		}

		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [localFullscreen, onFullscreenChange])

	useEffect(() => {
		const openAudio = new Audio('/open.wav')
		openAudio.volume = 0.2
		setOpenSound(openAudio)
	}, [])

	useEffect(() => {
		const nextAudio = new Audio('/next.wav')
		nextAudio.volume = 0.2
		setNextSound(nextAudio)
	}, [])

	useEffect(() => {
		const moveAudio = new Audio('/move.wav')
		moveAudio.volume = 0.2
		setMoveSound(moveAudio)
	}, [])

	const handleDiscordClick = () => {
		navigator.clipboard.writeText('woolfey')
		setIsDiscordCopied(true)
		setTimeout(() => setIsDiscordCopied(false), 2000)
	}

	const handleHover = () => {
		if (moveSound) {
			moveSound.muted = !!isMuted
			moveSound.play()
		}
	}

	const pages = [
		{
			title: 'ABOUT ME',
			subtitle: 'WEB DEVELOPER',
			content: (
				<div className="text-white space-y-4 pb-6">
					<p className="leading-relaxed text-lg">
						Hi! I&apos;m Philip Huynh, a full-stack developer from
						<Finland className="inline-block align-middle" /> Finland. I make some fun
						things, my coding journey started at the end of 2021 with a URL shortener
						as my first project.
					</p>

					<div className="space-y-2">
						<h3 className="text-[#dfc931] font-bold text-xl">Contact</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
							<a
								href="mailto:hi@wolfey.me"
								className="block"
								onMouseEnter={handleHover}
							>
								<div className="bg-gradient-to-r from-[#dfc931]/50 to-[#dfc931]/30 p-2.5 rounded-lg hover:from-[#dfc931]/70 hover:to-[#dfc931]/50 transition-all duration-200 group">
									<div className="flex items-center gap-2">
										<span className="transition-all duration-200 transform group-hover:rotate-[360deg]">
											<AtSign className="size-4 absolute group-hover:opacity-0 group-hover:scale-0 transition-all duration-200" />
											<ArrowRight className="size-4 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200" />
										</span>
										<h3 className="text-sm font-semibold truncate">hi@wolfey.me</h3>
									</div>
								</div>
							</a>
							<div
								onClick={handleDiscordClick}
								onMouseEnter={handleHover}
								className="bg-gradient-to-r from-[#dfc931]/50 to-[#dfc931]/30 p-2.5 rounded-lg hover:from-[#dfc931]/70 hover:to-[#dfc931]/50 transition-all duration-200 cursor-pointer group"
							>
								<div className="flex items-center gap-2">
									<span className="transition-all duration-200 transform group-hover:rotate-[360deg]">
										<Discord className="size-4 absolute group-hover:opacity-0 group-hover:scale-0 transition-all duration-200" />
										{isDiscordCopied ? (
											<Check className="size-4 text-green-500" />
										) : (
											<Copy className="size-4 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200" />
										)}
									</span>
									<h3 className="text-sm font-semibold truncate">woolfey</h3>
								</div>
							</div>
						</div>
					</div>

					<h3 className="text-[#dfc931] font-bold text-xl mb-2">Tech Stack</h3>
					<div
						className={`grid ${
							localFullscreen
								? 'lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 grid-cols-2'
								: 'grid-cols-3'
						} gap-2`}
					>
						{[
							{
								Icon: HTML5,
								name: 'HTML',
								link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
							},
							{
								Icon: CSSNew,
								name: 'CSS',
								link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
							},
							{
								Icon: JavaScript,
								name: 'JavaScript',
								link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
							},
							{
								Icon: TypeScript,
								name: 'TypeScript',
								link: 'https://www.typescriptlang.org/',
							},
							{ Icon: ReactIcon, name: 'React', link: 'https://react.dev/' },
							{ Icon: Nextjs, name: 'Next.js', link: 'https://nextjs.org/' },
							{
								Icon: TailwindCSS,
								name: 'tailwindcss',
								link: 'https://tailwindcss.com/',
							},
							{ Icon: ShadcnUI, name: 'shadcn/ui', link: 'https://ui.shadcn.com/' },
							{ Icon: Motion, name: 'motion', link: 'https://motion.dev/' },
							{ Icon: Nodejs, name: 'NodeJS', link: 'https://nodejs.org/' },
							{ Icon: Git, name: 'Git', link: 'https://git-scm.com/' },
							{ Icon: GitHub, name: 'GitHub', link: 'https://github.com/' },
							{ Icon: Vercel, name: 'Vercel', link: 'https://vercel.com/' },
							{ Icon: NPM, name: 'npm', link: 'https://www.npmjs.com/' },
							{ Icon: PNPM, name: 'pnpm', link: 'https://pnpm.io/' },
							{ Icon: Docker, name: 'Docker', link: 'https://www.docker.com/' },
							{ Icon: Figma, name: 'Figma', link: 'https://www.figma.com/' },
							{
								Icon: VisualStudioCode,
								name: 'VSCode',
								link: 'https://code.visualstudio.com/',
							},
							{ Icon: Cursor, name: 'Cursor', link: 'https://www.cursor.com' },
							{ Icon: Neon, name: 'Neon', link: 'https://neon.tech/' },
							{
								Icon: BetterAuth,
								name: 'better-auth',
								link: 'https://www.better-auth.com',
							},
							{
								Icon: PostgreSQL,
								name: 'PostgreSQL',
								link: 'https://www.postgresql.org/',
							},
							{ Icon: Prisma, name: 'Prisma', link: 'https://www.prisma.io/' },
							{ name: 'and more...' },
						].map(({ Icon, name, link }) => (
							<div key={name} className="group relative" onMouseEnter={handleHover}>
								{link ? (
									<a
										href={link}
										target="_blank"
										rel="noopener noreferrer"
										className="block"
									>
										<div className="bg-gradient-to-r from-[#dfc931]/50 to-[#dfc931]/30 p-2.5 rounded-lg hover:from-[#dfc931]/70 hover:to-[#dfc931]/50 transition-all duration-200">
											<div className="flex items-center gap-2">
												{Icon && <Icon className="size-4" />}
												<h3 className="text-sm font-semibold truncate">{name}</h3>
											</div>
										</div>
									</a>
								) : (
									<div className="bg-gradient-to-r from-[#dfc931]/50 to-[#dfc931]/30 p-2.5 rounded-lg">
										<div className="flex items-center gap-2">
											{Icon && <Icon className="size-4" />}
											<h3 className="text-sm font-semibold truncate">{name}</h3>
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			),
		},
		{
			title: 'PROJECTS',
			subtitle: 'CURRENTLY BUILDING',
			content: (
				<div className="space-y-8 pb-6">
					{builds.filter(build => build.visible).length === 0 ? (
						<div className="flex items-center justify-center">
							<div className="text-center space-y-4">
								<div className="space-y-2">
									<h3 className="text-2xl font-bold text-white">Nothing here yet...</h3>
									<p className="text-white/60 max-w-md">
										Taking some time to create new things. Stay tuned!
									</p>
								</div>
							</div>
						</div>
					) : (
						<div
							className={`grid ${
								localFullscreen
									? 'xl:grid-cols-3 md:grid-cols-2 grid-cols-1'
									: 'grid-cols-1'
							} gap-6`}
						>
							{builds
								.filter(build => build.visible)
								.map((build, index) => (
									<div key={build.id || index} className="group relative">
										<div className="relative bg-white/[0.02] border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-500">
											<div className="relative p-6">
												<div className="space-y-4">
													<div className="space-y-2">
														<div className="flex items-start justify-between gap-4">
															<h3 className="text-3xl font-bold text-white">{build.title}</h3>
															<div className="flex flex-wrap gap-2">
																{build.status.map((status, idx) => (
																	<div
																		key={idx}
																		className={`px-3 py-1.5 text-white/90 rounded-full text-xs font-medium border transition-colors ${
																			status.toLowerCase() === 'completed'
																				? 'bg-green-500/20 border-green-500/40 hover:bg-green-500/30'
																				: status.toLowerCase() === 'wip'
																				? 'bg-gray-100/20 border-gray-100/40 hover:bg-gray-100/30'
																				: status.toLowerCase() === 'in progress'
																				? 'bg-orange-600/20 border-orange-600/40 hover:bg-orange-600/30'
																				: 'bg-white/10 border-white/20 hover:bg-white/15'
																		}`}
																	>
																		{status}
																	</div>
																))}
															</div>
														</div>
													</div>
													{build.img && (
														<div className="w-full h-48 overflow-hidden rounded-xl">
															<div className="overflow-hidden rounded-xl bg-white/5 h-full">
																<Image
																	src={build.img}
																	alt={build.title}
																	width={640}
																	height={360}
																	className="w-full h-full object-cover"
																/>
															</div>
														</div>
													)}
													{build.description && (
														<p className="text-muted">{build.description}</p>
													)}
													{build.tags.length > 0 && (
														<div className="space-y-3">
															<div className="flex flex-wrap gap-2">
																{build.tags.map((tag, idx) => (
																	<span
																		key={idx}
																		className="flex items-center gap-2 px-2 py-1 bg-white/5 text-white/80 rounded-lg text-sm font-medium border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default"
																	>
																		{getTagIcon(tag)} {tag}
																	</span>
																))}
															</div>
														</div>
													)}
												</div>
											</div>
										</div>
									</div>
								))}
						</div>
					)}
				</div>
			),
		},
	]

	const handleNextPage = () => {
		setSlideDirection(1)
		setSelectedPage(prev => (prev + 1) % pages.length)
		if (nextSound) {
			nextSound.muted = !!isMuted
			nextSound.play()
		}
	}

	const handlePrevPage = () => {
		setSlideDirection(-1)
		setSelectedPage(prev => (prev - 1 + pages.length) % pages.length)
		if (nextSound) {
			nextSound.muted = !!isMuted
			nextSound.play()
		}
	}

	const currentPage = pages[selectedPage]

	const toggleFullscreen = () => {
		const newFullscreenState = !localFullscreen
		setLocalFullscreen(newFullscreenState)

		if (onFullscreenChange) {
			onFullscreenChange(newFullscreenState)
		}
	}

	return (
		<>
			<AnimatePresence mode="wait">
				{localFullscreen || window?.innerWidth < 1024 ? (
					<motion.div
						key="fullscreen"
						className="fixed lg:inset-12 inset-0 z-[100] bg-gradient-to-b from-[#c85825]/80 to-[#a04b26]/80 backdrop-blur-sm lg:rounded-3xl overflow-hidden shadow-xl"
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.15, ease: 'easeOut' }}
					>
						<div className="flex flex-col h-full">
							<div className="sticky top-0 z-10 p-6 pb-3">
								<div className="flex items-center justify-between mb-2">
									<div className="h-12 w-full relative flex items-center justify-between gap-4">
										<AnimatePresence initial={false} mode="wait" custom={slideDirection}>
											<motion.h1
												key={`title-${currentPage.title}`}
												className="text-4xl font-bold text-white whitespace-nowrap"
												custom={slideDirection}
												initial={{ x: slideDirection * 50, opacity: 0 }}
												animate={{ x: 0, opacity: 1 }}
												exit={{ x: -slideDirection * 50, opacity: 0 }}
												transition={{ duration: 0.2 }}
											>
												{currentPage.title}
											</motion.h1>
										</AnimatePresence>
										<div className="flex gap-3">
											<button
												onClick={() => {
													toggleFullscreen()
													if (openSound) {
														openSound.muted = !!isMuted
														openSound.play()
													}
												}}
												className="hidden lg:block text-white hover:text-yellow-200 transition-colors"
											>
												<Minimize size={24} />
											</button>
											<button
												onClick={onClose}
												className="text-white hover:text-yellow-200 transition-colors lg:hidden"
											>
												<X size={24} />
											</button>
										</div>
									</div>
								</div>

								<div className="mt-2 flex justify-between">
									<AnimatePresence initial={false} mode="wait" custom={slideDirection}>
										<motion.div
											key={`subtitle-${currentPage.subtitle}`}
											custom={slideDirection}
											initial={{ x: slideDirection * 50, opacity: 0 }}
											animate={{ x: 0, opacity: 1 }}
											exit={{ x: -slideDirection * 50, opacity: 0 }}
											transition={{ duration: 0.2 }}
											className="text-[#dfc931] font-bold text-xl"
										>
											{currentPage.subtitle}
										</motion.div>
									</AnimatePresence>
									<div className="flex gap-2">
										<button
											onClick={handlePrevPage}
											className="text-white hover:text-yellow-200 transition-colors"
										>
											<ArrowLeft />
										</button>
										<button
											onClick={handleNextPage}
											className="text-white hover:text-yellow-200 transition-colors"
										>
											<ArrowRight />
										</button>
									</div>
								</div>

								<div className="border-b-2 border-dashed border-[#dfc931] mt-2"></div>
							</div>

							<div className="p-6 pt-3 flex-1 overflow-y-auto">
								<div className="relative h-[calc(100%-180px)] overflow-visible">
									<div className="overflow-y-auto h-full px-3 -mx-3">
										<AnimatePresence initial={false} mode="wait" custom={slideDirection}>
											<motion.div
												key={`content-${currentPage.title}`}
												className="absolute inset-0"
												custom={slideDirection}
												initial={{ x: slideDirection * 20, opacity: 0 }}
												animate={{ x: 0, opacity: 1 }}
												exit={{ x: -slideDirection * 20, opacity: 0 }}
												transition={{ duration: 0.2, ease: 'easeInOut' }}
											>
												{currentPage.content}
											</motion.div>
										</AnimatePresence>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				) : (
					<motion.div
						key="normal"
						className="w-full h-[90vh] bg-gradient-to-b from-[#c85825]/80 to-[#a04b26]/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl relative"
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.15, ease: 'easeOut' }}
					>
						<div className="flex flex-col h-full">
							<div className="sticky top-0 z-10 p-6 pb-3">
								<div className="flex items-center justify-between mb-2">
									<div className="h-12 w-full relative flex items-center justify-between gap-4">
										<AnimatePresence initial={false} mode="wait" custom={slideDirection}>
											<motion.h1
												key={`title-${currentPage.title}`}
												className="text-4xl font-bold text-white whitespace-nowrap"
												custom={slideDirection}
												initial={{ x: slideDirection * 50, opacity: 0 }}
												animate={{ x: 0, opacity: 1 }}
												exit={{ x: -slideDirection * 50, opacity: 0 }}
												transition={{ duration: 0.2 }}
											>
												{currentPage.title}
											</motion.h1>
										</AnimatePresence>
										<div className="flex gap-3">
											<button
												onClick={toggleFullscreen}
												className="hidden lg:block text-white hover:text-yellow-200 transition-colors"
											>
												<Maximize size={24} />
											</button>
										</div>
									</div>
								</div>

								<div className="mt-2 flex justify-between">
									<AnimatePresence initial={false} mode="wait" custom={slideDirection}>
										<motion.div
											key={`subtitle-${currentPage.subtitle}`}
											custom={slideDirection}
											initial={{ x: slideDirection * 50, opacity: 0 }}
											animate={{ x: 0, opacity: 1 }}
											exit={{ x: -slideDirection * 50, opacity: 0 }}
											transition={{ duration: 0.2 }}
											className="text-[#dfc931] font-bold text-xl"
										>
											{currentPage.subtitle}
										</motion.div>
									</AnimatePresence>
									<div className="flex gap-2">
										<button
											onClick={handlePrevPage}
											className="text-white hover:text-yellow-200 transition-colors"
										>
											<ArrowLeft />
										</button>
										<button
											onClick={handleNextPage}
											className="text-white hover:text-yellow-200 transition-colors"
										>
											<ArrowRight />
										</button>
									</div>
								</div>

								<div className="border-b-2 border-dashed border-[#dfc931] mt-2"></div>
							</div>

							<div className="p-6 pt-3 flex-1 overflow-y-auto">
								<div className="relative h-[calc(100%-180px)] overflow-visible">
									<div className="overflow-y-auto h-full px-3 -mx-3">
										<AnimatePresence initial={false} mode="wait" custom={slideDirection}>
											<motion.div
												key={`content-${currentPage.title}`}
												className="absolute inset-0"
												custom={slideDirection}
												initial={{ x: slideDirection * 20, opacity: 0 }}
												animate={{ x: 0, opacity: 1 }}
												exit={{ x: -slideDirection * 20, opacity: 0 }}
												transition={{ duration: 0.2, ease: 'easeInOut' }}
											>
												{currentPage.content}
											</motion.div>
										</AnimatePresence>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
