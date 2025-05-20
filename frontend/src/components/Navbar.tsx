import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';

interface NavbarProps {
    isLanding: boolean;
    setPage: (page: 'landing' | 'gallery' | 'minted') => void;
    setShowZkLogin: (show: boolean) => void;
    }

/**
 * Navbar Component:  The navigation bar for the application.
 *
 * This component displays the navigation links, theme toggle, and wallet connection
 * functionality.  It adapts its appearance based on whether it's being displayed
 * on the landing page or a sub-page.
 */
function Navbar({ isLanding, setPage, setShowZkLogin }: NavbarProps) {
    const navigate = useNavigate();
    const [isDark, setIsDark] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Use the hook from @mysten/dapp-kit to get the address
    const account = useCurrentAccount();
    const address = account?.address;

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    const toggleMute = () => {
        if (audioRef.current) {
        audioRef.current.muted = !audioRef.current.muted;
        setIsMuted(audioRef.current.muted);
        }
    };

    useEffect(() => {
        if (isLanding) {
        document.documentElement.classList.add('dark');
        }
    }, [isLanding]);

    const handleLogoClick = () => {
        setPage('landing'); // Sync state with Landing
        navigate('/'); // Change to Landing
    };

    return (
        <nav
        className={`flex justify-between items-center w-full top-0 z-50 px-4 py-2 ${
            isLanding
            ? 'absolute text-[#f1f1f1] bg-transparent'
            : 'fixed bg-[var(--bg-color)] text-[var(--text-color)] border-b border-[var(--text-color)] border-opacity-30'
        }`}
        >
        <h1 onClick={handleLogoClick} className="text-lg font-bold cursor-pointer">
            ImmersivΞ
        </h1>
        <div className="flex items-center space-x-4">
            {isLanding ? (
            <>
                <button
                onClick={toggleMute}
                className="p-2 rounded-full hover:bg-white/10 transition-all"
                >
                {isMuted ? '🔇' : '🔊'}
                </button>
                <button
                onClick={() => navigate('/gallery', { state: { scrollTo: 'about' } })}
                className="connect-btn px-4 py-2 border border-[#f1f1f1] text-[#f1f1f1] rounded-md hover:bg-[#f1f1f1] hover:text-black"
                >
                About
                </button>
            </>
            ) : (
            <>
                <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-[var(--text-color)] hover:text-[var(--bg-color)] transition-all"
                >
                {isDark ? '☀️' : '🌙'}
                </button>

                {/* === Use address from useCurrentAccount() === */}
                <ConnectButton
                className="connect-btn px-4 py-2 border border-[var(--text-color)] rounded-md hover:bg-[var(--text-color)] hover:text-[var(--bg-color)]"                                
                connectText="Connect Wallet"    
                />
                {address && (
                <span className="text-sm">
                    Connected: {address.slice(0, 6)}...{address.slice(-4)}
                </span>
                )}

                {/* === ZkLogin === */}
                <button
                onClick={() => {
                    console.log('Clicked Google Login, calling setShowZkLogin(true)');
                    setShowZkLogin(true);
                }}
                className="connect-btn px-4 py-2 border border-[var(--text-color)] rounded-md hover:bg-[var(--text-color)] hover:text-[var(--bg-color)]"                
                >
                Google Login
                </button>
            </>
            )}
        </div>
        {isLanding && (
            <audio
            ref={audioRef}
            src="/media/immersiv3-audio.mp3"
            autoPlay
            loop
            muted
            onCanPlay={() => {
                if (audioRef.current) {
                audioRef.current.volume = 0.2;
                }
            }}
            />
        )}
        </nav>
    );
}

export default Navbar;