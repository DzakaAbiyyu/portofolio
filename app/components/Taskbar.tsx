'use client'
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import StartMenu from "./StartMenu";   // ← import komponen baru

type StartState = 'default' | 'transition' | 'open';
const STATES: StartState[] = ['default', 'transition', 'open'];

export default function Taskbar() {
    const [startState, setStartState] = useState<StartState>('default');
    const [menuOpen, setMenuOpen] = useState(false);
    const startButtonRef = useRef<HTMLButtonElement>(null)  // ← ref tombol start

    const handleStartClick = () => {
        const willOpen = !menuOpen;
        setMenuOpen(willOpen);
        setStartState(willOpen ? 'open' : 'default');
    };

    return (
        <>
            {/* Start Menu Popup — render DI LUAR footer */}
            <StartMenu
                isOpen={menuOpen}
                excludeRef={startButtonRef}
                onClose={() => {
                    setMenuOpen(false);
                    setStartState('default');
                }}
            />

            <footer className="fixed bottom-0 w-full h-12 bg-gray-800 text-white flex items-center justify-center" style={{ zIndex: 60 }}>
                {/* Windows / Start button */}
                <button
                    ref={startButtonRef}
                    aria-label="start"
                    className="relative w-10 h-10 cursor-crosshair hover:bg-white/10 flex items-center justify-center rounded"
                    onMouseEnter={() => {
                        if (!menuOpen) setStartState('transition');
                    }}
                    onMouseLeave={() => {
                        if (!menuOpen) setStartState('default');
                    }}
                    onClick={handleStartClick}
                >
                    {STATES.map(state => (
                        <Image
                            key={state}
                            src={`/icon/windows-icon/${state}.png`}
                            alt=""
                            width={56}
                            height={56}
                            priority
                            className={`absolute !w-7 !h-7 object-contain transition-opacity duration-200 ${startState === state ? 'opacity-100' : 'opacity-0'}`}
                        />
                    ))}
                </button>

                {/* GitHub */}
                <Link
                    href="/github"
                    aria-label="github"
                    className="flex items-center justify-center w-10 h-10 rounded hover:bg-white/10 cursor-crosshair"
                >
                    <Image
                        src="/icon/github-icon/default.png"
                        alt=""
                        width={48}
                        height={48}
                        className="!w-7 !h-7 object-contain invert"
                        style={{ imageRendering: 'pixelated' }}
                    />
                </Link>

                {/* VS Code */}
                <Link
                    href="/vscode"
                    aria-label="vscode"
                    className="flex items-center justify-center w-10 h-10 rounded hover:bg-white/10 cursor-crosshair"
                >
                    <Image
                        src="/icon/vscode-icon/default.png"
                        alt=""
                        width={48}
                        height={48}
                        className="!w-7 !h-7 object-contain"
                        style={{ imageRendering: 'pixelated' }}
                    />
                </Link>

                {/* Photos */}
                <Link
                    href="/photos"
                    aria-label="photos"
                    className="flex items-center justify-center w-10 h-10 rounded hover:bg-white/10 cursor-crosshair"
                >
                    <Image
                        src="/icon/photos-icon/default.png"
                        alt=""
                        width={48}
                        height={48}
                        className="!w-7 !h-7 object-contain"
                        style={{ imageRendering: 'pixelated' }}
                    />
                </Link>
            </footer>
        </>
    );
}