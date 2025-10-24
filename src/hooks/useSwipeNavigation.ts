import { useEffect, useRef } from 'react'

interface UseSwipeNavigationProps {
    onSwipeLeft: () => void
    onSwipeRight: () => void
    threshold?: number
    enabled?: boolean
}

export function useSwipeNavigation({
    onSwipeLeft,
    onSwipeRight,
    threshold = 150,
    enabled = true,
}: UseSwipeNavigationProps) {
    const touchStartX = useRef<number | null>(null)
    const touchEndX = useRef<number | null>(null)
    const elementRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!enabled || !elementRef.current) return

        const element = elementRef.current

        const handleTouchStart = (e: TouchEvent) => {
            touchStartX.current = e.touches[0].clientX
            touchEndX.current = null
        }

        const handleTouchMove = (e: TouchEvent) => {
            touchEndX.current = e.touches[0].clientX
        }

        const handleTouchEnd = () => {
            if (!touchStartX.current || !touchEndX.current) return

            const distance = touchStartX.current - touchEndX.current
            const isLeftSwipe = distance > threshold
            const isRightSwipe = distance < -threshold

            if (isLeftSwipe) {
                onSwipeLeft()
            } else if (isRightSwipe) {
                onSwipeRight()
            }

            touchStartX.current = null
            touchEndX.current = null
        }

        element.addEventListener('touchstart', handleTouchStart, { passive: true })
        element.addEventListener('touchmove', handleTouchMove, { passive: true })
        element.addEventListener('touchend', handleTouchEnd, { passive: true })

        return () => {
            element.removeEventListener('touchstart', handleTouchStart)
            element.removeEventListener('touchmove', handleTouchMove)
            element.removeEventListener('touchend', handleTouchEnd)
        }
    }, [onSwipeLeft, onSwipeRight, threshold, enabled])

    return elementRef
} 