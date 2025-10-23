'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import Buttons from './Buttons'
import About from './About'
import Container from './Container'
import Projects from './Projects'
import Link from 'next/link'
import Image from 'next/image'
import { FilePenLine, Sparkles, Volume2, VolumeOff } from 'lucide-react'

export default function Menu({
	projects,
	builds,
}: {
	projects: Project[]
	builds: Build[]
}) {
	const openSound = useRef<HTMLAudioElement | null>(null)
	const closeSound = useRef<HTMLAudioElement | null>(null)
	const moveSound = useRef<HTMLAudioElement | null>(null)
	const projectSound = useRef<HTMLAudioElement | null>(null)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [showMenu, setShowMenu] = useState(false)
	const [isFullscreen, setIsFullscreen] = useState(false)
	const [isAboutFullscreen, setIsAboutFullscreen] = useState(false)
	const [isMobile, setIsMobile] = useState(false)
	const [wasAboutOpen, setWasAboutOpen] = useState(false)
	const [wasProjectsOpen, setWasProjectsOpen] = useState(false)
	const [isMuted, setIsMuted] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 1024)
			if (window.innerWidth >= 1024) {
				setIsMenuOpen(true)
				setShowMenu(true)
			}
		}

		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	useEffect(() => {
		const openAudio = new Audio('/open.wav')
		const closeAudio = new Audio('/close.wav')
		const moveAudio = new Audio('/move.wav')
		const projectAudio = new Audio('/project.wav')

		openAudio.volume = 0.2
		closeAudio.volume = 0.2
		moveAudio.volume = 0.2
		projectAudio.volume = 0.2

		openSound.current = openAudio
		closeSound.current = closeAudio
		moveSound.current = moveAudio
		projectSound.current = projectAudio
	}, [])

	const toggleAudio = () => {
		setIsMuted(!isMuted)
		if (openSound.current) openSound.current.muted = !isMuted
		if (closeSound.current) closeSound.current.muted = !isMuted
		if (moveSound.current) moveSound.current.muted = !isMuted
		if (projectSound.current) projectSound.current.muted = !isMuted
	}

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				if (isFullscreen) {
					setIsFullscreen(false)
					if (wasAboutOpen) {
						setShowMenu(true)
					}
				}
				if (isAboutFullscreen) {
					setIsAboutFullscreen(false)
					if (wasProjectsOpen) {
						setIsMenuOpen(true)
					}
				}
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [isFullscreen, isAboutFullscreen, wasAboutOpen, wasProjectsOpen])

	const playMoveSound = useCallback(() => {
		moveSound.current?.play()
	}, [])

	const toggleProjects = () => {
		if (isFullscreen) {
			setIsFullscreen(false)
		} else if (isAboutFullscreen) {
			setIsAboutFullscreen(false)
			setShowMenu(false)
		}

		if (!isMenuOpen) {
			openSound.current?.play()
		} else {
			closeSound.current?.play()
		}
		setIsMenuOpen(!isMenuOpen)
	}

	const toggleAbout = () => {
		if (isAboutFullscreen) {
			setIsAboutFullscreen(false)
		} else if (isFullscreen) {
			setIsFullscreen(false)
			setIsMenuOpen(false)
		}

		if (!showMenu) {
			openSound.current?.play()
		} else {
			closeSound.current?.play()
		}
		setShowMenu(!showMenu)
	}

	const handleProjectClick = () => {
		projectSound.current?.play()
	}

	const handleFullscreenChange = (newFullscreenState: boolean) => {
		if (newFullscreenState) {
			setWasAboutOpen(showMenu)
			setShowMenu(false)
		} else if (wasAboutOpen) {
			setShowMenu(true)
		}
		setIsFullscreen(newFullscreenState)
	}

	const handleAboutFullscreenChange = (newFullscreenState: boolean) => {
		if (newFullscreenState) {
			setWasProjectsOpen(isMenuOpen)
			setIsMenuOpen(false)
		} else if (wasProjectsOpen) {
			setIsMenuOpen(true)
		}
		setIsAboutFullscreen(newFullscreenState)
	}

	return (
		<>
			{isMobile && (
				<motion.div
					className={cn(
						'fixed left-1/2 top-8 -translate-x-1/2 z-30',
						(isFullscreen || isAboutFullscreen) && 'opacity-0 pointer-events-none'
					)}
					initial={{ opacity: 1, y: -20 }}
					animate={{ opacity: isFullscreen || isAboutFullscreen ? 0 : 1, y: 0 }}
					transition={{ type: 'spring', stiffness: 260, damping: 20 }}
				>
					<div className="flex flex-row space-x-4">
						<Buttons onClick={toggleProjects} name="Projects" icon={Sparkles} />
						<Buttons onClick={toggleAbout} name="About me" icon={FilePenLine} />
					</div>
				</motion.div>
			)}
			<div className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none">
				<div className="flex flex-col items-center gap-4">
					<div className="flex items-center gap-4">
						<Link
							href="https://me.wolfey.me"
							target="_blank"
							className="pointer-events-auto"
						>
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-[#E67E22] via-[#F39C12] to-[#FFA07A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
								WOLFEY
							</h1>
						</Link>
						<Image
							src={'/favicon.ico'}
							width={80}
							height={80}
							alt="🦊"
							className="size-16 md:size-20 relative z-10"
						/>
					</div>
					<button onClick={toggleAudio} className="pointer-events-auto text-white">
						{isMuted ? <VolumeOff /> : <Volume2 />}
					</button>
				</div>
			</div>
			<Container
				showMenu={isMenuOpen}
				otherMenuOpen={showMenu}
				isFullscreen={isFullscreen}
			>
				<div className="transition-all duration-300">
					<Projects
						onClose={isMobile ? toggleProjects : undefined}
						projects={projects}
						handleProjectClick={handleProjectClick}
						playMoveSound={playMoveSound}
						isFullscreen={isFullscreen}
						onFullscreenChange={handleFullscreenChange}
						isMuted={isMuted}
					/>
				</div>
			</Container>
			<Container
				showMenu={showMenu}
				isSecondary={true}
				otherMenuOpen={isMenuOpen}
				isFullscreen={isAboutFullscreen}
			>
				<div className="transition-all duration-300">
					<About
						onClose={isMobile ? toggleAbout : undefined}
						builds={builds}
						isFullscreen={isAboutFullscreen}
						onFullscreenChange={handleAboutFullscreenChange}
						isMuted={isMuted}
					/>
				</div>
			</Container>
		</>
	)
}
