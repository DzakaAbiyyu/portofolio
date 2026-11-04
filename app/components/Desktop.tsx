'use client'
import { useRef, useEffect } from "react";

interface RainDrop {
    x: number;
    y: number;
    length: number;
    speed: number;
    opacity: number;
    width: number;
}

interface Ripple {
    x: number
    y: number
    radius: number
    maxRadius: number
    opacity: number
}

function createRainDrop(canvasWidth: number, canvasHeight: number): RainDrop {
    return {
        x: Math.random() * canvasWidth,
        y: Math.random() * -canvasHeight,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 5 + 2,
        opacity: Math.random() * 0.5 + 0.5,
        width: Math.random() * 2 + 1,
    }
}
export default function Desktop() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationId: number
        const RAIN_COUNT = 200
        let drops: RainDrop[] = []
        let ripples: Ripple[] = []

        const initCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const initDrop = () => {
            drops = Array.from({
                length: RAIN_COUNT
            }, () => createRainDrop(canvas.width, canvas.height))

        }
        const drawFrame = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            for (const drop of drops) {
                ctx.beginPath()
                ctx.moveTo(drop.x, drop.y)
                ctx.lineTo(drop.x, drop.y + drop.length)

                const gradient = ctx.createLinearGradient(
                    drop.x, drop.y,
                    drop.x, drop.y + drop.length
                )
                gradient.addColorStop(0, `rgba(255, 255, 255, ${drop.opacity})`)
                gradient.addColorStop(0.5, `rgba(255, 255, 255, ${drop.opacity * 0.6})`)
                ctx.strokeStyle = gradient
                ctx.lineWidth = drop.width
                ctx.stroke()

                drop.y += drop.speed

                if (drop.y > canvas.height + drop.length) {
                    drop.x = Math.random() * canvas.width
                    drop.y = Math.random() * -100
                    drop.length = Math.random() * 20 + 10
                    drop.speed = Math.random() * 4 + 2
                    drop.opacity = Math.random() * 0.4 + 0.1
                    drop.width = Math.random() < 0.7 ? 1 : 1.5
                }
            }
            for (const ripple of ripples) {
                ctx.beginPath()
                ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
                ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity})`
                ctx.lineWidth = 1.5
                ctx.stroke()

                ripple.radius += 2
                ripple.opacity -= 0.02
            }

            ripples = ripples.filter(ripple => ripple.opacity > 0)

            animationId = requestAnimationFrame(drawFrame)
        }

        const handleClick = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            ripples.push({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                radius: 0,
                maxRadius: 80,
                opacity: 0.8
            })
        }

        const handleResize = () => {
            initCanvas()
            // Clamp existing drops to new bounds; new ones fill in naturally
            for (const drop of drops) {
                if (drop.x > canvas.width) drop.x = Math.random() * canvas.width
            }
        }

        initCanvas()
        initDrop()
        drawFrame()

        window.addEventListener('resize', handleResize)
        canvas.addEventListener('click', handleClick)

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', handleResize)
            canvas.removeEventListener('click', handleClick)
        }

    }, [])

    return (
        <main className="relative w-full h-screen overflow-hidden bg-slate-900">
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full"
                style={{ zIndex: 0, cursor: 'crosshair' }}

            />
            <div
                className="fixed inset-0 w-full h-full"
                style={{ zIndex: 10, pointerEvents: 'none' }}
            >

            </div>
        </main>
    )
}