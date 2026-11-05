'use client'
import { useEffect, useRef } from "react"
import Image from "next/image"

interface App {
    name: string
    icon: string
    href?: string
    onClick?: () => void
}

const PINNED_APPS: App[] = [
    { name: "VS Code", icon: "/icon/vscode-icon/default.png", href: "/vscode" },
    { name: "GitHub", icon: "/icon/github-icon/default.png", href: "/github" },
    { name: "Photos", icon: "/icon/photos-icon/default.png", href: "/photos" },
    // tambah app lain di sini
]

interface StartMenuProps {
    isOpen: boolean
    onClose: () => void
    excludeRef?: React.RefObject<HTMLElement | null>  // ← ref tombol start
}

export default function StartMenu({ isOpen, onClose, excludeRef }: StartMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null)

    // Tutup menu kalau klik di luar, kecuali tombol start itu sendiri
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const clickedInsideMenu = menuRef.current?.contains(e.target as Node)
            const clickedStartButton = excludeRef?.current?.contains(e.target as Node)
            if (!clickedInsideMenu && !clickedStartButton) {
                onClose()
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isOpen, onClose, excludeRef])

    return (
        <div
            ref={menuRef}
            className={`
                fixed bottom-14 left-1/2 -translate-x-1/2
                w-[520px] rounded-xl
                bg-[#202020]/80 backdrop-blur-2xl
                border border-white/10
                shadow-[0_8px_32px_rgba(0,0,0,0.6)]
                transition-all duration-200 ease-out
                ${isOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }
            `}
            style={{ zIndex: 50 }}
        >
            {/* Search Bar */}
            <div className="px-6 pt-6 pb-4">
                <div className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 rounded-full px-4 py-2 transition-colors">
                    <svg className="w-4 h-4 text-white/50 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search for apps, files, settings..."
                        className="bg-transparent text-white/80 text-sm placeholder-white/30 outline-none w-full"
                    />
                </div>
            </div>

            {/* Pinned Apps */}
            <div className="px-6 pb-4">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-white/60 text-xs font-medium tracking-wide">Pinned</span>
                    <button className="text-white/40 text-xs hover:text-white/70 transition-colors">All apps →</button>
                </div>
                <div className="grid grid-cols-6 gap-1">
                    {PINNED_APPS.map((app) => (
                        <a
                            key={app.name}
                            href={app.href}
                            onClick={onClose}
                            className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors cursor-crosshair group"
                        >
                            <div className="w-8 h-8 relative flex items-center justify-center">
                                <Image
                                    src={app.icon}
                                    alt={app.name}
                                    width={32}
                                    height={32}
                                    className="object-contain"
                                    style={{ imageRendering: "pixelated" }}
                                />
                            </div>
                            <span className="text-white/70 text-[10px] text-center leading-tight group-hover:text-white/90 transition-colors truncate w-full text-center">
                                {app.name}
                            </span>
                        </a>
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div className="mx-6 h-px bg-white/10" />

            {/* Recommended / Recent */}
            <div className="px-6 py-4">
                <span className="text-white/60 text-xs font-medium tracking-wide">Recommended</span>
                <div className="mt-3 space-y-1">
                    {[
                        { label: "Portfolio README.md", meta: "Recently opened" },
                        { label: "index.tsx", meta: "2 hours ago" },
                        { label: "tailwind.config.ts", meta: "Yesterday" },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/10 transition-colors cursor-crosshair"
                        >
                            {/* File icon placeholder */}
                            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center shrink-0">
                                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                                </svg>
                            </div>
                            <div className="min-w-0">
                                <p className="text-white/80 text-xs truncate">{item.label}</p>
                                <p className="text-white/30 text-[10px]">{item.meta}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer — User & Power */}
            <div className="mx-4 mb-4 mt-1 flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2">
                    {/* Avatar placeholder */}
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xs font-semibold">
                        N
                    </div>
                    <span className="text-white/70 text-xs">Your Name</span>
                </div>

                <button
                    onClick={onClose}
                    className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-xs transition-colors px-2 py-1 rounded hover:bg-white/10"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign out
                </button>
            </div>
        </div>
    )
}