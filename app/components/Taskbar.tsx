import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type StartState = 'default' | 'transition' | 'open'
const STATES: StartState[] = ['default', 'transition', 'open']

export default function Taskbar() {
    const [startState, setStartState] = useState<StartState>('default')

    return (
        <footer className="fixed bottom-0 w-full h-12 bg-gray-800 text-white flex items-center justify-center">
            <button
                aria-label="start"
                className="relative w-12 h-12 cursor-crosshair"
                onMouseEnter={() => {
                    console.log('enter')
                    setStartState(prev => prev === 'open' ? 'open' : 'transition')
                }}
                onMouseLeave={() => setStartState(prev => prev === 'open' ? 'open' : 'default')}
                onClick={() => setStartState(prev => prev === 'open' ? 'transition' : 'open')}
            >
                {STATES.map(state => (
                    <Image
                        key={state}
                        src={`/icon/windows-icon/${state}.png`}
                        alt=""
                        width={48}
                        height={48}
                        priority
                        className={`absolute inset-0 !w-12 !h-12 object-contain transition-opacity duration-200 ${startState === state ? 'opacity-100' : 'opacity-0'
                            }`}
                    />

                )

                )}
            </button>
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
                    className="!w-7 !h-7 object-contain "
                    style={{ imageRendering: 'pixelated' }}
                />

            </Link>
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
                    className="!w-7 !h-7 object-contain "
                    style={{ imageRendering: 'pixelated' }}
                />

            </Link>
        </footer >
    )
}