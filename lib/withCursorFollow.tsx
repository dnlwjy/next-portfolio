"use client"

import { useCallback, useEffect, useRef } from "react"
import type { ComponentType } from "react"
import { m } from "framer-motion"

const settings = {
    maxDistance: 1300, // Max distance for effect activation
    intensity: 0.1, // Effect intensity: higher values = stronger effect
    transitionDuration: 1500, // Transition duration in ms
    transitionEase: "cubic-bezier(0.22, 1, 0.36, 1)",
}

export const withCursorFollow = <P extends object>(Component: ComponentType<P>): ComponentType<P> => {
    return (props: P) => {
        const componentRef = useRef<HTMLDivElement | null>(null)
        const isInView = useRef(false)
        const centerRef = useRef({ x: 0, y: 0 })
        const hasMeasureRef = useRef(false)
        const pointerXRef = useRef(0)
        const pointerYRef = useRef(0)
        const needsMeasureRef = useRef(true)
        const rafIdRef = useRef<number | null>(null)

        const applyTransform = useCallback((x: number, y: number) => {
            const node = componentRef.current
            if (!node) return
            node.style.transform = `translate3d(${x}px, ${y}px, 0)`
        }, [])

        const updateCenter = useCallback(() => {
            const node = componentRef.current
            if (!node) return
            const rect = node.getBoundingClientRect()
            centerRef.current = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
            }
            hasMeasureRef.current = true
        }, [])

        const applyOffset = useCallback(() => {
            rafIdRef.current = null

            if (needsMeasureRef.current) {
                updateCenter()
                needsMeasureRef.current = false
            }

            if (!isInView.current || !hasMeasureRef.current) {
                applyTransform(0, 0)
                return
            }

            const distanceX = pointerXRef.current - centerRef.current.x
            const distanceY = pointerYRef.current - centerRef.current.y

            if (
                Math.abs(distanceX) < settings.maxDistance &&
                Math.abs(distanceY) < settings.maxDistance
            ) {
                const proximityFactor =
                    1 -
                    Math.max(Math.abs(distanceX), Math.abs(distanceY)) /
                        settings.maxDistance

                applyTransform(
                    distanceX * proximityFactor * settings.intensity,
                    distanceY * proximityFactor * settings.intensity
                )
                return
            }

            applyTransform(0, 0)
        }, [applyTransform, updateCenter])

        const scheduleApplyOffset = useCallback(() => {
            if (rafIdRef.current !== null) return
            rafIdRef.current = requestAnimationFrame(applyOffset)
        }, [applyOffset])

        useEffect(() => {
            const handleMouseMove = (e: MouseEvent) => {
                if (isInView.current) {
                    pointerXRef.current = e.clientX
                    pointerYRef.current = e.clientY
                    scheduleApplyOffset()
                }
            }

            const handleViewportChange = () => {
                if (!isInView.current) return
                needsMeasureRef.current = true
                scheduleApplyOffset()
            }

            window.addEventListener("mousemove", handleMouseMove, { passive: true })
            window.addEventListener("scroll", handleViewportChange, { passive: true })
            window.addEventListener("resize", handleViewportChange)

            return () => {
                window.removeEventListener("mousemove", handleMouseMove)
                window.removeEventListener("scroll", handleViewportChange)
                window.removeEventListener("resize", handleViewportChange)
                if (rafIdRef.current !== null) {
                    cancelAnimationFrame(rafIdRef.current)
                }
            }
        }, [scheduleApplyOffset])

        useEffect(() => {
            const node = componentRef.current
            if (!node) return
            node.style.transition = `transform ${settings.transitionDuration}ms ${settings.transitionEase}`
        }, [])

        useEffect(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        isInView.current = entry.isIntersecting
                        if (entry.isIntersecting) {
                            needsMeasureRef.current = true
                            scheduleApplyOffset()
                        } else {
                            applyTransform(0, 0)
                        }
                    })
                },
                {
                    threshold: 0.1, // Adjust as necessary to define "in view"
                }
            )

            const node = componentRef.current
            if (node) {
                observer.observe(node)
                needsMeasureRef.current = true
            }

            return () => {
                observer.disconnect()
            }
        }, [applyTransform, scheduleApplyOffset])

        useEffect(() => {
            return () => {
                if (rafIdRef.current !== null) {
                    cancelAnimationFrame(rafIdRef.current)
                }
            }
        }, [])

        return (
            <m.div
                ref={componentRef}
                style={{
                    willChange: "transform",
                    zIndex: (props as any).zIndex ?? 2, // Default z-index to 2
                }}
            >
                <Component {...props} />
            </m.div>
        )
    }
}
