'use client'

import Menu from '@/components/Menu'
import { motion, AnimatePresence } from 'motion/react'

export default function Home({
	projects,
	builds,
}: {
	projects: Project[]
	builds: Build[]
}) {
	return (
		<div className="h-dvh w-full overflow-hidden">
			<div className="relative h-[200vh] w-[200vw] bg-[#100902]">
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1f1f1f_0%,rgba(31,31,31,0.6)_50%,rgba(31,31,31,0.2)_70%,transparent_100%)]" />
			</div>

			<div className="relative z-10 container mx-auto px-4 h-full flex flex-col">
				<AnimatePresence>
					<motion.div
						key="menus"
						className="h-full w-full"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<div className="flex items-start justify-start h-full w-full">
							<Menu projects={projects} builds={builds} />
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	)
}
