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
			<div className="relative h-full w-full bg-[#09090B]">
				<div className="absolute bottom-0 top-0 right-0 left-0 bg-[#09090B] bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:1.5rem_2rem]"></div>
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
