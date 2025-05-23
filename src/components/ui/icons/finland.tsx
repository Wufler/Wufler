import * as React from 'react'
import type { SVGProps } from 'react'
const Finland = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 36 36"
		fill="currentColor"
		width="1em"
		height="1em"
		{...props}
	>
		<path fill="#EDECEC" d="M32 5H18v10h18V9c0-2.209-1.791-4-4-4z" />
		<path fill="#EEE" d="M11 5H4C1.791 5 0 6.791 0 9v6h11V5z" />
		<path
			fill="#EDECEC"
			d="M32 31H18V21h18v6c0 2.209-1.791 4-4 4zm-21 0H4c-2.209 0-4-1.791-4-4v-6h11v10z"
		/>
		<path fill="#003580" d="M18 5h-7v10H0v6h11v10h7V21h18v-6H18z" />
	</svg>
)
export default Finland
